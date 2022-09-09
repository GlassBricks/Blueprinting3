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

import { getStageAtSurface } from "../assembly/Assembly"
import { Assembly, Stage } from "../assembly/AssemblyDef"
import { Prototypes } from "../constants"
import { AssemblyEntity, isNotableStage, StageNumber } from "../entity/AssemblyEntity"

export function getAssemblyEntityOfEntity(entity: LuaEntity): LuaMultiReturn<[Stage, AssemblyEntity] | [_?: nil]> {
  const stage = getStageAtSurface(entity.surface.index)
  if (!stage) return $multi()
  const name = entity.name
  const content = stage.assembly.content
  let assemblyEntity: AssemblyEntity | nil
  if (name.startsWith(Prototypes.PreviewEntityPrefix)) {
    const actualName = name.substring(Prototypes.PreviewEntityPrefix.length)
    assemblyEntity = content.findCompatibleAnyDirection(actualName, entity.position)
  } else {
    assemblyEntity = content.findCompatible(entity, nil)
  }
  if (assemblyEntity) return $multi(stage, assemblyEntity)
  return $multi()
}

export function getNextNotableStage(
  assembly: Assembly,
  currentStageNum: StageNumber,
  entity: AssemblyEntity,
): StageNumber {
  const numStages = assembly.numStages()
  for (let i = 0; i < numStages - 1; i++) {
    const testStage = ((currentStageNum + i) % numStages) + 1
    if (isNotableStage(entity, testStage)) return testStage
  }
  return currentStageNum
}