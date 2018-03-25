// Copyright (c) Jupyter-Contrib Team.
// Distributed under the terms of the Modified BSD License.

// ## Summary
//
// Allows a group name to be assigned to and unassigned from a set of selected cells using the `Alt+g` and `Alt+u` keyboard shortcuts respectively. The group name is added to the cells' metadata as a `group` field.
//
// *Note*: This extension is based on the `move_selected_cells` extension.
//
// ## Potential uses
//
// The extension adds cell metadata and is thus useful for parsing Jupyter notebook cells and processing them automatically. One potential use case for this is automatic student answer extraction from assignment notebooks.
//
// ## Notes on behaviour
//
// When `Alt+g` is pressed, a popup window with a single text box and two buttons - `OK` and `Cancel` - will appear. If the selected cells already belong to the same group, the text box is prefilled with the group name; otherwise, the text box is initially empty. Pressing the `OK` button assigns the name entered in the text box to the cells' `metadata.group` field; closing the popup aborts the operation and leaves the `group` field unchanged  (or undefined if it wasn't defined in the first place).
//
// Pressing `Alt+u` triggers an action in which an empty string is assigned to the `metadata.group` field of the selected cells.


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
                handler: function() { get_group_name(); }
            },
            'Alt-u': {
                help: 'Remove group from the selected cells',
                help_index: 'ht',
                handler: function() { remove_selected_cell_group(); }
            }
        }
    }
    else { // Jupyter version < 4.2
        var add_cmd_shortcuts = {
            'Alt-g': {
                help: 'Group the selected cells',
                help_index: 'ht',
                handler: function(event) { get_group_name(); }
            },
            'Alt-u': {
                help: 'Remove group from the selected cells',
                help_index: 'ht',
                handler: function(event) { remove_selected_cell_group(); }
            }
        }
    }

    function get_group_name () {
        var selected_cells = Jupyter.notebook.get_selected_cells();
        var current_group_name = selected_cells[0].metadata.group;
        $.each(selected_cells, function(idx, cell) {
            if ((cell.metadata.group == undefined) ||
                (current_group_name != cell.metadata.group)) {
                current_group_name = '';
                return false;
            }
        });

        $('body').append('<div id="group_name_popup"><div>Group name: <input id="group_name" type="text" value="' + current_group_name + '" /></div></div>');
        Jupyter.keyboard_manager.register_events('#group_name_popup');
        var dialog_window = $("#group_name_popup").dialog({
            height: 150,
            width: 300,
            modal: true,
            title: 'Assign group name',
            buttons: {
                "OK": function () {
                    var group_name = $('#group_name').val();
                    group_selected_cells(group_name);
                    $(this).dialog("close");
                    $(this).remove();
                },
                "Cancel": function () {
                    $(this).dialog("close");
                    $(this).remove();
                },
            }
        }).on('keydown', function(evt) {
            if (evt.keyCode === $.ui.keyCode.ESCAPE) {
                dialog_window.dialog('close');
                $(dialog_window).remove();
            }
            evt.stopPropagation();
        }).on('dialogclose', function(event) {
            dialog_window.dialog('close');
            $(dialog_window).remove();
        });
    }

    function group_selected_cells (group_name) {
        var selected_cells = Jupyter.notebook.get_selected_cells();
        $.each(selected_cells, function(idx, cell) {
            cell.metadata.group = group_name;
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
