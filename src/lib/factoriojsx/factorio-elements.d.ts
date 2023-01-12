/*
 * Copyright (c) 2023 GlassBricks
 * This file is part of Staged Blueprint Planning.
 *
 * Staged Blueprint Planning is free software: you can redistribute it and/or modify it under the terms of the GNU Lesser General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 *
 * Staged Blueprint Planning is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License along with Staged Blueprint Planning. If not, see <https://www.gnu.org/licenses/>.
 */

// This file was auto-generated by scripts/gen-gui-specs.ts. Do not edit directly!

import { MaybeMutableProperty, MaybeProperty } from "../event"
import { Element, GuiEventHandler, OnCreateHandler } from "./element"

export interface BaseElement {
  type: GuiElementType
  name?: MaybeProperty<string>
  caption?: MaybeProperty<LocalisedString>
  tooltip?: MaybeProperty<LocalisedString>
  enabled?: MaybeProperty<boolean>
  visible?: MaybeProperty<boolean>
  ignored_by_interaction?: MaybeProperty<boolean>
  style?: string
  tags?: Tags
  anchor?: MaybeProperty<GuiAnchor | nil>
  location?: MaybeMutableProperty<GuiLocation | GuiLocationArray | nil>
  children?: Element[]
  on_gui_click?: GuiEventHandler<OnGuiClickEvent>
  on_gui_opened?: GuiEventHandler<OnGuiOpenedEvent>
  on_gui_closed?: GuiEventHandler<OnGuiClosedEvent>
  on_gui_location_changed?: GuiEventHandler<OnGuiLocationChangedEvent>
}

export interface ChooseElemButtonElement extends BaseElement {
  type: "choose-elem-button"
  elem_type: ChooseElemButtonType
  elem_filters?: MaybeProperty<ChooseElemButtonFilters[this["elem_type"]] | nil>
  elem_value?: MaybeMutableProperty<(this["elem_type"] extends "signal" ? SignalID : string) | nil>
  locked?: MaybeProperty<boolean>
  on_gui_elem_changed?: GuiEventHandler<OnGuiElemChangedEvent>
  onCreate?: OnCreateHandler<ChooseElemButtonGuiElement>
  styleMod?: BaseStyleMod
}

export interface DropDownElement extends BaseElement {
  type: "drop-down"
  items?: MaybeProperty<LocalisedString[]>
  selected_index?: MaybeMutableProperty<uint>
  on_gui_selection_state_changed?: GuiEventHandler<OnGuiSelectionStateChangedEvent>
  onCreate?: OnCreateHandler<DropDownGuiElement>
  styleMod?: BaseStyleMod
}

export interface EmptyWidgetElement extends BaseElement {
  type: "empty-widget"
  drag_target?: MaybeProperty<FrameGuiElement | nil>
  onCreate?: OnCreateHandler<EmptyWidgetGuiElement>
  styleMod?: BaseStyleMod
}

export interface EntityPreviewElement extends BaseElement {
  type: "entity-preview"
  entity?: MaybeProperty<LuaEntity>
  onCreate?: OnCreateHandler<EntityPreviewGuiElement>
  styleMod?: BaseStyleMod
}

export interface ListBoxElement extends BaseElement {
  type: "list-box"
  items?: MaybeProperty<LocalisedString[]>
  selected_index?: MaybeMutableProperty<uint>
  on_gui_selection_state_changed?: GuiEventHandler<OnGuiSelectionStateChangedEvent>
  onCreate?: OnCreateHandler<ListBoxGuiElement>
  styleMod?: BaseStyleMod
}

export interface ScrollPaneElement extends BaseElement {
  type: "scroll-pane"
  horizontal_scroll_policy?: MaybeProperty<
    "auto" | "never" | "always" | "auto-and-reserve-space" | "dont-show-but-allow-scrolling"
  >
  vertical_scroll_policy?: MaybeProperty<
    "auto" | "never" | "always" | "auto-and-reserve-space" | "dont-show-but-allow-scrolling"
  >
  onCreate?: OnCreateHandler<ScrollPaneGuiElement>
  styleMod?: ScrollPaneStyleMod
}

