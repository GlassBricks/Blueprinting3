/*
 * Copyright (c) 2022-2023 GlassBricks
 * This file is part of Staged Blueprint Planning.
 *
 * Staged Blueprint Planning is free software: you can redistribute it and/or modify it under the terms of the GNU Lesser General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 *
 * Staged Blueprint Planning is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License along with Staged Blueprint Planning. If not, see <https://www.gnu.org/licenses/>.
 */

import { BlueprintSignalIcon, LocalisedString, LuaSurface, SignalID, SurfaceIndex } from "factorio:runtime"
import { remove_from_list } from "util"
import {
  BlueprintIcons,
  BlueprintOverrideSettings,
  BlueprintSettingsTable,
  compactIcons,
  createNewBlueprintSettings,
  iconsFromBpFormat,
  OverrideableBlueprintSettings,
  StageBlueprintSettings,
} from "../blueprints/blueprint-settings"
import { newProjectContent } from "../entity/ProjectContent"
import { ProjectEntity, StageNumber } from "../entity/ProjectEntity"
import {
  asLuaArray,
  asMutable,
  bind,
  deepCopy,
  Events,
  globalEvent,
  Mutable,
  MutableProperty,
  property,
  Property,
  RegisterClass,
  SimpleEvent,
} from "../lib"
import { BBox, Position } from "../lib/geometry"
import { LazyLoadClass } from "../lib/LazyLoad"
import { Migrations } from "../lib/migration"
import { L_Bp100 } from "../locale"
import { getResultValue } from "../utils/diff-value"
import {
  createdDiffedPropertyTableView,
  createEmptyPropertyOverrideTable,
  PropertiesTable,
} from "../utils/properties-obj"
import { EntityHighlights } from "./entity-highlights"
import { ProjectUpdates } from "./project-updates"
import { GlobalProjectEvent, LocalProjectEvent, ProjectId, Stage, UserProject } from "./ProjectDef"
import { getStageAtSurface } from "./stage-surface"
import { createStageSurface, destroySurface } from "./surfaces"
import { UserActions } from "./user-actions"
import { WorldEntityUpdates } from "./world-entity-updates"
import entity_filter_mode = defines.deconstruction_item.entity_filter_mode
import min = math.min

declare const global: {
  nextProjectId: ProjectId
  // projects: LuaMap<ProjectId, UserProjectImpl>
  projects: UserProjectImpl[]
  surfaceIndexToStage: LuaMap<SurfaceIndex, StageImpl>
}
Events.on_init(() => {
  global.nextProjectId = 1 as ProjectId
  global.projects = []
  global.surfaceIndexToStage = new LuaMap()
})

const GlobalProjectEvents = globalEvent<[GlobalProjectEvent]>()
export { GlobalProjectEvents as ProjectEvents }

declare const luaLength: LuaLength<Record<number, any>, number>

@RegisterClass("Assembly") // named differently for legacy reasons
class UserProjectImpl implements UserProject {
  name: MutableProperty<string>

  content = newProjectContent()
  localEvents = new SimpleEvent<LocalProjectEvent>()

  defaultBlueprintSettings = createNewBlueprintSettings()
  landfillTile = property<string | nil>("landfill")

  valid = true
  private readonly stages: Record<number, StageImpl> = {}

  actions = UserActionsClass({ project: this })
  updates = ProjectUpdatesClass({ project: this })
  entityUpdates = WorldEntityUpdatesClass({ project: this })

  constructor(
    readonly id: ProjectId,
    name: string,
    initialNumStages: number,
  ) {
    this.name = property(name)
    this.stages = {}
    for (const i of $range(1, initialNumStages)) {
      const stage = StageImpl.create(this, i, `Stage ${i}`, nil)
      this.stages[i] = stage
      if (i <= 9) {
        stage.stageBlueprintSettings.icons.set([{ type: "virtual", name: `signal-${i}` }])
      }
    }
  }
  private static getDisplayName(this: void, id: ProjectId, name: string): LocalisedString {
    return name != "" ? name : [L_Bp100.UnnamedProject, id]
  }
  displayName(): Property<LocalisedString> {
    return this.name.map(bind(UserProjectImpl.getDisplayName, this.id))
  }

