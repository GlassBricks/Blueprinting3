/*
 * Copyright (c) 2022 GlassBricks
 * This file is part of 100% Blueprint Planning.
 *
 * 100% Blueprint Planning is free software: you can redistribute it and/or modify it under the terms of the GNU Lesser General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 *
 * 100% Blueprint Planning is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License along with 100% Blueprint Planning. If not, see <https://www.gnu.org/licenses/>.
 */

import { keys } from "ts-transformer-keys"
import { AssemblyData } from "../../assembly/AssemblyDef"
import {
  AssemblyUpdater,
  EntityRotateResult,
  EntityUpdateResult,
  StageMoveResult,
  WireUpdateResult,
} from "../../assembly/AssemblyUpdater"
import { createWorldListener, WorldListener, WorldNotifier } from "../../assembly/WorldListener"
import { L_Game } from "../../constants"
import { AssemblyEntity, createAssemblyEntity, StageNumber } from "../../entity/AssemblyEntity"
import { EntityHandler } from "../../entity/EntityHandler"
import { Pos } from "../../lib/geometry"
import { L_Interaction } from "../../locale"
import { makeStubbed } from "../simple-mock"
import { createMockAssemblyContent, setupTestSurfaces } from "./Assembly-mock"

let worldNotifier: mock.Stubbed<WorldNotifier>
let assemblyUpdater: mock.Stubbed<AssemblyUpdater>
let totalAuCalls = 0
let expectedAuCalls = 1

let worldListener: WorldListener

before_each(() => {
  worldNotifier = makeStubbed(keys<WorldNotifier>())
  assemblyUpdater = makeStubbed(keys<AssemblyUpdater>())
  totalAuCalls = 0
  expectedAuCalls = 1
  for (const [, func] of pairs(assemblyUpdater)) {
    func.invokes((): any => {
      totalAuCalls++
    })
  }
  assemblyUpdater.moveEntityOnPreviewReplace.invokes((_: any, __: any, entity: AssemblyEntity) => {
    totalAuCalls++
    return entity.firstStage
  })

  worldListener = createWorldListener(assemblyUpdater, worldNotifier)
})

after_each(() => {
  assert.same(expectedAuCalls, totalAuCalls, "total assembly updater calls")
})

const surfaces = setupTestSurfaces(6)
let assembly: AssemblyData
before_each(() => {
  assembly = createMockAssemblyContent(surfaces)
})

const pos = Pos(10.5, 10.5)
function createWorldEntity(stageNum: StageNumber, args?: Partial<SurfaceCreateEntity>): LuaEntity {
  const params = {
    name: "filter-inserter",
    position: pos,
    force: "player",
    ...args,
  }
  const entity = assert(surfaces[stageNum - 1].create_entity(params), "created entity")[0]
  const proto = game.entity_prototypes[params.name]
  if (proto.type === "inserter") {
    entity.inserter_stack_size_override = 1
    entity.inserter_filter_mode = "whitelist"
  }
  return entity
}
const playerIndex = 1 as PlayerIndex

function addEntity(
  stage: StageNumber,
  args?: Partial<SurfaceCreateEntity>,
): {
  luaEntity: LuaEntity
  entity: AssemblyEntity
} {
  const luaEntity = createWorldEntity(stage, args)
  const [value, dir] = EntityHandler.saveEntity(luaEntity)
  const assemblyEntity = createAssemblyEntity(value, luaEntity.position, dir, stage)
  assembly.content.add(assemblyEntity)
  return { luaEntity, entity: assemblyEntity }
}

