# Group selected cells

## Summary

Allows a group name to be assigned to and unassigned from a set of selected cells using the `Alt+g` and `Alt+u` keyboard shortcuts respectively. The group name is added to the cells' metadata as a `group` field.

*Note*: This extension is based on the `move_selected_cells` extension.

## Potential uses

The extension adds cell metadata and is thus useful for parsing Jupyter notebook cells and processing them automatically. One potential use case for this is automatic student answer extraction from assignment notebooks.

## Notes on behaviour

When `Alt+g` is pressed, a popup window with a single text box and two buttons - `OK` and `Cancel` - will appear. If the selected cells already belong to the same group, the text box is prefilled with the group name; otherwise, the text box is initially empty. Pressing the `OK` button assigns the name entered in the text box to the cells' `metadata.group` field; closing the popup aborts the operation and leaves the `group` field unchanged (or undefined if it wasn't defined in the first place).

Pressing `Alt+u` triggers an action in which an empty string is assigned to the `metadata.group` field of the selected cells.