export interface SpriteButtonElement extends BaseElement {
  type: "sprite-button"
  sprite?: MaybeProperty<SpritePath>
  hovered_sprite?: MaybeProperty<SpritePath>
  clicked_sprite?: MaybeProperty<SpritePath>
  number?: MaybeProperty<double | nil>
  show_percent_for_small_numbers?: MaybeProperty<boolean>
  mouse_button_filter?: MaybeProperty<MouseButtonFlagsWrite>
  onCreate?: OnCreateHandler<SpriteButtonGuiElement>
  styleMod?: BaseStyleMod
}

export interface TabbedPaneElement extends BaseElement {
  type: "tabbed-pane"
  selected_tab_index?: MaybeMutableProperty<uint | nil>
  on_gui_selected_tab_changed?: GuiEventHandler<OnGuiSelectedTabChangedEvent>
  onCreate?: OnCreateHandler<TabbedPaneGuiElement>
  styleMod?: TabbedPaneStyleMod
}

export interface TextBoxElement extends BaseElement {
  type: "text-box"
  text?: MaybeMutableProperty<string>
  clear_and_focus_on_right_click?: MaybeProperty<boolean>
  selectable?: MaybeProperty<boolean>
  word_wrap?: MaybeProperty<boolean>
  read_only?: MaybeProperty<boolean>
  on_gui_text_changed?: GuiEventHandler<OnGuiTextChangedEvent>
  onCreate?: OnCreateHandler<TextBoxGuiElement>
  styleMod?: TextBoxStyleMod
}

export interface ButtonElement extends BaseElement {
  type: "button"
  mouse_button_filter?: MaybeProperty<MouseButtonFlagsWrite>
  onCreate?: OnCreateHandler<ButtonGuiElement>
  styleMod?: ButtonStyleMod
}

export interface CameraElement extends BaseElement {
  type: "camera"
  position: MaybeProperty<MapPosition | MapPositionArray>
  surface_index?: MaybeProperty<SurfaceIndex>
  zoom?: MaybeProperty<double>
  entity?: MaybeProperty<LuaEntity>
  onCreate?: OnCreateHandler<CameraGuiElement>
  styleMod?: BaseStyleMod
}

export interface CheckboxElement extends BaseElement {
  type: "checkbox"
  state: MaybeMutableProperty<boolean>
  on_gui_checked_state_changed?: GuiEventHandler<OnGuiCheckedStateChangedEvent>
  onCreate?: OnCreateHandler<CheckboxGuiElement>
  styleMod?: BaseStyleMod
}

export interface FlowElement extends BaseElement {
  type: "flow"
  direction?: "horizontal" | "vertical"
  drag_target?: MaybeProperty<FrameGuiElement | nil>
  onCreate?: OnCreateHandler<FlowGuiElement>
  styleMod?: FlowStyleMod
}

export interface FrameElement extends BaseElement {
  type: "frame"
  direction?: "horizontal" | "vertical"
  auto_center?: MaybeProperty<boolean>
  drag_target?: MaybeProperty<FrameGuiElement | nil>
  onCreate?: OnCreateHandler<FrameGuiElement>
  styleMod?: FrameStyleMod
}

export interface LabelElement extends BaseElement {
  type: "label"
  drag_target?: MaybeProperty<FrameGuiElement | nil>
  onCreate?: OnCreateHandler<LabelGuiElement>
  styleMod?: LabelStyleMod
}

export interface LineElement extends BaseElement {
  type: "line"
  direction?: "horizontal" | "vertical"
  onCreate?: OnCreateHandler<LineGuiElement>
  styleMod?: BaseStyleMod
}

export interface MinimapElement extends BaseElement {
  type: "minimap"
  position?: MaybeProperty<MapPosition | MapPositionArray>
  surface_index?: MaybeProperty<SurfaceIndex>
  chart_player_index?: uint
  force?: MaybeProperty<string>
  zoom?: MaybeProperty<double>
  minimap_player_index?: MaybeProperty<uint>
  entity?: MaybeProperty<LuaEntity>
  onCreate?: OnCreateHandler<MinimapGuiElement>
  styleMod?: BaseStyleMod
}

export interface ProgressBarElement extends BaseElement {
  type: "progressbar"
  value?: MaybeProperty<double>
  onCreate?: OnCreateHandler<ProgressBarGuiElement>
  styleMod?: ProgressBarStyleMod
}

export interface RadioButtonElement extends BaseElement {
  type: "radiobutton"
  state: MaybeMutableProperty<boolean>
  on_gui_checked_state_changed?: GuiEventHandler<OnGuiCheckedStateChangedEvent>
  onCreate?: OnCreateHandler<RadioButtonGuiElement>
  styleMod?: BaseStyleMod
}