let notificationsAsserted = false
function assertNotified(entity: LuaEntity, message: LocalisedString, errorSound: boolean) {
  assert.spy(worldNotifier.createNotification).called(1)
  // assert.spy(worldNotifier.createNotification).called_with(match.ref(entity), playerIndex, message, errorSound)
  const [cEntity, cPlayerIndex, cMessage, cErrorSound] = table.unpack(
    worldNotifier.createNotification.calls[0]!.refs as any[],
  )
  assert.same(entity.position, cEntity.position, "notified position")
  assert.same(playerIndex, cPlayerIndex, "notified player")
  assert.same(message, cMessage, "notified message")
  assert.same(errorSound, cErrorSound, "notified error sound")
  notificationsAsserted = true
}
before_each(() => {
  notificationsAsserted = false
})
after_each(() => {
  if (!notificationsAsserted)
    assert.message("unexpected notification").spy(worldNotifier.createNotification).not_called()
})

describe("onEntityCreated", () => {
  test("can add a simple entity", () => {
    const luaEntity = createWorldEntity(2)
    worldListener.onEntityCreated(assembly, 2, luaEntity, playerIndex)
    assert.spy(assemblyUpdater.addNewEntity).was.called_with(assembly, 2, luaEntity)
  })

  test.each([2, 3])("at same or higher stage %d sets entity and calls refreshEntityAtStage", (newStage) => {
    const { luaEntity, entity } = addEntity(2)
    worldListener.onEntityCreated(assembly, newStage, luaEntity, playerIndex)

    assert.equal(luaEntity, entity.getWorldEntity(newStage))
    assert.spy(assemblyUpdater.refreshEntityAtStage).was.called_with(match.ref(assembly), newStage, entity)
  })

  test.each([1, 2], "at lower stage %d sets entity and calls moveEntityOnPreviewReplace", (newStage) => {
    const { luaEntity, entity } = addEntity(3)
    worldListener.onEntityCreated(assembly, newStage, luaEntity, playerIndex)

    assert.equal(luaEntity, entity.getWorldEntity(newStage))
    assert.spy(assemblyUpdater.moveEntityOnPreviewReplace).was.called_with(match.ref(assembly), newStage, entity)
    assertNotified(luaEntity, [L_Interaction.EntityMovedFromStage, "mock stage 3"], false)
  })

  test.each(
    [1, 2, 3],
    "on a settings-remnant at any stage (%d) sets entity and calls reviveSettingsRemnant",
    (newStage) => {
      const { luaEntity, entity } = addEntity(2)
      entity.isSettingsRemnant = true

      worldListener.onEntityCreated(assembly, newStage, luaEntity, playerIndex)
      assert.equal(luaEntity, entity.getWorldEntity(newStage))
      assert.spy(assemblyUpdater.reviveSettingsRemnant).was.called_with(match.ref(assembly), newStage, entity)
    },
  )

  test("if entity can overlap with existing, adding lower at a new direction creates new entity instead of updating old", () => {
    addEntity(2, {
      name: "straight-rail",
      direction: defines.direction.east,
    })
    const luaEntity2 = createWorldEntity(2, {
      name: "straight-rail",
      direction: defines.direction.north,
    })
    worldListener.onEntityCreated(assembly, 2, luaEntity2, playerIndex)
    assert.spy(assemblyUpdater.addNewEntity).was.called_with(assembly, 2, luaEntity2)
  })
})

describe("onEntityDeleted", () => {
  test("if entity not in assembly, does nothing", () => {
    const luaEntity = createWorldEntity(2)
    worldListener.onEntityDeleted(assembly, 2, luaEntity, playerIndex)
    expectedAuCalls = 0
  })

  test("in a lower stage does nothing (bug)", () => {
    addEntity(2)
    const luaEntity = createWorldEntity(1)
    worldListener.onEntityDeleted(assembly, 1, luaEntity, playerIndex)
    expectedAuCalls = 0
  })

  test("in a higher stage calls disallowEntityDeletion", () => {
    const { luaEntity, entity } = addEntity(2)
    worldListener.onEntityDeleted(assembly, 3, luaEntity, playerIndex)
    assert.spy(assemblyUpdater.disallowEntityDeletion).was.called_with(match.ref(assembly), 3, entity)
  })

  test("in same stage calls deleteEntityOrCreateSettingsRemnant", () => {
    const { luaEntity, entity } = addEntity(2)
    worldListener.onEntityDeleted(assembly, 2, luaEntity, playerIndex)
    assert.spy(assemblyUpdater.deleteEntityOrCreateSettingsRemnant).was.called_with(match.ref(assembly), entity)
  })
})

