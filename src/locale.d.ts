// Generated by gen-locale-defs.ts
// noinspection JSUnusedGlobalSymbols

export declare const enum L_ItemName {
  /** Assembly cleanup tool */
  CleanupTool = "item-name.bp100:cleanup-tool",
}
export declare const enum L_ShortcutName {
  /** Assembly cleanup tool */
  CleanupTool = "shortcut-name.bp100:cleanup-tool",
}
export declare const enum L_EntityName {
  /** Blueprint entity marker */
  EntityMarker = "entity-name.bp100:entity-marker",
  /** 2x2 grid enforcer */
  BlueprintGridEnforcer = "entity-name.bp100:blueprint-grid-enforcer",
}
export declare const enum L_ItemGroupName {
  /** BP100 utility entities */
  Utility = "item-group-name.bp100:utility",
}
export declare const enum L_ModSettingName {
  /** Use cyclic stage navigation */
  CyclicNavigation = "mod-setting-name.bp100:cyclic-navigation",
}
export declare const enum L_Controls {
  /** Next stage */
  NextStage = "controls.bp100:next-stage",
  /** Previous stage */
  PreviousStage = "controls.bp100:previous-stage",
  /** Go to entity's first stage */
  GoToFirstStage = "controls.bp100:go-to-first-stage",
  /** Go to entity's next notable stage */
  GoToNextNotableStage = "controls.bp100:go-to-next-notable-stage",
  /** Move entity to current stage */
  MoveToThisStage = "controls.bp100:move-to-this-stage",
}
export declare const enum L_Bp100 {
  /** __1__ (preview) */
  PreviewEntity = "bp100.preview-entity",
  /** __1__ (selection proxy) */
  SelectionProxy = "bp100.selection-proxy",
  /** <Unnamed assembly __1__> */
  UnnamedAssembly = "bp100.unnamed-assembly",
}
export declare const enum L_Interaction {
  /** An unexpected error occurred: __1__. Additional details outputted to log. Please report this to the mod author! */
  UnexpectedError = "bp100.interaction.unexpected-error",
  /** WARNING: pasting a blueprint from the blueprint [font=default-bold]library[/font] into an assembly is not supported.\nEntities that have settings changed from pasting this blueprint will not be detected (newly created entities are fine).\nTo fix, make a copy of the blueprint (book) first, then paste again. */
  BlueprintNotHandled = "bp100.interaction.blueprint-not-handled",
  /** Entity moved from __1__ */
  EntityMovedFromStage = "bp100.interaction.entity-moved-from-stage",
  /** Entity moved back to __1__ */
  EntityMovedBackToStage = "bp100.interaction.entity-moved-back-to-stage",
  /** Cannot flip underground paired with multiple other undergrounds */
  CannotFlipUndergroundDueToMultiplePairs = "bp100.interaction.cannot-flip-underground-due-to-multiple-pairs",
  /** Cannot upgrade underground paired with multiple other undergrounds */
  CannotUpgradeUndergroundDueToMultiplePairs = "bp100.interaction.cannot-upgrade-underground-due-to-multiple-pairs",
  /** Cannot create stage upgrade if underground pair not in the same stage */
  CannotCreateUndergroundUpgradeIfNotInSameStage = "bp100.interaction.cannot-create-underground-upgrade-if-not-in-same-stage",
  /** Upgrading this will change the underground pair */
  CannotUpgradeUndergroundChangedPair = "bp100.interaction.cannot-upgrade-underground-changed-pair",
  /** Cannot move underground belt with upgrade. Try first upgrading in the entity first stage. */
  CannotMoveUndergroundBeltWithUpgrade = "bp100.interaction.cannot-move-underground-belt-with-upgrade",
  /** Max of 5 connections reached (in another stage). */
  MaxConnectionsReachedInAnotherStage = "bp100.interaction.max-connections-reached-in-another-stage",
  /** Not in an assembly */
  NotInAnAssembly = "bp100.interaction.not-in-an-assembly",
  /** No next stage */
  NoNextStage = "bp100.interaction.no-next-stage",
  /** No previous stage */
  NoPreviousStage = "bp100.interaction.no-previous-stage",
  /** Already at entity first stage */
  AlreadyAtFirstStage = "bp100.interaction.already-at-first-stage",
  /** Entity is the same in all stages */
  EntitySameInAllStages = "bp100.interaction.entity-same-in-all-stages",
  /** Blueprint is empty */
  BlueprintEmpty = "bp100.interaction.blueprint-empty",
  /** Blueprint book is empty */
  BlueprintBookEmpty = "bp100.interaction.blueprint-book-empty",
  /** The 2x2 grid enforcer was removed from the blueprint. Try editing the blueprint again without removing entities. */
  GridEnforcerRemoved = "bp100.interaction.grid-enforcer-removed",
}
export declare const enum L_GuiCurrentAssembly {
  /** Assembly: */
  Assembly = "bp100.gui.current-assembly.assembly",
  /** (Not in an assembly) */
  NoAssembly = "bp100.gui.current-assembly.no-assembly",
  /** Open assembly settings */
  OpenAssemblySettings = "bp100.gui.current-assembly.open-assembly-settings",
  /** Show all assemblies */
  ShowAllAssemblies = "bp100.gui.current-assembly.show-all-assemblies",
}
export declare const enum L_GuiAllAssemblies {
  /** New assembly */
  NewAssembly = "bp100.gui.all-assemblies.new-assembly",
}
export declare const enum L_GuiNewAssembly {
  /** New Assembly */
  Title = "bp100.gui.new-assembly.title",
  /** Name */
  Name = "bp100.gui.new-assembly.name",
  /** Initial number of stages */
  InitialNumStages = "bp100.gui.new-assembly.initial-num-stages",
  /** Invalid specified number of stages */
  InvalidNumStages = "bp100.gui.new-assembly.invalid-num-stages",
  /** Create */
  Create = "bp100.gui.new-assembly.create",
}
export declare const enum L_GuiAssemblySettings {
  /** Assembly */
  Title = "bp100.gui.assembly-settings.title",
  /** Rename assembly */
  RenameAssembly = "bp100.gui.assembly-settings.rename-assembly",
  /** Rename stage */
  RenameStage = "bp100.gui.assembly-settings.rename-stage",
  /** New stage: */
  NewStage = "bp100.gui.assembly-settings.new-stage",
  /** After current */
  AfterCurrent = "bp100.gui.assembly-settings.after-current",
  /** At front */
  AtFront = "bp100.gui.assembly-settings.at-front",
  /** Delete assembly */
  DeleteAssembly = "bp100.gui.assembly-settings.delete-assembly",
  /** Are you sure you want to delete assembly __1__? */
  DeleteAssemblyConfirmation1 = "bp100.gui.assembly-settings.delete-assembly-confirmation1",
  /** This action cannot be undone. */
  DeleteAssemblyConfirmation2 = "bp100.gui.assembly-settings.delete-assembly-confirmation2",
  /** Delete stage */
  DeleteStage = "bp100.gui.assembly-settings.delete-stage",
  /** Are you sure you want to delete stage __1__? */
  DeleteStageConfirmation1 = "bp100.gui.assembly-settings.delete-stage-confirmation1",
  /** Stage contents will be merged with the previous stage (__1__). */
  DeleteStageConfirmation2Middle = "bp100.gui.assembly-settings.delete-stage-confirmation2-middle",
  /** Stage contents will be merged with the next stage (__1__). */
  DeleteStageConfirmation2First = "bp100.gui.assembly-settings.delete-stage-confirmation2-first",
  /** Reset stage [img=info] */
  ResetStage = "bp100.gui.assembly-settings.reset-stage",
  /** Deletes and replaces all entities to match the stored state.\nThis can help resolve errors, or inconsistencies due to bugs. */
  ResetStageTooltip = "bp100.gui.assembly-settings.reset-stage-tooltip",
  /** Get blueprint [img=info] */
  GetBlueprint = "bp100.gui.assembly-settings.get-blueprint",
  /** Gets a blueprint of the current stage.\nChanges to the given blueprint will [font=default-bold]not[/font] be saved. */
  GetBlueprintTooltip = "bp100.gui.assembly-settings.get-blueprint-tooltip",
  /** Edit blueprint [img=info] */
  EditBlueprint = "bp100.gui.assembly-settings.edit-blueprint",
  /** Edits the blueprint of the current stage.\nChanges (icons, grid settings, etc.) [font=default-bold]will[/font] be saved.\nGrid position and snap-to-grid settings will be applied to [font=default-bold]all[/font] stages. */
  EditBlueprintTooltip = "bp100.gui.assembly-settings.edit-blueprint-tooltip",
  /** Make blueprint book */
  GetBlueprintBook = "bp100.gui.assembly-settings.get-blueprint-book",
  /** You can configure individual blueprints in the stage settings. */
  GetBlueprintBookTooltip = "bp100.gui.assembly-settings.get-blueprint-book-tooltip",
}