  static create(name: string, initialNumStages: number): UserProjectImpl {
    const project = new UserProjectImpl(global.nextProjectId++ as ProjectId, name, initialNumStages)
    UserProjectImpl.onProjectCreated(project)

    return project
  }

  getSurface(stageNum: StageNumber): LuaSurface | nil {
    const stage = this.stages[stageNum]
    return stage && stage.surface
  }
  getStage(stageNumber: StageNumber): Stage | nil {
    return this.stages[stageNumber]
  }
  numStages(): StageNumber {
    return luaLength(this.stages)
  }
  lastStageFor(entity: ProjectEntity): StageNumber {
    if (entity.lastStage != nil) return min(entity.lastStage, this.numStages())
    return this.numStages()
  }

  getAllStages(): readonly StageImpl[] {
    return this.stages as unknown as readonly StageImpl[]
  }
  getStageName(stageNumber: StageNumber): LocalisedString {
    return this.stages[stageNumber].name.get()
  }

  insertStage(stage: StageNumber): Stage {
    this.assertValid()
    assert(stage >= 1 && stage <= this.numStages() + 1, "Invalid new stage number")

    const { name, strategy, lastNumber, previousLastNumber } = this._getNewStageName(stage)
    const prevStage = this.stages[stage == 1 ? 1 : stage - 1]
    const newStage = StageImpl.create(this, stage, name, prevStage.surface)
    // copy/update icons
    const copyStage = this.stages[stage == 1 ? 1 : stage - 1]

    const iconsValue = getResultValue(nil, copyStage.stageBlueprintSettings.icons.get())
    let icons: BlueprintIcons = iconsValue ? deepCopy(iconsValue) : []
    if (
      (strategy == "increment" || strategy == "decrement") &&
      previousLastNumber &&
      previousLastNumber >= 0 &&
      previousLastNumber <= 9 &&
      lastNumber &&
      lastNumber >= 0 &&
      lastNumber <= 9
    ) {
      const lastIcon = this.findLastIcon(icons)
      if (lastIcon != nil && lastIcon.type == "virtual" && lastIcon.name == `signal-${previousLastNumber}`) {
        ;(lastIcon as Mutable<SignalID>).name = `signal-${lastNumber}`
      }
    } else if (strategy == "sublist" && icons.length < 4 && lastNumber && lastNumber >= 0 && lastNumber <= 9) {
      icons = compactIcons(icons)
      icons.push({ type: "virtual", name: `signal-${lastNumber}` })
    }

    newStage.stageBlueprintSettings.icons.set(icons[0] && icons)

    table.insert(this.stages as unknown as Stage[], stage, newStage)
    // update stages
    for (const i of $range(stage, luaLength(this.stages))) {
      this.stages[i].stageNumber = i
    }
    this.content.insertStage(stage)

    this.raiseEvent({ type: "stage-added", project: this, stage: newStage })
    return newStage
  }

  private findLastIcon(icons: BlueprintIcons): SignalID | nil {
    let icon: SignalID | nil
    for (const [, signal] of pairs(asLuaArray(icons))) {
      icon = signal
    }
    return icon
  }

  deleteStage(index: StageNumber): void {
    this.assertValid()
    const stage = this.stages[index]
    assert(stage != nil, "invalid stage number")
    if (this.numStages() == 1) {
      this.delete()
      return
    }

    this.raiseEvent({ type: "pre-stage-deleted", project: this, stage })

    stage._doDelete()
    table.remove(this.stages as unknown as Stage[], index)
    // update stages
    for (const i of $range(index, this.numStages())) {
      this.stages[i].stageNumber = i
    }
    this.content.deleteStage(index)

    this.raiseEvent({ type: "stage-deleted", project: this, stage })
  }
  delete() {
    if (!this.valid) return
    remove_from_list(global.projects, this)
    this.valid = false
    for (const [, stage] of pairs(this.stages)) {
      stage._doDelete()
    }
    this.raiseEvent({ type: "project-deleted", project: this })
    this.localEvents.closeAll()
  }

