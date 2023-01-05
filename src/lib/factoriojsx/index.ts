/*
 * Copyright (c) 2022 GlassBricks
 * This file is part of Staged Blueprint Planning.
 *
 * Staged Blueprint Planning is free software: you can redistribute it and/or modify it under the terms of the GNU Lesser General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 *
 * Staged Blueprint Planning is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License along with Staged Blueprint Planning. If not, see <https://www.gnu.org/licenses/>.
 */

import _createElement from "./createElement"

export * from "./element"
export * from "./render"
export * from "./util"

export namespace FactorioJsx {
  export const createElement = _createElement
  // noinspection JSUnusedGlobalSymbols
  export const Fragment = "fragment"
}

export type ElemProps<T extends GuiElementType> = JSX.IntrinsicElements[T]
