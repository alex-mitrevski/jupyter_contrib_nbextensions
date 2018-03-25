// Copyright (c) Jupyter-Contrib Team.
// Distributed under the terms of the Modified BSD License.

// Allows a group name to be assigned to and unassigned from a set of selected cells using the `Alt+g` and `Alt+u` keyboard shortcuts respectively. The group name is added to the cells' metadata as a `group` field.
//
// *Note*: This extension is based on the `move_selected_cells` extension.
//
// The extension adds cell metadata and is thus useful for parsing Jupyter notebook cells and processing them automatically. One potential use case for this is automatic student answer extractions from assignment notebooks.
//
// At the moment, the only group name that can be assigned is `answer_cell`. Unassigning a group name assigns an empty string to `group`.


define([
    'base/js/namespace',
    'jquery',
    'require',
    'base/js/events'
], function(Jupyter, $, requirejs, events, rubberband) {
    "use strict";

    if (parseFloat(Jupyter.version.substr(0, 3)) >= 4.2) {
        var add_cmd_shortcuts = {
            'Alt-g': {
                help: 'Group the selected cells',
                help_index: 'ht',
                handler: function() { group_selected_cells() }
            },
            'Alt-u': {
                help: 'Remove group from the selected cells',
                help_index: 'ht',
                handler: function() { remove_selected_cell_group() }
            }
        }
    }
    else { // Jupyter version < 4.2
        var add_cmd_shortcuts = {
            'Alt-g': {
                help: 'Group the selected cells',
                help_index: 'ht',
                handler: function(event) { group_selected_cells() }
            },
            'Alt-u': {
                help: 'Remove group from the selected cells',
                help_index: 'ht',
                handler: function(event) { remove_selected_cell_group() }
            }
        }
    }

    function group_selected_cells () {
        var selected_cells = Jupyter.notebook.get_selected_cells();
        $.each(selected_cells, function(idx, cell) {
            cell.metadata.group = 'answer_cell';
        });
    }

    function remove_selected_cell_group () {
        var selected_cells = Jupyter.notebook.get_selected_cells();
        $.each(selected_cells, function(idx, cell) {
            cell.metadata.group = '';
        });
    }

    function load_extension() {
        Jupyter.keyboard_manager.command_shortcuts.add_shortcuts(add_cmd_shortcuts);
        console.log("[group_selected_cells] loaded")
    }

    return {
        load_ipython_extension: load_extension,
    };
});