  _getNewStageName(stage: StageNumber): {
    name: string
    strategy: "increment" | "decrement" | "sublist" | "none"
    lastNumber?: number
    previousLastNumber?: number
  } {
    // try to detect naming convention:
    // (Anything)(number)

    const otherStageNum = stage == 1 ? 1 : stage - 1
    const otherStage = this.stages[otherStageNum]
    const previousName = otherStage.name.get()
    const [name, numStr] = string.match(previousName, "^(.*)(%d+)$")
    const num = tonumber(numStr)

    const foundNumber = name != nil && num != nil
    if (foundNumber) {
      // see if there is a previous number and separator, before the last number
      // follow naming convention
      const newNum = tonumber(numStr)! + (stage == 1 ? -1 : 1)
      if (newNum >= 0) {
        const candidateName = name + newNum
        const nextName = this.stages[stage]?.name.get()
        if (candidateName != nextName) {
          return {
            name: candidateName,
            strategy: stage == 1 ? "decrement" : "increment",
            lastNumber: newNum,
            previousLastNumber: num,
          }
        }
      }
    }

    if (stage == 1)
      return {
        name: "New Stage",
        strategy: "none",
      }
    const sep = string.match(previousName, "^.*%d+([^%d]+)%d+$")[0] ?? (foundNumber ? "." : " ")
    return {
      name: previousName + sep + "1",
      strategy: "sublist",
      lastNumber: 1,
    }
  }

  private raiseEvent(event: LocalProjectEvent): void {
    // local first, more useful event order
    this.localEvents.raise(event)
    GlobalProjectEvents.raise(event)
  }
  private assertValid(): void {
    if (!this.valid) error("Project is invalid")
  }

  __tostring(): string {
    return `<Project ${this.id} "${this.name.get()}">`
  }

  static onProjectCreated(project: UserProjectImpl): void {
    global.projects.push(project)
    GlobalProjectEvents.raise({ type: "project-created", project })
  }
}

interface HasProject {
  project: UserProject
}

const UserActionsClass = LazyLoadClass<HasProject, UserActions>("UserActions", ({ project }) =>
  UserActions(project, project.updates, project.entityUpdates),
)
const ProjectUpdatesClass = LazyLoadClass<HasProject, ProjectUpdates>("ProjectUpdates", ({ project }) =>
  ProjectUpdates(project, project.entityUpdates),
)
const WorldEntityUpdatesClass = LazyLoadClass<HasProject, WorldEntityUpdates>("WorldEntityUpdates", ({ project }) =>
  WorldEntityUpdates(project, EntityHighlights(project)),
)

export function createUserProject(name: string, initialNumStages: number): UserProject {
  return UserProjectImpl.create(name, initialNumStages)
}

export function _deleteAllProjects(): void {
  for (const project of global.projects) {
    project.delete()
  }
  global.nextProjectId = 1 as ProjectId
}
export function getAllProjects(): readonly UserProject[] {
  return global.projects
}

function swapProjects(index1: number, index2: number): void {
  const projects = global.projects
  const temp = projects[index1]
  projects[index1] = projects[index2]
  projects[index2] = temp
  GlobalProjectEvents.raise({
    type: "projects-reordered",
    project1: projects[index1],
    project2: projects[index2],
  })
}
export function moveProjectUp(project: UserProject): boolean {
  // up means lower index
  const index = global.projects.indexOf(project as UserProjectImpl)
  if (index <= 0) return false
  swapProjects(index - 1, index)
  return true
}

export function moveProjectDown(project: UserProject): boolean {
  // down means higher index
  const index = global.projects.indexOf(project as UserProjectImpl)
  if (index < 0 || index >= global.projects.length - 1) return false
  swapProjects(index, index + 1)
  return true
}

function createEmptyStageBlueprintSettings(): BlueprintOverrideSettings {
  return createEmptyPropertyOverrideTable<StageBlueprintSettings>(keys<StageBlueprintSettings>())
}