test("onEntityDied calls clearEntityAtStage", () => {
  const { luaEntity, entity } = addEntity(2)
  worldListener.onEntityDied(assembly, 2, luaEntity)
  assert.spy(assemblyUpdater.clearEntityAtStage).was.called_with(match.ref(assembly), 2, entity)
})

const resultMessages: Array<[EntityUpdateResult, string | false]> = [
  ["no-change", false],
  ["updated", false],
  ["cannot-rotate", L_Game.CantBeRotated],
  ["cannot-flip-multi-pair-underground", L_Interaction.CannotFlipUndergroundDueToMultiplePairs],
  ["cannot-upgrade-multi-pair-underground", L_Interaction.CannotUpgradeUndergroundDueToMultiplePairs],
  ["cannot-create-pair-upgrade", L_Interaction.CannotCreateUndergroundUpgradeIfNotInSameStage],
  ["cannot-upgrade-changed-pair", L_Interaction.CannotUpgradeUndergroundChangedPair],
]

describe("onEntityPotentiallyUpdated", () => {
  test("if not in assembly, defaults to add behaviour", () => {
    const luaEntity = createWorldEntity(2)
    worldListener.onEntityPotentiallyUpdated(assembly, 2, luaEntity, nil, playerIndex)
    assert.spy(assemblyUpdater.addNewEntity).was.called_with(assembly, 2, luaEntity)
  })

  test.each(resultMessages)('calls tryUpdateEntityFromWorld and notifies, with result "%s"', (result, message) => {
    const { luaEntity, entity } = addEntity(2)
    assemblyUpdater.tryUpdateEntityFromWorld.invokes(() => {
      totalAuCalls++
      return result
    })
    worldListener.onEntityPotentiallyUpdated(assembly, 2, luaEntity, nil, playerIndex)

    assert.spy(assemblyUpdater.tryUpdateEntityFromWorld).was.called_with(match.ref(assembly), 2, entity, luaEntity)
    if (message) assertNotified(luaEntity, [message], true)
  })

  test("works with upgrade-compatible entity (fast-replace)", () => {
    const { luaEntity, entity } = addEntity(2)
    assemblyUpdater.tryUpdateEntityFromWorld.invokes(() => {
      totalAuCalls++
      return "updated"
    })
    luaEntity.destroy()
    const luaEntity2 = createWorldEntity(2, { name: "stack-filter-inserter" })
    worldListener.onEntityPotentiallyUpdated(assembly, 2, luaEntity2, nil, playerIndex)

    assert.spy(assemblyUpdater.tryUpdateEntityFromWorld).was.called_with(match.ref(assembly), 2, entity, luaEntity2)
  })

  test("works with upgrade-compatible entity (fast-replace) with different direction", () => {
    const { luaEntity, entity } = addEntity(2)
    assemblyUpdater.tryUpdateEntityFromWorld.invokes(() => {
      totalAuCalls++
      return "updated"
    })
    const oldDirection = luaEntity.direction
    luaEntity.destroy()
    const luaEntity2 = createWorldEntity(2, { name: "stack-filter-inserter", direction: defines.direction.south })
    worldListener.onEntityPotentiallyUpdated(assembly, 2, luaEntity2, oldDirection, playerIndex)

    assert.spy(assemblyUpdater.tryUpdateEntityFromWorld).was.called_with(match.ref(assembly), 2, entity, luaEntity2)
  })
})

