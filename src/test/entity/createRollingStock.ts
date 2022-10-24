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

import { Pos } from "../../lib/geometry"

export function createRollingStock(surface: LuaSurface = game.surfaces[1], type: string = "locomotive"): LuaEntity {
  return createRollingStocks(surface, type)[0]
}
export function createRollingStocks(surface: LuaSurface, ...types: string[]): LuaEntity[] {
  for (let i = 1; i <= types.length * 7 + 5; i += 2) {
    surface.create_entity({
      name: "straight-rail",
      position: Pos(i, 1),
      direction: 2,
      force: "player",
    })
  }
  const entities = types.map((type, i) =>
    assert(
      surface.create_entity({
        name: type,
        position: Pos(7 * i + 2, 0.5),
        orientation: 0.25,
        force: "player",
      }),
    ),
  )
  return entities
}
