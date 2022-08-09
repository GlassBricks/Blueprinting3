/*
 * Copyright (c) 2022 GlassBricks
 * This file is part of BBPP3.
 *
 * BBPP3 is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 *
 * BBPP3 is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with BBPP3. If not, see <https://www.gnu.org/licenses/>.
 */

import { AssemblyEntity, isCompatibleEntity } from "../entity/AssemblyEntity"
import { Entity } from "../entity/Entity"
import { getEntityCategory } from "../entity/entity-info"
import { RegisterClass } from "../lib"
import { Position } from "../lib/geometry"
import { Map2D, MutableMap2D, newMap2D } from "../lib/map2d"

export interface EntityMap {
  readonly entities: Map2D<AssemblyEntity>

  findCompatible(entity: Entity, position: Position, direction: defines.direction | nil): AssemblyEntity | nil
}

export interface MutableEntityMap extends EntityMap {
  readonly entities: MutableMap2D<AssemblyEntity>

  findCompatible(entity: Entity, position: Position, direction: defines.direction | nil): AssemblyEntity | nil

  add<E extends Entity = Entity>(entity: AssemblyEntity<E>): void
  remove<E extends Entity = Entity>(entity: AssemblyEntity<E>): void
}

@RegisterClass("EntityMap")
class EntityMapImpl implements MutableEntityMap {
  readonly entities: MutableMap2D<AssemblyEntity> = newMap2D()

  findCompatible(entity: Entity, position: Position, direction: defines.direction | nil): AssemblyEntity | nil {
    const { x, y } = position
    const atPos = this.entities.get(x, y)
    if (!atPos) return
    const categoryName = getEntityCategory(entity.name)
    if (direction === 0) direction = nil
    for (const candidate of atPos) {
      if (isCompatibleEntity(candidate, categoryName, direction)) return candidate
    }
  }

  add<E extends Entity = Entity>(entity: AssemblyEntity<E>): void {
    const { x, y } = entity.position
    this.entities.add(x, y, entity)
  }

  remove<E extends Entity = Entity>(entity: AssemblyEntity<E>): void {
    const { x, y } = entity.position
    this.entities.remove(x, y, entity)
  }
}

export function newEntityMap(): MutableEntityMap {
  return new EntityMapImpl()
}