@RegisterClass("Stage")
class StageImpl implements Stage {
  name: MutableProperty<string>
  readonly valid = true

  readonly surfaceIndex: SurfaceIndex

  stageBlueprintSettings = createEmptyStageBlueprintSettings()

  actions: UserActions

  getBlueprintSettingsView(): BlueprintSettingsTable {
    return createdDiffedPropertyTableView(this.project.defaultBlueprintSettings, this.stageBlueprintSettings)
  }

  getBlueprintBBox(): BBox {
    return this.project.content.computeBoundingBox() ?? BBox.coords(-20, -20, 20, 20)
  }
  constructor(
    public project: UserProjectImpl,
    readonly surface: LuaSurface,
    public stageNumber: StageNumber,
    name: string,
  ) {
    this.name = property(name)
    this.surfaceIndex = surface.index
    if (project.id != 0) global.surfaceIndexToStage.set(this.surfaceIndex, this)
    this.actions = project.actions
  }

  static create(
    project: UserProjectImpl,
    stageNumber: StageNumber,
    name: string,
    copySettingsFrom: LuaSurface | nil,
  ): StageImpl {
    const area = project.content.computeBoundingBox()
    const surface = createStageSurface(area, copySettingsFrom)
    return new StageImpl(project, surface, stageNumber, name)
  }

  deleteInProject(): void {
    if (!this.valid) return
    this.project.deleteStage(this.stageNumber)
  }

  _doDelete(): void {
    if (!this.valid) return
    ;(this as Mutable<Stage>).valid = false
    global.surfaceIndexToStage.delete(this.surfaceIndex)
    if (this.surface.valid) destroySurface(this.surface)
  }

  __tostring() {
    return `<Stage ${this.stageNumber} "${this.name.get()}" of "${this.project.name.get()}">`
  }
}

Events.on_pre_surface_deleted((e) => {
  const stage = getStageAtSurface(e.surface_index)
  if (stage != nil) stage.deleteInProject()
})

Migrations.priority(1, "0.23.0", () => {
  assume<{
    assemblies?: Record<number, UserProjectImpl>
  }>(global)
  global.projects = global.assemblies! as any
  for (const [, project] of pairs(global.assemblies!)) {
    for (const stage of project.getAllStages()) {
      assume<{
        assembly?: UserProjectImpl
      }>(stage)
      stage.project = project
      delete stage.assembly
    }
  }
})
Migrations.priority(2, "0.16.0", () => {
  const oldProjects = global.projects as unknown as LuaMap<ProjectId, UserProjectImpl>
  global.projects = Object.values(oldProjects)
})
Migrations.priority(2, "0.27.0", () => {
  for (const project of global.projects) {
    project.actions = UserActionsClass({ project })
    project.updates = ProjectUpdatesClass({ project })
    project.entityUpdates = WorldEntityUpdatesClass({ project })
    for (const stage of project.getAllStages()) {
      stage.actions = project.actions
    }
  }
})
Migrations.early("0.23.0", () => {
  assume<{
    nextAssemblyId: any
  }>(global)
  global.nextProjectId = global.nextAssemblyId
  delete global.nextAssemblyId
})
Migrations.early("0.26.0", () => {
  for (const project of global.projects) {
    project.displayName = nil!
  }
})
Migrations.to("0.26.1", () => {
  for (const project of global.projects) {
    for (const stage of project.getAllStages()) {
      assume<{
        assembly?: UserProjectImpl
      }>(stage)
      delete stage.assembly
    }
  }
})

