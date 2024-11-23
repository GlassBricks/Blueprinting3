// Generated by gen-locale-defs.ts
// noinspection JSUnusedGlobalSymbols

export declare const enum L_ItemName {
  /** Cleanup tool */
  CleanupTool = "item-name.bp100:cleanup-tool",
  /** Stage move tool */
  StageMoveTool = "item-name.bp100:stage-move-tool",
  /** Filtered stage move tool */
  FilteredStageMoveTool = "item-name.bp100:filtered-stage-move-tool",
  /** Staged deconstruction */
  StageDeconstructTool = "item-name.bp100:stage-deconstruct-tool",
  /** Force delete (in project) */
  ForceDeleteTool = "item-name.bp100:force-delete-tool",
  /** Copy with stage info */
  StagedCopyTool = "item-name.bp100:staged-copy-tool",
  /** Cut with stage info */
  StagedCutTool = "item-name.bp100:staged-cut-tool",
  /** Stage reference */
  StageReference = "item-name.bp100:stage-reference",
  /** Stage reference-data */
  StageReferenceData = "item-name.bp100:stage-reference-data",
}
export declare const enum L_EntityName {
  /** Entity marker */
  EntityMarker = "entity-name.bp100:entity-marker",
  /** Undo reference */
  UndoReference = "entity-name.bp100:undo-reference",
  /** INTERNAL: please don't touch me, else blueprint templates will not work! */
  BlueprintReferenceData = "entity-name.bp100:blueprint-reference-data",
}
export declare const enum L_EntityDescription {
  /** Reference to a stage. Will be replaced with the actual blueprint when the template is compiled. */
  StageReference = "entity-description.bph00:stage-reference",
}
export declare const enum L_ItemGroupName {
  /** Staged bp planning: utility entities */
  Utility = "item-group-name.bp100:utility",
}
export declare const enum L_ModSettingName {
  /** Place offshore pumps anywhere */
  FlexibleOffshorePumpPlacement = "mod-setting-name.bp100:flexible-offshore-pump-placement",
  /** Allow landfill to be mined */
  MinableLandfill = "mod-setting-name.bp100:minable-landfill",
  /** Allow placing landfill outside of water */
  LandLandfill = "mod-setting-name.bp100:land-landfill",
  /** Location of Entity info gui */
  EntityInfoLocation = "mod-setting-name.bp100:entity-info-location",
  /** Allow blueprint paste to upgrade entities */
  UpgradeOnPaste = "mod-setting-name.bp100:upgrade-on-paste",
  /** Teleport to stage when clicking a GPS tag */
  GpsTagTeleport = "mod-setting-name.bp100:gps-tag-teleport",
  /** Unhide infinity items (allows use in upgrade planner) */
  UnhideInfinityItems = "mod-setting-name.bp100:unhide-infinity-items",
}
export declare const enum L_ModSettingDescription {
  /** Allow placing offshore pumps anywhere, without need for a water source. */
  FlexibleOffshorePumpPlacement = "mod-setting-description.bp100:flexible-offshore-pump-placement",
  /** For example, if pasting a blueprint with a fast-inserter over a normal inserter, this will upgrade the inserter. This is different from vanilla behavior.\nThis setting only applies while within a staged project. */
  UpgradeOnPaste = "mod-setting-description.bp100:upgrade-on-paste",
  /** Unhide infinity chests and pipes. This allows using them in upgrade planners. */
  UnhideInfinityItems = "mod-setting-description.bp100:unhide-infinity-items",
}
export declare const enum L_StringModSetting {
  /** Top */
  EntityInfoLocationTop = "string-mod-setting.bp100:entity-info-location-top",
  /** Bottom */
  EntityInfoLocationBottom = "string-mod-setting.bp100:entity-info-location-bottom",
  /** Left */
  EntityInfoLocationLeft = "string-mod-setting.bp100:entity-info-location-left",
  /** Right */
  EntityInfoLocationRight = "string-mod-setting.bp100:entity-info-location-right",
}
export declare const enum L_Controls {
  /** Go to next stage */
  NextStage = "controls.bp100:next-stage",
  /** Go to previous stage */
  PreviousStage = "controls.bp100:previous-stage",
  /** Go to entity first stage */
  GoToFirstStage = "controls.bp100:go-to-first-stage",
  /** Go to project first stage */
  GoToProjectFirstStage = "controls.bp100:go-to-project-first-stage",
  /** Go to project last stage */
  GoToProjectLastStage = "controls.bp100:go-to-project-last-stage",
  /** Exit project */
  ExitProject = "controls.bp100:exit-project",
  /** Return to last project/stage */
  ReturnToLastProject = "controls.bp100:return-to-last-project",
  /** Go to next project */
  NextProject = "controls.bp100:next-project",
  /** Go to previous project */
  PreviousProject = "controls.bp100:previous-project",
  /** Get blueprint for current stage */
  GetStageBlueprint = "controls.bp100:get-stage-blueprint",
  /** Get blueprint book for project */
  GetBlueprintBook = "controls.bp100:get-blueprint-book",
  /** New stage after current */
  NewStageAfterCurrent = "controls.bp100:new-stage-after-current",
  /** New stage at front */
  NewStageAtFront = "controls.bp100:new-stage-at-front",
  /** Move entity to current stage */
  MoveToThisStage = "controls.bp100:move-to-this-stage",
  /** Force delete entity */
  ForceDelete = "controls.bp100:force-delete",
  /** Stage move tool: select next stage */
  StageSelectNext = "controls.bp100:stage-select-next",
  /** Stage move tool: select previous stage */
  StageSelectPrevious = "controls.bp100:stage-select-previous",
  /** Switch to staged copy tool */
  ToggleStagedCopy = "controls.bp100:toggle-staged-copy",
  /** Staged deconstruction tool */
  StageDeconstructTool = "controls.bp100:stage-deconstruct-tool",
  /** Force delete tool */
  ForceDeleteTool = "controls.bp100:force-delete-tool",
}
export declare const enum L_ControlsDescription {
  /** Delete an entity even if not in its the current stage. */
  ForceDelete = "controls-description.bp100:force-delete",
  /** When holding a copy or cut tool, switch to the staged copy or cut tool. */
  ToggleStagedCopy = "controls-description.bp100:toggle-staged-copy",
  /** Return to the last project/stage you were in. Works together with "Exit project". */
  ReturnToLastProject = "controls-description.bp100:return-to-last-project",
}
export declare const enum L_Bp100 {
  /** __1__ (preview) */
  PreviewEntity = "bp100.preview-entity",
  /** <Unnamed project __1__> */
  UnnamedProject = "bp100.unnamed-project",
  /** The stage move tool has changed in v0.28:\nAlt select (__CONTROL__select-for-cancel-deconstruct__) now [font=default-large-bold]sends[/font] entities to the target stage, but selects entities from all stages, not just the current stage.\nReverse select (__CONTROL__reverse-select__) has the same behavior (identical to the old alt-select behavior). */
  StageMoveTool028ChangedNotification = "bp100.stage-move-tool-028-changed-notification",
}
export declare const enum L_Interaction {
  /** An unexpected error occurred: __1__. Additional details outputted to log. Please report this to the mod author! */
  UnexpectedError = "bp100.interaction.unexpected-error",
  /** WARNING: pasting from the blueprint [font=default-large-bold]library[/font] into a staged BP project may cause issues.\nTo fix, make a copy of the blueprint, and paste again using the copy. */
  BlueprintNotHandled = "bp100.interaction.blueprint-not-handled",
  /** Entity moved from __1__ */
  EntityMovedFromStage = "bp100.interaction.entity-moved-from-stage",
  /** Entity moved back to __1__ */
  EntityMovedBackToStage = "bp100.interaction.entity-moved-back-to-stage",
  /** Upgrading this will change the underground pair */
  CannotUpgradeUndergroundChangedPair = "bp100.interaction.cannot-upgrade-underground-changed-pair",
  /** Cannot move entity past last stage */
  CannotMovePastLastStage = "bp100.interaction.cannot-move-past-last-stage",
  /** Cannot deconstruct entity at first stage */
  CannotDeleteBeforeFirstStage = "bp100.interaction.cannot-delete-before-first-stage",
  /** This move will intersect an identical entity in another stage */
  MoveWillIntersectAnotherEntity = "bp100.interaction.move-will-intersect-another-entity",
  /** Max of 5 connections reached (in another stage). */
  MaxConnectionsReachedInAnotherStage = "bp100.interaction.max-connections-reached-in-another-stage",
  /** __1__ does not support moving (in another stage). */
  CannotBeTeleportedInAnotherStage = "bp100.interaction.cannot-be-teleported-in-another-stage",
  /** The wires can not be stretched any longer (in another stage). */
  WiresMaxedInAnotherStage = "bp100.interaction.wires-maxed-in-another-stage",
  /** __1__ will not fit (in another stage). */
  NoRoomInAnotherStage = "bp100.interaction.no-room-in-another-stage",
  /** This cannot be moved */
  CannotMove = "bp100.interaction.cannot-move",
  /** Cannot move, entities missing in another stage */
  EntitiesMissing = "bp100.interaction.entities-missing",
  /** Cannot move, power/circuit connected entities missing in another stage */
  ConnectedEntitiesMissing = "bp100.interaction.connected-entities-missing",
  /** Cannot overlap existing entity in a different direction */
  CannotBuildDifferentDirection = "bp100.interaction.cannot-build-different-direction",
  /** Note: some entities were upgraded (the upgrade on blueprint paste user setting is enabled) */
  PasteUpgradeApplied = "bp100.interaction.paste-upgrade-applied",
  /** Not in a Staged BP project */
  NotInAnProject = "bp100.interaction.not-in-an-project",
  /** No next stage */
  NoNextStage = "bp100.interaction.no-next-stage",
  /** No previous stage */
  NoPreviousStage = "bp100.interaction.no-previous-stage",
  /** No next project */
  NoNextProject = "bp100.interaction.no-next-project",
  /** No previous project */
  NoPreviousProject = "bp100.interaction.no-previous-project",
  /** Already at first stage */
  AlreadyAtFirstStage = "bp100.interaction.already-at-first-stage",
  /** Blueprint is empty */
  BlueprintEmpty = "bp100.interaction.blueprint-empty",
  /** Blueprint book is empty */
  BlueprintBookEmpty = "bp100.interaction.blueprint-book-empty",
  /** Snap to grid settings have not been saved. Try editing the blueprint again without removing entities. */
  BlueprintFirstEntityRemoved = "bp100.interaction.blueprint-first-entity-removed",
  /** WARNING: The filtered stage move tool must be used with instant-deconstruction [font=default-large-bold]disabled[/font]. Otherwise, the tool will not work properly (it will act like a deconstruction planner). */
  FilteredStageMoveToolWarning = "bp100.interaction.filtered-stage-move-tool-warning",
  /** Blueprint book exported to script-output/__1__ */
  BlueprintBookExported = "bp100.interaction.blueprint-book-exported",
}
export declare const enum L_Gui {
  /** Blueprint filters */
  BlueprintFilters = "bp100.gui.blueprint-filters",
  /** Get reference */
  GetStageTemplate = "bp100.gui.get-stage-template",
}
export declare const enum L_GuiProjectSelector {
  /** Staged Blueprint Planning is meant to be used in sandbox or in /editor, */
  EditorModeOnlyMessage1 = "bp100.gui.project-selector.editor-mode-only-message-1",
  /** in a separate "planning" save. */
  EditorModeOnlyMessage2 = "bp100.gui.project-selector.editor-mode-only-message-2",
  /** Switch to editor mode to enable this mod. */
  EditorModeOnlyMessage3 = "bp100.gui.project-selector.editor-mode-only-message-3",
  /** Toggle editor mode (must be admin) */
  SwitchToEditorMode = "bp100.gui.project-selector.switch-to-editor-mode",
  /** Would you like to have all technologies researched? */
  ResearchAllTechPrompt = "bp100.gui.project-selector.research-all-tech-prompt",
  /** Yes, all tech please */
  YesResearchAllTech = "bp100.gui.project-selector.yes-research-all-tech",
  /** No thanks */
  NoResearchAllTech = "bp100.gui.project-selector.no-research-all-tech",
  /** Staged BP projects */
  ShowAllProjects = "bp100.gui.project-selector.show-all-projects",
  /** Staged BP projects */
  AllProjects = "bp100.gui.project-selector.all-projects",
  /** New project */
  NewProject = "bp100.gui.project-selector.new-project",
  /** Exit project */
  ExitProject = "bp100.gui.project-selector.exit-project",
  /** [font=default-bold]Ctrl+left click[/font] to move up\n[font=default-bold]Ctrl+right click[/font] to move down */
  ButtonTooltip = "bp100.gui.project-selector.button-tooltip",
}
export declare const enum L_GuiProjectSettings {
  /** Show settings */
  ShowFullSettings = "bp100.gui.project-settings.show-full-settings",
  /** Hide settings */
  HideFullSettings = "bp100.gui.project-settings.hide-full-settings",
  /** Project: */
  TitleCaption = "bp100.gui.project-settings.title-caption",
  /** New stage */
  NewStage = "bp100.gui.project-settings.new-stage",
  /** After current */
  AfterCurrent = "bp100.gui.project-settings.after-current",
  /** At front */
  AtFront = "bp100.gui.project-settings.at-front",
  /** Rename */
  RenameProject = "bp100.gui.project-settings.rename-project",
  /** Entities and tiles */
  EntitiesAndTiles = "bp100.gui.project-settings.entities-and-tiles",
  /** Entities */
  Entities = "bp100.gui.project-settings.entities",
  /** Tiles */
  Tiles = "bp100.gui.project-settings.tiles",
  /** Rebuild */
  Rebuild = "bp100.gui.project-settings.rebuild",
  /** Current stage */
  CurrentStage = "bp100.gui.project-settings.current-stage",
  /** Stage */
  Stage = "bp100.gui.project-settings.stage",
  /** Blueprints */
  Blueprints = "bp100.gui.project-settings.blueprints",
  /** Other */
  Other = "bp100.gui.project-settings.other",
  /** Rename stage */
  RenameStage = "bp100.gui.project-settings.rename-stage",
  /** Rebuild all stages */
  RebuildAllStages = "bp100.gui.project-settings.rebuild-all-stages",
  /** Rebuild current stage [img=info] */
  RebuildStage = "bp100.gui.project-settings.rebuild-stage",
  /** Rebuilds all entities (and tiles, if staged tiles are enabled) to match the stored state.\nThis may resolve inconsistencies due to bugs. */
  RebuildStageTooltip = "bp100.gui.project-settings.rebuild-stage-tooltip",
  /** Disable all entities */
  DisableAllEntities = "bp100.gui.project-settings.disable-all-entities",
  /** Enable all entities */
  EnableAllEntities = "bp100.gui.project-settings.enable-all-entities",
  /** Set tiles */
  SetTiles = "bp100.gui.project-settings.set-tiles",
  /** Landfill tile: */
  SelectedTile = "bp100.gui.project-settings.selected-tile",
  /** Allow non-blueprintable tiles */
  AllowNonBlueprintableTiles = "bp100.gui.project-settings.allow-non-blueprintable-tiles",
  /** Fill with lab tiles */
  SetLabTiles = "bp100.gui.project-settings.set-lab-tiles",
  /** Fill with landfill tile */
  SetSelectedTile = "bp100.gui.project-settings.set-selected-tile",
  /** Fill with landfill with lab tiles [img=info] */
  SetSelectedTileAndLab = "bp100.gui.project-settings.set-selected-tile-and-lab",
  /** Fill with landfill and water [img=info] */
  SetSelectedTileAndWater = "bp100.gui.project-settings.set-selected-tile-and-water",
  /** Tiles underneath entities will be set to the selected tile\nOther tiles will be set to lab tiles. */
  SetSelectedTileAndLabTooltip = "bp100.gui.project-settings.set-selected-tile-and-lab-tooltip",
  /** Tiles underneath entities will be set to the selected tile\nOther tiles will be set to water. */
  SetSelectedTileAndWaterTooltip = "bp100.gui.project-settings.set-selected-tile-and-water-tooltip",
  /** No tile selected */
  FailedToSetTiles = "bp100.gui.project-settings.failed-to-set-tiles",
  /** Delete current stage */
  DeleteStage = "bp100.gui.project-settings.delete-stage",
  /** Are you sure you want to delete stage __1__? */
  DeleteStageConfirmation1 = "bp100.gui.project-settings.delete-stage-confirmation1",
  /** Contents will be merged with the next stage (__1__). */
  DeleteStageConfirmation2First = "bp100.gui.project-settings.delete-stage-confirmation2-first",
  /** Contents will be merged with the previous stage (__1__). */
  DeleteStageConfirmation2Middle = "bp100.gui.project-settings.delete-stage-confirmation2-middle",
  /** Settings: Defaults */
  BlueprintSettingsDefaults = "bp100.gui.project-settings.blueprint-settings-defaults",
  /** Settings: Current stage [img=info] */
  BlueprintSettingsCurrentStage = "bp100.gui.project-settings.blueprint-settings-current-stage",
  /** These settings override the default settings for the current stage. Overridden settings are highlighted. */
  BlueprintSettingsCurrentStageTooltip = "bp100.gui.project-settings.blueprint-settings-current-stage-tooltip",
  /** Defaults */
  EditingDefaults = "bp100.gui.project-settings.editing-defaults",
  /** Overrides for stage: __1__ */
  EditingForStage = "bp100.gui.project-settings.editing-for-stage",
  /** Grid settings: */
  GridSettings = "bp100.gui.project-settings.grid-settings",
  /** Icons [img=info] */
  Icons = "bp100.gui.project-settings.icons",
  /** Blueprint icons.\nIn stage settings, [font=default-bold]Control-right click[/font] to reset an overridden icon. */
  IconsTooltip = "bp100.gui.project-settings.icons-tooltip",
  /** Add numbers from stage name to icons [img=info] */
  AppendNumbersFromStage = "bp100.gui.project-settings.append-numbers-from-stage",
  /** e.g. if the stage name is "Stage 3.2", adds "3" and "2" to the blueprint icons.\nThere must be empty icon slots at the end for this to work. */
  AppendNumbersFromStageTooltip = "bp100.gui.project-settings.append-numbers-from-stage-tooltip",
  /** In stage __1__: not enough icon slots to add stage numbers! */
  NotEnoughIconSlots = "bp100.gui.project-settings.not-enough-icon-slots",
  /** Edit */
  Edit = "bp100.gui.project-settings.edit",
  /** Entity filters */
  EntityFilters = "bp100.gui.project-settings.entity-filters",
  /** Exclude from future blueprints [img=info] */
  ExcludeFromFutureBlueprints = "bp100.gui.project-settings.exclude-from-future-blueprints",
  /** Entities in this stage will not be present in later stage blueprints. Entity _changes_ may still be present, however. */
  ExcludeFromFutureBlueprintsTooltip = "bp100.gui.project-settings.exclude-from-future-blueprints-tooltip",
  /** Only include entities changed in the last */
  IncludeEntitiesInTheNextNStages1 = "bp100.gui.project-settings.include-entities-in-the-next-n-stages-1",
  /** stages [img=info] */
  IncludeEntitiesInTheNextNStages2 = "bp100.gui.project-settings.include-entities-in-the-next-n-stages-2",
  /** Only new entities or entities with setting changes in the last given stages will be included in the blueprint.\n - Consider adding entities to help align blueprints to the below whitelist, such as rails or roboports.\n - Consider adding assembling machines to the whitelist, so previously unresearched recipes can be pasted by later blueprints.\n */
  IncludeEntitiesInTheNextNStagesTooltip = "bp100.gui.project-settings.include-entities-in-the-next-n-stages-tooltip",
  /** or in whitelist: */
  OrInWhitelist = "bp100.gui.project-settings.or-in-whitelist",
  /** Blacklist: */
  Blacklist = "bp100.gui.project-settings.blacklist",
  /** Entity edits */
  EntityEdits = "bp100.gui.project-settings.entity-edits",
  /** Use module preloading [img=info] */
  UseModulePreloading = "bp100.gui.project-settings.use-module-preloading",
  /** If an assembling machine has modules added at later stage, the modules are included in blueprints in earlier stages [font=default-bold]even if[/font] the machine is not high enough tier or has the wrong recipe.\nThis is useful to have bot requests for modules that will be added later.\nThe machine may need to be upgraded or have the correct recipe set [font=default-bold]before[/font] bots arrive to insert modules successfully.\n\n It is possible to create these blueprints without mods. */
  UseModulePreloadingTooltip = "bp100.gui.project-settings.use-module-preloading-tooltip",
  /** Auto-landfill [img=info] */
  AutoLandfill = "bp100.gui.project-settings.auto-landfill",
  /** Automatically set landfill tiles before taking a blueprint. */
  AutoLandfillTooltip = "bp100.gui.project-settings.auto-landfill-tooltip",
  /** Use next stage's tiles [img=info] */
  UseNextStageTiles = "bp100.gui.project-settings.use-next-stage-tiles",
  /** Each blueprint will contain the next stage's tiles. Useful for landfill. */
  UseNextStageTilesTooltip = "bp100.gui.project-settings.use-next-stage-tiles-tooltip",
  /** Export */
  BpExport = "bp100.gui.project-settings.bp-export",
  /** Get current stage blueprint */
  GetBlueprintForCurrentStage = "bp100.gui.project-settings.get-blueprint-for-current-stage",
  /** Blueprint book */
  BlueprintBook = "bp100.gui.project-settings.blueprint-book",
  /** Get blueprint book [img=info] */
  ExportBlueprintBook = "bp100.gui.project-settings.export-blueprint-book",
  /** Creates a blueprint book containing all stages. */
  ExportBlueprintBookTooltip = "bp100.gui.project-settings.export-blueprint-book-tooltip",
  /** Edit book template [img=info] */
  EditBlueprintBookTemplate = "bp100.gui.project-settings.edit-blueprint-book-template",
  /** Edit the layout, contents, icons, or description of the blueprint book.\nHandles nested blueprint books.\nYou can also add other blueprints, books, deconstruction planners, or upgrade planners to the template, and they will be present in the exported blueprint book. */
  EditBlueprintBookTemplateTooltip = "bp100.gui.project-settings.edit-blueprint-book-template-tooltip",
  /** Reset book template */
  ResetBlueprintBookTemplate = "bp100.gui.project-settings.reset-blueprint-book-template",
  /** Are you sure you want to reset the blueprint book template? */
  ResetBlueprintBookTemplateConfirmation = "bp100.gui.project-settings.reset-blueprint-book-template-confirmation",
  /** Export to file [img=info] */
  ExportBlueprintBookToFile = "bp100.gui.project-settings.export-blueprint-book-to-file",
  /** Exports the blueprint book string to a file located in <user-data-directory>/script-output. */
  ExportBlueprintBookToFileTooltip = "bp100.gui.project-settings.export-blueprint-book-to-file-tooltip",
  /** Export to string [img=info] */
  ExportBlueprintBookToString = "bp100.gui.project-settings.export-blueprint-book-to-string",
  /** Exports the blueprint book string, which you can copy. */
  ExportBlueprintBookToStringTooltip = "bp100.gui.project-settings.export-blueprint-book-to-string-tooltip",
  /** Enable staged tiles (beta) [img=info] */
  EnableStagedTiles = "bp100.gui.project-settings.enable-staged-tiles",
  /** Enables (basic) support for staged tiles. Placing a blueprintable tile will affect all later stages. \nIf enabling for the first time, you may want to click "Scan existing tiles". */
  EnableStagedTilesTooltip = "bp100.gui.project-settings.enable-staged-tiles-tooltip",
  /** Scan existing tiles [img=info] */
  ScanExistingTiles = "bp100.gui.project-settings.scan-existing-tiles",
  /** Scans already placed tiles in the project and updates stages appropriately. */
  ScanExistingTilesTooltip = "bp100.gui.project-settings.scan-existing-tiles-tooltip",
  /** Sync map gen settings [img=info] */
  SyncMapGenSettings = "bp100.gui.project-settings.sync-map-gen-settings",
  /** Sets map gen settings for all stages to match the current stage, then regenerates all stages.\n\nTo change map settings:\n - Go to editor mode (/editor)\n - Click the "Surfaces" tab\n - Click "Edit map gen settings".\n - Possibly un-check "Generate new chunks with lab tiles".\n - Click this button to regenerate all stages. */
  SyncMapGenSettingsTooltip = "bp100.gui.project-settings.sync-map-gen-settings-tooltip",
  /** Delete project */
  DeleteProject = "bp100.gui.project-settings.delete-project",
  /** Are you sure you want to delete project __1__? */
  DeleteProjectConfirmation1 = "bp100.gui.project-settings.delete-project-confirmation1",
  /** This cannot be undone. */
  DeleteProjectConfirmation2 = "bp100.gui.project-settings.delete-project-confirmation2",
  /** Blueprint string for __1__ */
  BlueprintStringFor = "bp100.gui.project-settings.blueprint-string-for",
}
export declare const enum L_GuiTasks {
  /** Cancel */
  Cancel = "bp100.gui.tasks.cancel",
  /** Rebuild all stages */
  RebuildAllStages = "bp100.gui.tasks.rebuild-all-stages",
  /** Rebuilding __1__ */
  RebuildingStage = "bp100.gui.tasks.rebuilding-stage",
}
export declare const enum L_GuiBlueprintBookTask {
  /** Assembling blueprint book */
  AssemblingBlueprintBook = "bp100.gui.blueprint-book-task.assembling-blueprint-book",
  /** Preparing project __1__ */
  PreparingProject = "bp100.gui.blueprint-book-task.preparing-project",
  /** __1__: preparing to take blueprint */
  PreparingStage = "bp100.gui.blueprint-book-task.preparing-stage",
  /** __1__: setting landfill tiles */
  SetLandfillTiles = "bp100.gui.blueprint-book-task.set-landfill-tiles",
  /** __1__: taking blueprint */
  TakeStageBlueprint = "bp100.gui.blueprint-book-task.take-stage-blueprint",
  /** __1__: setting tiles */
  SetNextStageTiles = "bp100.gui.blueprint-book-task.set-next-stage-tiles",
  /** Finishing up */
  FinalizeBlueprintBook = "bp100.gui.blueprint-book-task.finalize-blueprint-book",
  /** Exporting blueprint book */
  ExportBlueprintBook = "bp100.gui.blueprint-book-task.export-blueprint-book",
}
export declare const enum L_GuiEntityInfo {
  /** Stage info */
  Title = "bp100.gui.entity-info.title",
  /** First stage */
  FirstStage = "bp100.gui.entity-info.first-stage",
  /** Updated */
  StagesWithChanges = "bp100.gui.entity-info.stages-with-changes",
  /** Last stage */
  LastStage = "bp100.gui.entity-info.last-stage",
  /** Move to this stage */
  MoveToThisStage = "bp100.gui.entity-info.move-to-this-stage",
  /** Cancel deconstruction */
  RemoveLastStage = "bp100.gui.entity-info.remove-last-stage",
  /** Reset train */
  ResetTrain = "bp100.gui.entity-info.reset-train",
  /** Set train location here */
  SetTrainLocationHere = "bp100.gui.entity-info.set-train-location-here",
  /** Force delete entity */
  DeleteEntity = "bp100.gui.entity-info.delete-entity",
  /** Updated settings */
  StageDiff = "bp100.gui.entity-info.stage-diff",
  /** Remove this change (sets to previous value) */
  ResetProp = "bp100.gui.entity-info.reset-prop",
  /** Apply to previous stage (__1__) */
  ApplyToLowerStage = "bp100.gui.entity-info.apply-to-lower-stage",
  /** <All> */
  AllProps = "bp100.gui.entity-info.all-props",
}
