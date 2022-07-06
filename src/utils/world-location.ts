import { BBox, Position } from "../lib/geometry"

export interface WorldPosition {
  readonly surface: LuaSurface
  readonly position: Position
}

export interface WorldArea {
  readonly surface: LuaSurface
  readonly bbox: BBox
}

export function getLeftTop(area: WorldArea): WorldPosition {
  return {
    surface: area.surface,
    position: area.bbox.left_top,
  }
}
