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

import expect from "tstl-expect"
import { Prototypes } from "../../constants"
import { Entity } from "../../entity/Entity"
import { createProjectEntityNoCopy, ProjectEntity, StageNumber } from "../../entity/ProjectEntity"
import { Pos } from "../../lib/geometry"
import {
  deleteAllHighlights,
  HighlightEntities,
  makeSettingsRemnantHighlights,
  updateAllHighlights,
  updateHighlightsOnSettingsRemnantRevived,
} from "../../project/entity-highlights"
import { Project } from "../../project/ProjectDef"
import { moduleMock } from "../module-mock"
import { simpleMock } from "../simple-mock"
import { assertConfigChangedHighlightsCorrect, assertErrorHighlightsCorrect } from "./entity-highlight-test-util"
import { createMockProject, setupTestSurfaces } from "./Project-mock"

interface FooEntity extends Entity {
  foo?: number
}
let entity: ProjectEntity<FooEntity>
let project: Project

import _highlightCreator = require("../../project/create-highlight")

const highlightCreator = moduleMock(_highlightCreator, false)

const surfaces = setupTestSurfaces(5)
before_each(() => {
  project = createMockProject(surfaces)
  highlightCreator.createSprite.invokes((params) => simpleMock(params as any))
  entity = createProjectEntityNoCopy({ name: "stone-furnace" }, Pos(1, 1), nil, 2)
})

function createEntity(stage: StageNumber) {
  return assert(
    surfaces[stage - 1].create_entity({
      name: "stone-furnace",
      position: Pos(1, 1),
    }),
  )
}
function createPreview(stage: StageNumber) {
  return assert(
    surfaces[stage - 1].create_entity({
      name: Prototypes.PreviewEntityPrefix + "stone-furnace",
      position: Pos(1, 1),
    }),
  )
}

function removeInStage(stage: StageNumber) {
  entity.replaceWorldOrPreviewEntity(stage, createPreview(stage))
}
function addInStage(stage: StageNumber) {
  entity.replaceWorldOrPreviewEntity(stage, createEntity(stage))
}
describe("error highlights", () => {
  before_each(() => {
    for (const i of $range(1, 5)) addInStage(i)
  })
  after_each(() => {
    assertErrorHighlightsCorrect(entity, 5)
  })
  test("creates highlight when world entity missing", () => {
    removeInStage(2)
    updateAllHighlights(project, entity)
    expect(entity.getExtraEntity("errorOutline", 2)!).to.be.any()
  })

  test("deletes highlight when entity revived", () => {
    removeInStage(2)
    updateAllHighlights(project, entity)
    addInStage(2)
    updateAllHighlights(project, entity)
    expect(entity.getExtraEntity("errorOutline", 2)).to.be.nil()
  })

  test.each<[readonly number[]]>([[[2]], [[2, 3]], [[2, 4]], [[3]]])(
    "creates indicator in other stages, %s",
    (stages) => {
      const stageSet = new LuaSet()
      for (const stage of stages) {
        removeInStage(stage)
        stageSet.add(stage)
      }
      updateAllHighlights(project, entity)

      for (let i = 1; i < 5; i++) {
        if (i == 1 || stageSet.has(i)) {
          expect(entity.getExtraEntity("errorElsewhereIndicator", i)).to.be.nil()
        } else {
          expect(entity.getExtraEntity("errorElsewhereIndicator", i)).to.be.any()
        }
      }
    },
  )

  test("deletes indicators only when all highlights removed", () => {
    removeInStage(2)
    removeInStage(3)
    updateAllHighlights(project, entity)
    for (let i = 4; i <= 5; i++) expect(entity.getExtraEntity("errorElsewhereIndicator", i)).to.be.any()
    addInStage(3)
    updateAllHighlights(project, entity)
    for (let i = 3; i <= 5; i++) expect(entity.getExtraEntity("errorElsewhereIndicator", i)).to.be.any()
    addInStage(2)
    updateAllHighlights(project, entity)
    for (let i = 1; i <= 5; i++) expect(entity.getExtraEntity("errorElsewhereIndicator", i)).to.be.nil()
  })

  test("does nothing if created in lower than first stage", () => {
    updateAllHighlights(project, entity)
    expect(entity.getExtraEntity("errorOutline", 1)).to.be.nil()
  })
})