describe("onEntityRotated", () => {
  test("if not in assembly, defaults to add behavior", () => {
    const luaEntity = createWorldEntity(2)
    worldListener.onEntityRotated(assembly, 2, luaEntity, luaEntity.direction, playerIndex)
    assert.spy(assemblyUpdater.addNewEntity).was.called_with(assembly, 2, luaEntity)
  })

  test.each<[EntityRotateResult, string | false]>([
    ["no-change", false],
    ["updated", false],
    ["cannot-rotate", L_Game.CantBeRotated],
    ["cannot-flip-multi-pair-underground", L_Interaction.CannotFlipUndergroundDueToMultiplePairs],
  ])('calls tryRotateEntityFromWorld and notifies, with result "%s"', (result, message) => {
    const { luaEntity, entity } = addEntity(2)
    assemblyUpdater.tryRotateEntityToMatchWorld.invokes(() => {
      totalAuCalls++
      return result
    })
    worldListener.onEntityRotated(assembly, 2, luaEntity, luaEntity.direction, playerIndex)

    assert.spy(assemblyUpdater.tryRotateEntityToMatchWorld).was.called_with(match.ref(assembly), 2, entity, luaEntity)
    if (message) assertNotified(luaEntity, [message], true)
  })
})

describe("onEntityMarkedForUpgrade", () => {
  test("if not in assembly, defaults to add behavior", () => {
    const luaEntity = createWorldEntity(2)
    worldListener.onEntityMarkedForUpgrade(assembly, 2, luaEntity, playerIndex)
    assert.spy(assemblyUpdater.addNewEntity).was.called_with(assembly, 2, luaEntity)
  })

  test.each(resultMessages)('calls tryUpgradeEntityFromWorld and notifies, with result "%s"', (result, message) => {
    const { luaEntity, entity } = addEntity(2)
    assemblyUpdater.tryApplyUpgradeTarget.invokes(() => {
      totalAuCalls++
      return result
    })
    worldListener.onEntityMarkedForUpgrade(assembly, 2, luaEntity, playerIndex)

    assert.spy(assemblyUpdater.tryApplyUpgradeTarget).was.called_with(match.ref(assembly), 2, entity, luaEntity)
    if (message) assertNotified(luaEntity, [message], true)
  })
})

describe("onCircuitWiresPotentiallyUpdated", () => {
  test("if not in assembly, defaults to add behavior", () => {
    const luaEntity = createWorldEntity(2)
    worldListener.onCircuitWiresPotentiallyUpdated(assembly, 2, luaEntity, playerIndex)
  })

  test.each<[WireUpdateResult, string | false]>([
    ["no-change", false],
    ["updated", false],
    ["max-connections-exceeded", L_Interaction.MaxConnectionsReachedInAnotherStage],
  ])('calls updateWiresFromWorld and notifies, with result "%s"', (result, message) => {
    const { luaEntity, entity } = addEntity(2)
    assemblyUpdater.updateWiresFromWorld.invokes(() => {
      totalAuCalls++
      return result
    })
    worldListener.onCircuitWiresPotentiallyUpdated(assembly, 2, luaEntity, playerIndex)

    assert.spy(assemblyUpdater.updateWiresFromWorld).was.called_with(match.ref(assembly), 2, entity)
    if (message) assertNotified(luaEntity, [message], true)
  })
})

function createPreviewEntity(luaEntity: LuaEntity) {
  return EntityHandler.createPreviewEntity(luaEntity.surface, luaEntity.position, luaEntity.direction, luaEntity.name)!
}

describe("onCleanupToolUsed", () => {
  test("if not in assembly, does nothing", () => {
    const luaEntity = createWorldEntity(2)
    worldListener.onCleanupToolUsed(assembly, 2, luaEntity)
    expectedAuCalls = 0
  })

  test("if is settings remnant, calls forceDeleteEntity", () => {
    const { luaEntity, entity } = addEntity(2)
    entity.isSettingsRemnant = true
    worldListener.onCleanupToolUsed(assembly, 2, createPreviewEntity(luaEntity))
    assert.spy(assemblyUpdater.forceDeleteEntity).was.called_with(match.ref(assembly), entity)
  })

  test("if is less than first stage, does nothing", () => {
    const { luaEntity } = addEntity(1)
    worldListener.onCleanupToolUsed(assembly, 2, luaEntity)
    expectedAuCalls = 0
  })

  test.each([2, 3])("if is in stage %s, calls refreshEntityAllStages", (atStage) => {
    const { luaEntity, entity } = addEntity(2)
    worldListener.onCleanupToolUsed(assembly, atStage, createPreviewEntity(luaEntity))
    assert.spy(assemblyUpdater.refreshEntityAllStages).was.called_with(match.ref(assembly), entity)
  })
})