Migrations.to("0.16.0", () => {
  interface OldProject {
    assemblyBlueprintSettings?: {
      autoLandfill: MutableProperty<boolean>
      useNextStageTiles: MutableProperty<boolean>

      emptyBlueprintNames: MutableProperty<boolean>
      emptyBlueprintBookName: MutableProperty<boolean>

      entityFilters: MutableProperty<LuaSet<string> | nil>
      entityFilterMode: MutableProperty<defines.deconstruction_item.entity_filter_mode | nil>
      replaceInfinityWithCombinators: MutableProperty<boolean>
    }
  }

  interface OldStage {
    blueprintSettings?: {
      name: string
      icons: BlueprintSignalIcon[] | nil

      /** Original position + offset = blueprint position */
      positionOffset: Position
      snapToGrid?: Position
      positionRelativeToGrid?: Position
      absoluteSnapping: boolean
    }
  }

  function copyFromOldStageSettings(
    newSettings: PropertiesTable<OverrideableBlueprintSettings>,
    oldSettings: OldStage["blueprintSettings"] & AnyNotNil,
  ) {
    newSettings.positionOffset.set(oldSettings.positionOffset)
    newSettings.snapToGrid.set(oldSettings.snapToGrid)
    newSettings.positionRelativeToGrid.set(oldSettings.positionRelativeToGrid)
    newSettings.absoluteSnapping.set(oldSettings.absoluteSnapping)
  }

  for (const project of global.projects) {
    assume<Mutable<UserProjectImpl>>(project)
    assume<OldProject>(project)

    const oldSettings = project.assemblyBlueprintSettings!
    delete project.assemblyBlueprintSettings

    const newSettings = createNewBlueprintSettings()
    project.defaultBlueprintSettings = newSettings

    newSettings.autoLandfill.set(oldSettings.autoLandfill.get())
    newSettings.useNextStageTiles.set(oldSettings.useNextStageTiles.get())
    newSettings.replaceInfinityEntitiesWithCombinators.set(oldSettings.replaceInfinityWithCombinators.get())

    const entityFilterMode = oldSettings.entityFilterMode.get()
    if (entityFilterMode == entity_filter_mode.whitelist) {
      newSettings.additionalWhitelist.set(oldSettings.entityFilters.get())
    } else if (entityFilterMode == entity_filter_mode.blacklist) {
      newSettings.blacklist.set(oldSettings.entityFilters.get())
    }

    const lastStageSettings = (project.getStage(project.numStages())! as OldStage).blueprintSettings!
    copyFromOldStageSettings(newSettings, lastStageSettings)

    for (const stage of project.getAllStages()) {
      assume<OldStage>(stage)
      const oldSettings = stage.blueprintSettings!
      delete stage.blueprintSettings

      stage.stageBlueprintSettings = createEmptyStageBlueprintSettings()

      const view = stage.getBlueprintSettingsView()
      copyFromOldStageSettings(view, oldSettings)
      stage.stageBlueprintSettings.icons.set(iconsFromBpFormat(oldSettings.icons))
      // note: changed to match 0.30.0
    }
  }
})

Migrations.to("0.23.1", () => {
  for (const project of global.projects) {
    project.name.forceNotify()
  }
})
Migrations.to("0.25.0", () => {
  for (const project of global.projects) {
    assume<Mutable<PropertiesTable<OverrideableBlueprintSettings>>>(project.defaultBlueprintSettings)
    project.defaultBlueprintSettings.useModulePreloading = property(false)
    for (const stage of project.getAllStages()) {
      assume<Mutable<BlueprintOverrideSettings>>(stage.stageBlueprintSettings)
      stage.stageBlueprintSettings.useModulePreloading = property(false)
    }
  }
})
Migrations.to("0.27.0", () => {
  for (const project of global.projects) {
    assume<Mutable<UserProjectImpl>>(project)
    project.landfillTile = property("landfill")
  }
})

Migrations.to("0.30.0", () => {
  for (const project of global.projects) {
    asMutable(project.defaultBlueprintSettings).icons ??= property([])
    for (const stage of project.getAllStages()) {
      const oldValue = stage.stageBlueprintSettings.icons.get()
      if (oldValue == nil) continue
      assume<BlueprintSignalIcon[]>(oldValue)
      const [, firstValue] = next(oldValue)
      if ("index" in firstValue) {
        stage.stageBlueprintSettings.icons.set(iconsFromBpFormat(oldValue))
      }
    }
  }
})
