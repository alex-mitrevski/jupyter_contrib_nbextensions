# Group selected cells

## Summary

Allows a group name to be assigned to and unassigned from a set of selected cells using the `Alt+g` and `Alt+u` keyboard shortcuts respectively. The group name is added to the cells' metadata as a `group` field.

*Note*: This extension is based on the `move_selected_cells` extension.

## Potential uses

The extension adds cell metadata and is thus useful for parsing Jupyter notebook cells and processing them automatically. One potential use case for this is automatic student answer extractions from assignment notebooks.

## Notes

At the moment, the only group name that can be assigned is `answer_cell`. Unassigning a group name assigns an empty string to `group`.