test("onEntityForceDeleted calls forceDeleteEntity", () => {
  const { luaEntity, entity } = addEntity(2)
  worldListener.onEntityForceDeleted(assembly, 2, createPreviewEntity(luaEntity))
  assert.spy(assemblyUpdater.forceDeleteEntity).was.called_with(match.ref(assembly), entity)
})

test("onEntityDied calls clearEntityAtStage", () => {
  const { luaEntity, entity } = addEntity(2)
  worldListener.onEntityDied(assembly, 2, luaEntity)
  assert.spy(assemblyUpdater.clearEntityAtStage).was.called_with(match.ref(assembly), 2, entity)
})

describe("onMoveEntityToStage", () => {
  test("if not in assembly, does nothing", () => {
    const luaEntity = createWorldEntity(2)
    worldListener.onMoveEntityToStage(assembly, 2, luaEntity, playerIndex)
    expectedAuCalls = 0
  })
  test.each<[StageMoveResult, LocalisedString | false]>([
    ["updated", [L_Interaction.EntityMovedFromStage, "mock stage 3"]],
    ["no-change", [L_Interaction.AlreadyAtFirstStage]],
    ["cannot-move-upgraded-underground", [L_Interaction.CannotMoveUndergroundBeltWithUpgrade]],
    ["settings-remnant-revived", false],
  ])('calls moveEntityToStage and notifies, with result "%s"', (result, message) => {
    const { luaEntity, entity } = addEntity(3)
    assemblyUpdater.moveEntityToStage.invokes(() => {
      totalAuCalls++
      return result
    })
    worldListener.onMoveEntityToStage(assembly, 2, luaEntity, playerIndex)

    assert.spy(assemblyUpdater.moveEntityToStage).was.called_with(match.ref(assembly), 2, entity)
    if (message) assertNotified(luaEntity, message, result !== "updated")
  })
})

describe("onEntityMoved", () => {
  test("if not in assembly, defaults to add behavior", () => {
    const luaEntity = createWorldEntity(2)
    worldListener.onEntityMoved(assembly, 2, luaEntity, luaEntity.position, playerIndex)
    assert.spy(assemblyUpdater.addNewEntity).was.called_with(assembly, 2, luaEntity)
  })

  test("calls tryMoveEntity and does not notify if returns nil", () => {
    const { luaEntity, entity } = addEntity(2)
    entity.replaceWorldEntity(2, luaEntity) // needed to detect entity
    // assemblyUpdater.tryMoveEntity.invokes(() => {
    //   totalAuCalls++
    //   return nil
    // })
    // already returns nil
    worldListener.onEntityMoved(assembly, 2, luaEntity, luaEntity.position, playerIndex)

    assert.spy(assemblyUpdater.tryDollyEntity).was.called_with(match.ref(assembly), 2, entity)
  })

  test("calls tryMoveEntity and notifies if returns error", () => {
    // just one example
    const { luaEntity, entity } = addEntity(2)
    entity.replaceWorldEntity(2, luaEntity)
    assemblyUpdater.tryDollyEntity.invokes(() => {
      totalAuCalls++
      return "entities-missing"
    })
    worldListener.onEntityMoved(assembly, 2, luaEntity, luaEntity.position, playerIndex)

    assert.spy(assemblyUpdater.tryDollyEntity).was.called_with(match.ref(assembly), 2, entity)
    assertNotified(luaEntity, [L_Interaction.EntitiesMissing, ["entity-name.filter-inserter"]], true)
  })
})
