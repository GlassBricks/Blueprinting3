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

import { AsmCircuitConnection, getDirectionalInfo } from "../entity/AsmCircuitConnection"
import { AssemblyEntity, StageNumber } from "../entity/AssemblyEntity"
import { isEmpty } from "../lib"
import { AssemblyContent } from "./AssemblyContent"
import { AsmEntityCircuitConnections, CableAddResult, EntityMap } from "./EntityMap"

/** @noSelf */
export interface WireUpdater {
  /**
   * Handles both cable and circuit connections.
   *
   * Returns true if connections succeeded (false if max connections exceeded).
   */
  updateWireConnections(assembly: AssemblyContent, entity: AssemblyEntity, stageNumber: StageNumber): boolean
}

/** @noSelf */
export interface WireSaver {
  saveWireConnections(
    assembly: AssemblyContent,
    entity: AssemblyEntity,
    stageNumber: StageNumber,
  ): LuaMultiReturn<[hasAnyDiff: boolean, maxConnectionsExceeded?: boolean]>
}

/** @noSelf */
export interface WireHandler extends WireUpdater, WireSaver {}

const red = defines.wire_type.red
const green = defines.wire_type.green
function updateCircuitConnections(
  assembly: AssemblyContent,
  entity: AssemblyEntity,
  stageNumber: StageNumber,
  luaEntity: LuaEntity,
): void {
  const existingConnections = luaEntity.circuit_connection_definitions
  if (!existingConnections) return

  const assemblyConnections = assembly.content.getCircuitConnections(entity)
  if (!assemblyConnections) {
    luaEntity.disconnect_neighbour(red)
    luaEntity.disconnect_neighbour(green)
    return
  }

  const [matchingConnections, extraConnections] = analyzeExistingCircuitConnections(
    assemblyConnections,
    existingConnections,
    assembly.content,
  )
  for (const [extraConnection] of extraConnections) luaEntity.disconnect_neighbour(extraConnection)

  // add missing connections
  for (const [otherEntity, connections] of assemblyConnections) {
    const otherLuaEntity = otherEntity.getWorldEntity(stageNumber)
    if (!otherLuaEntity) continue
    for (const connection of connections) {
      if (matchingConnections.has(connection)) continue
      const [, otherId, thisId] = getDirectionalInfo(connection, otherEntity)
      luaEntity.connect_neighbour({
        wire: connection.wire,
        target_entity: otherLuaEntity,
        source_circuit_id: thisId,
        target_circuit_id: otherId,
      })
    }
  }
}

function updateCableConnections(
  assembly: AssemblyContent,
  entity: AssemblyEntity,
  stageNumber: StageNumber,
  luaEntity: LuaEntity,
): boolean {
  if (luaEntity.type !== "electric-pole") return true
  const { content } = assembly
  const assemblyConnections = content.getCableConnections(entity)
  if (!assemblyConnections) {
    luaEntity.disconnect_neighbour()
    return true
  }

  const matching = new Set<AssemblyEntity>()
  const existingConnections = (luaEntity.neighbours as { copper?: LuaEntity[] }).copper
  if (existingConnections) {
    for (const otherLuaEntity of existingConnections) {
      const otherEntity = content.findCompatible(otherLuaEntity, otherLuaEntity.position, nil)
      if (!otherEntity) continue
      if (assemblyConnections.has(otherEntity)) {
        matching.add(otherEntity)
      } else {
        luaEntity.disconnect_neighbour(otherLuaEntity)
      }
    }
  }

  for (const otherEntity of assemblyConnections) {
    const otherLuaEntity = otherEntity.getWorldEntity(stageNumber)
    if (otherLuaEntity && !matching.has(otherEntity)) {
      if (!luaEntity.connect_neighbour(otherLuaEntity)) return false
    }
  }
  return true
}

function updateWireConnections(assembly: AssemblyContent, entity: AssemblyEntity, stageNumber: StageNumber): boolean {
  const luaEntity = entity.getWorldEntity(stageNumber)
  if (!luaEntity) return false
  updateCircuitConnections(assembly, entity, stageNumber, luaEntity)
  return updateCableConnections(assembly, entity, stageNumber, luaEntity)
}

function saveCircuitConnections(
  assembly: AssemblyContent,
  entity: AssemblyEntity,
  stageNumber: StageNumber,
  luaEntity: LuaEntity,
): boolean {
  const existingConnections = luaEntity.circuit_connection_definitions
  if (!existingConnections) return false
  const { content } = assembly
  const assemblyConnections = content.getCircuitConnections(entity)

  const [matchingConnections, extraConnections] = analyzeExistingCircuitConnections(
    assemblyConnections,
    existingConnections,
    content,
  )

  let hasDiff = !isEmpty(extraConnections)

  // remove before add, so don't remove just added connections
  if (assemblyConnections) {
    for (const [otherEntity, connections] of assemblyConnections) {
      const otherLuaEntity = otherEntity.getWorldEntity(stageNumber)
      if (!otherLuaEntity) continue
      for (const connection of connections) {
        if (!matchingConnections.has(connection)) {
          content.removeCircuitConnection(connection)
          hasDiff = true
        }
      }
    }
  }

  for (const [definition, otherEntity] of extraConnections) {
    content.addCircuitConnection({
      fromEntity: entity,
      toEntity: otherEntity,
      wire: definition.wire,
      fromId: definition.source_circuit_id,
      toId: definition.target_circuit_id,
    })
  }
  return hasDiff
}

