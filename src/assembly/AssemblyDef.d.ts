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

import { LayerNumber } from "../entity/AssemblyEntity"
import { Position } from "../lib/geometry"
import { MutableState, Observable, State } from "../lib/observable"
import { AssemblyContent, LayerPosition } from "./AssemblyContent"
import { MutableEntityMap } from "./EntityMap"

export type AssemblyId = number & { _assemblyIdBrand: never }
export interface Assembly extends AssemblyContent {
  readonly id: AssemblyId

  readonly name: MutableState<string>
  readonly displayName: State<LocalisedString>

  readonly bbox: BoundingBox
  readonly content: MutableEntityMap

  readonly localEvents: Observable<LocalAssemblyEvent>

  getLayer(layerNumber: LayerNumber): Layer | nil
  iterateLayers(start?: LayerNumber, end?: LayerNumber): LuaIterable<LuaMultiReturn<[LayerNumber, Layer]>>
  getAllLayers(): readonly Layer[]
  getLayerAt(surface: LuaSurface, position: Position): Layer | nil

  insertLayer(index: LayerNumber): Layer
  /** Cannot be first layer, contents will be merged with previous layer. */
  deleteLayer(index: LayerNumber): Layer

  readonly valid: boolean

  delete(): void
}
export interface Layer extends LayerPosition {
  readonly name: MutableState<string>

  readonly assembly: Assembly

  readonly valid: boolean

  deleteInAssembly(): void
}
export interface AssemblyCreatedEvent {
  readonly type: "assembly-created"
  readonly assembly: Assembly
}
export interface AssemblyDeletedEvent {
  readonly type: "assembly-deleted"
  readonly assembly: Assembly
}
export interface LayerAddedEvent {
  readonly type: "layer-added"
  readonly assembly: Assembly
  readonly layer: Layer
}
export interface PreLayerDeletedEvent {
  readonly type: "pre-layer-deleted"
  readonly assembly: Assembly
  readonly layer: Layer
}
export interface LayerDeletedEvent {
  readonly type: "layer-deleted"
  readonly assembly: Assembly
  readonly layer: Layer
}
export type GlobalAssemblyEvent =
  | AssemblyCreatedEvent
  | AssemblyDeletedEvent
  | LayerAddedEvent
  | PreLayerDeletedEvent
  | LayerDeletedEvent
export type LocalAssemblyEvent = AssemblyDeletedEvent | LayerAddedEvent | PreLayerDeletedEvent | LayerDeletedEvent