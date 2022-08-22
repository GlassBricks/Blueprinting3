// Generated by gen-locale-defs.ts
// noinspection JSUnusedGlobalSymbols

export declare const enum L_ItemName {
  /** Assembly cleanup tool */
  CleanupTool = "item-name.bp3:cleanup-tool",
  /** Assembly creation tool */
  AssemblyAddTool = "item-name.bp3:assembly-add-tool",
}
export declare const enum L_ShortcutName {
  /** Assembly cleanup tool */
  CleanupTool = "shortcut-name.bp3:cleanup-tool",
  /** Create new assembly */
  AssemblyAddTool = "shortcut-name.bp3:assembly-add-tool",
}
export declare const enum L_EntityName {
  /** Blueprint entity marker */
  EntityMarker = "entity-name.bp3:entity-marker",
}
export declare const enum L_ItemGroupName {
  /** BP3 utility entities */
  Utility = "item-group-name.bp3:utility",
}
export declare const enum L_Bp3 {
  /** __1__ (preview) */
  PreviewEntity = "bp3.preview-entity",
  /** __1__ (selection proxy) */
  SelectionProxy = "bp3.selection-proxy",
}
export declare const enum L_Interaction {
  /** An unexpected error occurred: __1__. Additional details outputted to log. Please report this to the mod author! */
  UnexpectedError = "bp3.interaction.unexpected-error",
  /** This area intersects assembly __1__ (possibly on a different surface) */
  AreaIntersectsWithOtherAssembly = "bp3.interaction.area-intersects-with-other-assembly",
  /** WARNING: this blueprint is not handled. Entities that have changed settings due to pasting this blueprint will not be detected in assemblies (newly created entities are fine).\nTo fix, make a copy of the blueprint (if it is in the blueprint library) and paste again. */
  BlueprintNotHandled = "bp3.interaction.blueprint-not-handled",
  /** Entity moved down from __1__ */
  EntityMovedFromLayer = "bp3.interaction.entity-moved-from-layer",
  /** Entity moved back up to __1__ */
  EntityMovedBackToLayer = "bp3.interaction.entity-moved-back-to-layer",
}
export declare const enum L_Assembly {
  /** <Unnamed assembly> */
  UnnamedAssembly = "bp3.assembly.unnamed-assembly",
}
export declare const enum L_Gui {
  /** Rename assembly */
  RenameAssembly = "bp3.gui.rename-assembly",
  /** Rename current layer */
  RenameLayer = "bp3.gui.rename-layer",
}
export declare const enum L_GuiNewAssembly {
  /** New Assembly */
  Title = "bp3.gui.new-assembly.title",
  /** Name */
  Name = "bp3.gui.new-assembly.name",
  /** Initial number of layers */
  InitialNumLayers = "bp3.gui.new-assembly.initial-num-layers",
  /** Create */
  Create = "bp3.gui.new-assembly.create",
  /** Delete existing entities [img=info] */
  DeleteExistingEntities = "bp3.gui.new-assembly.delete-existing-entities",
  /** Existing entities are not yet processed (this may be a future feature). To import, paste entities after creating the assembly. */
  DeleteExistingEntitiesTooltip = "bp3.gui.new-assembly.delete-existing-entities-tooltip",
  /** Invalid specified number of layers */
  InvalidNumLayers = "bp3.gui.new-assembly.invalid-num-layers",
}
export declare const enum L_GuiCurrentAssembly {
  /** Assembly: */
  Assembly = "bp3.gui.current-assembly.assembly",
  /** (None) */
  NoAssembly = "bp3.gui.current-assembly.no-assembly",
  /** Open assembly settings */
  OpenAssemblySettings = "bp3.gui.current-assembly.open-assembly-settings",
}
export declare const enum L_GuiAssemblySettings {
  /** Assembly */
  Title = "bp3.gui.assembly-settings.title",
  /** Delete assembly */
  DeleteAssembly = "bp3.gui.assembly-settings.delete-assembly",
  /** Are you sure you want to delete assembly __1__? */
  DeleteAssemblyConfirmation1 = "bp3.gui.assembly-settings.delete-assembly-confirmation1",
  /** In-world entities will not be affected. */
  DeleteAssemblyConfirmation2 = "bp3.gui.assembly-settings.delete-assembly-confirmation2",
  /** This action cannot be undone. */
  DeleteAssemblyConfirmation3 = "bp3.gui.assembly-settings.delete-assembly-confirmation3",
  /** New layer */
  NewLayer = "bp3.gui.assembly-settings.new-layer",
  /** Layer: */
  Layer = "bp3.gui.assembly-settings.layer",
}