describe("config changed highlight", () => {
  before_each(() => {
    for (const i of $range(1, 5)) entity.replaceWorldEntity(i, createEntity(i))
  })
  function setAt(stage: StageNumber) {
    assert(stage >= 2)
    entity._applyDiffAtStage(stage, { foo: stage })
  }
  function setUpgradeAt(stage: StageNumber) {
    assert(stage >= 2)
    // ;(entity._getStageDiffs() as any)[stage] = { name: "test" + stage.toString() }
    entity._applyDiffAtStage(stage, { name: "test" + stage.toString() })
  }
  function clearAt(stage: StageNumber) {
    assert(stage >= 2)
    // ;(entity._getStageDiffs() as any)[stage] = nil
    entity.adjustValueAtStage(stage, entity.getValueAtStage(stage - 1)!)
  }
  function assertCorrect() {
    updateAllHighlights(project, entity)
    assertConfigChangedHighlightsCorrect(entity, 5)
  }
  test("single", () => {
    setAt(3)
    assertCorrect()
    clearAt(3)
    assertCorrect()
  })
  test("multiple", () => {
    setAt(3)
    setAt(4)
    assertCorrect()
    clearAt(3)
    assertCorrect()
    clearAt(4)
    assertCorrect()
  })
  test("with upgrade", () => {
    setUpgradeAt(3)
    assertCorrect()
    clearAt(3)
    assertCorrect()
  })
  test("with upgrade, multiple", () => {
    setAt(3)
    setUpgradeAt(4)
    assertCorrect()
    setUpgradeAt(3)
    assertCorrect()
    clearAt(4)
    assertCorrect()
    clearAt(3)
    assertCorrect()
  })
  test("clears when moved to higher stage", () => {
    setAt(3)
    assertCorrect()
    entity.setFirstStageUnchecked(2)
    assertCorrect()
    expect(entity.getExtraEntity("configChangedLaterHighlight", 1)).to.be.nil()
  })
})

describe("stage delete highlights", () => {
  test("sets highlight if lastStage is set", () => {
    entity.setLastStageUnchecked(3)
    updateAllHighlights(project, entity)
    expect(entity.getExtraEntity("stageDeleteHighlight", 3)).to.be.any()
  })

  test("removes highlight if lastStage is cleared", () => {
    entity.setLastStageUnchecked(3)
    updateAllHighlights(project, entity)
    entity.setLastStageUnchecked(nil)
    updateAllHighlights(project, entity)
    expect(entity.getExtraEntity("stageDeleteHighlight", 3)).to.be.nil()
  })

  test("does not create highlight if lastStage == firstStage", () => {
    entity.setLastStageUnchecked(2)
    updateAllHighlights(project, entity)
    expect(entity.getExtraEntity("stageDeleteHighlight", 2)).to.be.nil()
  })
})

describe("settings remnants", () => {
  function createSettingsRemnant() {
    entity.isSettingsRemnant = true
    for (let i = 1; i <= 5; i++) removeInStage(i)
  }
  function reviveSettingsRemnant() {
    entity.isSettingsRemnant = nil
    for (let i = 1; i <= 5; i++) addInStage(i)
  }
  test("makeSettingsRemnant creates highlights", () => {
    createSettingsRemnant()
    makeSettingsRemnantHighlights(project, entity)
    for (let i = 1; i <= 5; i++) {
      expect(entity.getExtraEntity("settingsRemnantHighlight", i)).to.be.any()
    }
  })
  test("tryReviveSettingsRemnant removes highlights and sets entities correct", () => {
    createSettingsRemnant()
    makeSettingsRemnantHighlights(project, entity)
    reviveSettingsRemnant()
    updateHighlightsOnSettingsRemnantRevived(project, entity)
    for (let i = 1; i <= 5; i++) {
      expect(entity.getExtraEntity("settingsRemnantHighlight", i)).to.be.nil()
    }
  })
})

test("deleteAllHighlights", () => {
  entity.destroyWorldOrPreviewEntity(2)
  entity.destroyWorldOrPreviewEntity(3)
  updateAllHighlights(project, entity)
  deleteAllHighlights(entity)
  for (let i = 1; i <= 5; i++) {
    for (const type of keys<HighlightEntities>()) {
      expect(entity.getExtraEntity(type, i)).to.be.nil()
    }
  }
})