export interface SliderElement extends BaseElement {
  type: "slider"
  minimum_value?: MaybeProperty<double>
  maximum_value?: MaybeProperty<double>
  value_step?: MaybeProperty<double>
  discrete_slider?: MaybeProperty<boolean>
  discrete_values?: MaybeProperty<boolean>
  slider_value?: MaybeMutableProperty<double>
  on_gui_value_changed?: GuiEventHandler<OnGuiValueChangedEvent>
  onCreate?: OnCreateHandler<SliderGuiElement>
  styleMod?: BaseStyleMod
}

export interface SpriteElement extends BaseElement {
  type: "sprite"
  sprite?: MaybeProperty<SpritePath>
  resize_to_sprite?: MaybeProperty<boolean>
  onCreate?: OnCreateHandler<SpriteGuiElement>
  styleMod?: SpriteStyleMod
}

export interface SwitchElement extends BaseElement {
  type: "switch"
  switch_state?: MaybeMutableProperty<string>
  allow_none_state?: MaybeProperty<boolean>
  left_label_caption?: MaybeProperty<LocalisedString>
  left_label_tooltip?: MaybeProperty<LocalisedString>
  right_label_caption?: MaybeProperty<LocalisedString>
  right_label_tooltip?: MaybeProperty<LocalisedString>
  on_gui_switch_state_changed?: GuiEventHandler<OnGuiSwitchStateChangedEvent>
  onCreate?: OnCreateHandler<SwitchGuiElement>
  styleMod?: BaseStyleMod
}

export interface TabElement extends BaseElement {
  type: "tab"
  badge_text?: MaybeProperty<LocalisedString>
  onCreate?: OnCreateHandler<TabGuiElement>
  styleMod?: TabStyleMod
}

export interface TableElement extends BaseElement {
  type: "table"
  column_count: uint
  draw_vertical_lines?: MaybeProperty<boolean>
  draw_horizontal_lines?: MaybeProperty<boolean>
  draw_horizontal_line_after_headers?: MaybeProperty<boolean>
  vertical_centering?: MaybeProperty<boolean>
  drag_target?: MaybeProperty<FrameGuiElement | nil>
  onCreate?: OnCreateHandler<TableGuiElement>
  styleMod?: TableStyleMod
}

export interface TextFieldElement extends BaseElement {
  type: "textfield"
  text?: MaybeMutableProperty<string>
  numeric?: MaybeProperty<boolean>
  allow_decimal?: MaybeProperty<boolean>
  allow_negative?: MaybeProperty<boolean>
  is_password?: MaybeProperty<boolean>
  lose_focus_on_confirm?: MaybeProperty<boolean>
  clear_and_focus_on_right_click?: MaybeProperty<boolean>
  on_gui_confirmed?: GuiEventHandler<OnGuiConfirmedEvent>
  on_gui_text_changed?: GuiEventHandler<OnGuiTextChangedEvent>
  onCreate?: OnCreateHandler<TextFieldGuiElement>
  styleMod?: TextFieldStyleMod
}

export type FactorioElement =
  | ChooseElemButtonElement
  | DropDownElement
  | EmptyWidgetElement
  | EntityPreviewElement
  | ListBoxElement
  | ScrollPaneElement
  | SpriteButtonElement
  | TabbedPaneElement
  | TextBoxElement
  | ButtonElement
  | CameraElement
  | CheckboxElement
  | FlowElement
  | FrameElement
  | LabelElement
  | LineElement
  | MinimapElement
  | ProgressBarElement
  | RadioButtonElement
  | SliderElement
  | SpriteElement
  | SwitchElement
  | TabElement
  | TableElement
  | TextFieldElement

