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

import { keys } from "ts-transformer-keys"

type Getters = {
  [K in keyof LuaRendering as K extends `get_${infer P}`
    ? LuaRendering[K] extends (id: uint64) => any
      ? P
      : never
    : never]-?: LuaRendering[K] extends (id: uint64) => infer R ? R : never
}
type RawSetters = {
  [K in keyof LuaRendering as K extends `set_${infer P}`
    ? LuaRendering[K] extends (id: uint64, value: any) => void
      ? P
      : never
    : never]-?: LuaRendering[K] extends (id: uint64, value: infer V) => void ? V : never
}
type Setters = {
  [K in keyof RawSetters as K extends keyof Getters
    ? Getters[K] & AnyNotNil extends RawSetters[K]
      ? K
      : never
    : K]: RawSetters[K]
}

type OtherSetters = {
  [K in keyof LuaRendering as K extends `set_${infer P}`
    ? P extends keyof Setters
      ? never
      : LuaRendering[K] extends (id: uint64, ...args: any) => void
      ? K
      : never
    : never]: LuaRendering[K] extends (id: uint64, ...args: infer V) => void
    ? (this: unknown, ...args: V) => void
    : never
}

type GetOnlyKeys = Exclude<keyof Getters, keyof Setters>
type GetAndSetKeys = keyof Getters & keyof Setters

type DrawParams = {
  readonly [K in keyof LuaRendering as K extends `draw_${infer P}` ? P : never]: LuaRendering[K] extends (
    params: infer P,
  ) => uint64
    ? P
    : never
}
export type RenderType = keyof DrawParams

/** @noSelf */
interface BaseRenderObj<T extends RenderType> {
  readonly id: uint64
  readonly valid: boolean
  readonly type: T
  destroy(): void
}
type AsObj = {
  readonly [K in GetOnlyKeys]-?: NonNullable<Getters[K]>
} & {
  [K in GetAndSetKeys]-?: Getters[K] & Setters[K]
}
export type RenderObj<T extends RenderType = RenderType> = BaseRenderObj<T> &
  Pick<AsObj, keyof DrawParams[T] & keyof AsObj> &
  Pick<OtherSetters, `set_${keyof DrawParams[T] & string}` & keyof OtherSetters>

const rendering: LuaRendering = (_G as any).rendering

const setterKeys = newLuaSet(...keys<Setters>())
const getterKeys = newLuaSet(...keys<Getters>())
const otherSetterKeys = newLuaSet(...keys<OtherSetters>())

const setters: {
  [K in keyof Setters]: LuaRendering[`set_${K}`]
} = {} as any
for (const key of setterKeys) {
  setters[key] = rendering[`set_${key}`] as any
}
const getters: {
  -readonly [K in keyof Getters]: LuaRendering[`get_${K}`]
} & {
  valid: LuaRendering["is_valid"]
  destroy: (this: void, id: uint64) => () => void
} = {} as any
for (const key of getterKeys) {
  getters[key] = rendering[`get_${key}`] as any
}
getters.valid = rendering.is_valid
getters.destroy = (id) => () => {
  rendering.destroy(id)
}

const otherMethods: {
  [K in keyof OtherSetters]: (this: BaseRenderObj<RenderType>, ...args: any[]) => void
} = {} as any
for (const key of otherSetterKeys) {
  const set = rendering[key] as (id: uint64, ...args: any) => void
  otherMethods[key] = function (this: BaseRenderObj<RenderType>, ...args: any[]) {
    set(this.id, ...args)
  }
}

const metatable: LuaMetatable<BaseRenderObj<RenderType>, any> = {
  __index(this: BaseRenderObj<RenderType>, key: string) {
    const getter = getters[key as keyof Getters]
    if (getter) return getter(this.id)
    return otherMethods[key as keyof OtherSetters]
  },
  __newindex(this: BaseRenderObj<RenderType>, key: string, value: any) {
    const setter = setters[key as keyof Setters]
    if (setter) setter(this.id, value as never)
    else error(`${key} not in render object`)
  },
}
script.register_metatable("render obj", metatable)
export default function draw<T extends RenderType>(type: T, params: DrawParams[T]): RenderObj<T> {
  const id = rendering[`draw_${type}`](params as any)
  return setmetatable<any>({ id }, metatable)
}

export function destroyAllRenders(): void {
  for (const id of rendering.get_all_ids(script.mod_name)) {
    rendering.destroy(id)
  }
}