function saveCableConnections(
  assembly: AssemblyContent,
  entity: AssemblyEntity,
  stageNumber: StageNumber,
  luaEntity: LuaEntity,
): LuaMultiReturn<[hasAnyDiff: boolean, maxConnectionsExceeded?: boolean]> {
  if (luaEntity.type !== "electric-pole") return $multi(false)
  const existingConnections = (luaEntity.neighbours as { copper?: LuaEntity[] }).copper
  const { content } = assembly
  const assemblyConnections = content.getCableConnections(entity)

  const matching = new LuaSet<AssemblyEntity>()
  const toAdd: AssemblyEntity[] = []

  if (existingConnections) {
    for (const otherLuaEntity of existingConnections) {
      const otherEntity = content.findCompatible(otherLuaEntity, otherLuaEntity.position, nil)
      if (!otherEntity) continue
      if (!assemblyConnections || !assemblyConnections.has(otherEntity)) {
        toAdd.push(otherEntity)
      } else {
        matching.add(otherEntity)
      }
    }
  }

  let hasDiff = toAdd[0] !== nil
  // remove first, to not exceed max connections
  if (assemblyConnections) {
    for (const otherEntity of assemblyConnections) {
      const otherLuaEntity = otherEntity.getWorldEntity(stageNumber)
      if (otherLuaEntity && !matching.has(otherEntity)) {
        content.removeCableConnection(entity, otherEntity)
        hasDiff = true
      }
    }
  }

  let maxConnectionsExceeded: boolean | undefined
  for (const add of toAdd) {
    const result = content.addCableConnection(entity, add)
    if (result === CableAddResult.MaxConnectionsReached) maxConnectionsExceeded = true
  }

  return $multi(hasDiff, maxConnectionsExceeded)
}

function saveWireConnections(
  assembly: AssemblyContent,
  entity: AssemblyEntity,
  stageNumber: StageNumber,
): LuaMultiReturn<[hasAnyDiff: boolean, maxConnectionsExceeded?: boolean]> {
  const luaEntity = entity.getWorldEntity(stageNumber)
  if (!luaEntity) return $multi(false)
  const diff1 = saveCircuitConnections(assembly, entity, stageNumber, luaEntity)
  const [diff2, maxConnectionsExceeded] = saveCableConnections(assembly, entity, stageNumber, luaEntity)
  return $multi(diff1 || diff2, maxConnectionsExceeded)
}

function analyzeExistingCircuitConnections(
  assemblyConnections: AsmEntityCircuitConnections | nil,
  existingConnections: readonly CircuitConnectionDefinition[],
  content: EntityMap,
): LuaMultiReturn<
  [
    matchingConnections: LuaMap<AsmCircuitConnection, CircuitConnectionDefinition>,
    extraConnections: LuaMap<CircuitConnectionDefinition, AssemblyEntity>,
  ]
> {
  const matching = new LuaMap<AsmCircuitConnection, CircuitConnectionDefinition>()
  const extra = new LuaMap<CircuitConnectionDefinition, AssemblyEntity>()

  for (const existingConnection of existingConnections) {
    const otherLuaEntity = existingConnection.target_entity
    const otherEntity = content.findCompatible(otherLuaEntity, otherLuaEntity.position, nil)
    if (!otherEntity) continue
    let matchingConnection: AsmCircuitConnection | nil
    if (assemblyConnections) {
      const otherConnections = assemblyConnections.get(otherEntity)
      if (otherConnections)
        matchingConnection = findMatchingCircuitConnection(otherConnections, otherEntity, existingConnection)
    }
    if (matchingConnection) {
      matching.set(matchingConnection, existingConnection)
    } else {
      extra.set(existingConnection, otherEntity)
    }
  }
  return $multi(matching, extra)
}

function findMatchingCircuitConnection(
  connections: ReadonlyLuaSet<AsmCircuitConnection>,
  toEntity: AssemblyEntity,
  { source_circuit_id, target_circuit_id, wire }: CircuitConnectionDefinition,
): AsmCircuitConnection | nil {
  for (const connection of connections) {
    if (connection.wire === wire) {
      const [, toId, fromId] = getDirectionalInfo(connection, toEntity)
      // ^ is backwards!
      if (fromId === source_circuit_id && toId === target_circuit_id) return connection
    }
  }
}

export const DefaultWireHandler: WireHandler = {
  updateWireConnections,
  saveWireConnections,
}