export interface BaseStyleMod {
  minimal_width?: MaybeProperty<int>
  maximal_width?: MaybeProperty<int>
  minimal_height?: MaybeProperty<int>
  maximal_height?: MaybeProperty<int>
  natural_width?: MaybeProperty<int>
  natural_height?: MaybeProperty<int>
  top_padding?: MaybeProperty<int>
  right_padding?: MaybeProperty<int>
  bottom_padding?: MaybeProperty<int>
  left_padding?: MaybeProperty<int>
  top_margin?: MaybeProperty<int>
  right_margin?: MaybeProperty<int>
  bottom_margin?: MaybeProperty<int>
  left_margin?: MaybeProperty<int>
  horizontal_align?: MaybeProperty<"left" | "center" | "right">
  vertical_align?: MaybeProperty<"top" | "center" | "bottom">
  font_color?: MaybeProperty<Color | ColorArray>
  font?: MaybeProperty<string>
  horizontally_stretchable?: MaybeProperty<boolean>
  vertically_stretchable?: MaybeProperty<boolean>
  horizontally_squashable?: MaybeProperty<boolean>
  vertically_squashable?: MaybeProperty<boolean>
  width?: MaybeProperty<int>
  height?: MaybeProperty<int>
  size?: MaybeProperty<int | SizeArray>
  padding?: MaybeProperty<int | StyleValuesArray>
  margin?: MaybeProperty<int | StyleValuesArray>
}

export interface ScrollPaneStyleMod extends BaseStyleMod {
  extra_top_padding_when_activated?: MaybeProperty<int>
  extra_bottom_padding_when_activated?: MaybeProperty<int>
  extra_left_padding_when_activated?: MaybeProperty<int>
  extra_right_padding_when_activated?: MaybeProperty<int>
  extra_top_margin_when_activated?: MaybeProperty<int>
  extra_bottom_margin_when_activated?: MaybeProperty<int>
  extra_left_margin_when_activated?: MaybeProperty<int>
  extra_right_margin_when_activated?: MaybeProperty<int>
  extra_padding_when_activated?: MaybeProperty<int | StyleValuesArray>
  extra_margin_when_activated?: MaybeProperty<int | StyleValuesArray>
}

export interface TabbedPaneStyleMod extends BaseStyleMod {
  vertical_spacing?: MaybeProperty<int>
}

export interface TextBoxStyleMod extends BaseStyleMod {
  rich_text_setting?: MaybeProperty<defines.rich_text_setting>
}

export interface ButtonStyleMod extends BaseStyleMod {
  hovered_font_color?: MaybeProperty<Color | ColorArray>
  clicked_font_color?: MaybeProperty<Color | ColorArray>
  disabled_font_color?: MaybeProperty<Color | ColorArray>
  pie_progress_color?: MaybeProperty<Color | ColorArray>
  clicked_vertical_offset?: MaybeProperty<int>
  selected_font_color?: MaybeProperty<Color | ColorArray>
  selected_hovered_font_color?: MaybeProperty<Color | ColorArray>
  selected_clicked_font_color?: MaybeProperty<Color | ColorArray>
  strikethrough_color?: MaybeProperty<Color | ColorArray>
}

export interface FlowStyleMod extends BaseStyleMod {
  horizontal_spacing?: MaybeProperty<int>
  vertical_spacing?: MaybeProperty<int>
}

export interface FrameStyleMod extends BaseStyleMod {
  use_header_filler?: MaybeProperty<boolean>
}

export interface LabelStyleMod extends BaseStyleMod {
  rich_text_setting?: MaybeProperty<defines.rich_text_setting>
  single_line?: MaybeProperty<boolean>
}

export interface ProgressBarStyleMod extends BaseStyleMod {
  bar_width?: MaybeProperty<uint>
  color?: MaybeProperty<Color | ColorArray>
}

export interface SpriteStyleMod extends BaseStyleMod {
  stretch_image_to_widget_size?: MaybeProperty<boolean>
}

export interface TabStyleMod extends BaseStyleMod {
  disabled_font_color?: MaybeProperty<Color | ColorArray>
  badge_font?: MaybeProperty<string>
  badge_horizontal_spacing?: MaybeProperty<int>
  default_badge_font_color?: MaybeProperty<Color | ColorArray>
  selected_badge_font_color?: MaybeProperty<Color | ColorArray>
  disabled_badge_font_color?: MaybeProperty<Color | ColorArray>
}

export interface TableStyleMod extends BaseStyleMod {
  top_cell_padding?: MaybeProperty<int>
  right_cell_padding?: MaybeProperty<int>
  bottom_cell_padding?: MaybeProperty<int>
  left_cell_padding?: MaybeProperty<int>
  horizontal_spacing?: MaybeProperty<int>
  vertical_spacing?: MaybeProperty<int>
  cell_padding?: MaybeProperty<int>
}

export interface TextFieldStyleMod extends BaseStyleMod {
  rich_text_setting?: MaybeProperty<defines.rich_text_setting>
}
