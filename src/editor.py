from aqt.gui_hooks import editor_will_load_note, editor_did_init_shortcuts

from .utils import (
    get_toggle_field,
    get_toggle_all,
)


def show_frozen_icons(js, note, editor):
    newjs = js
    if editor.addMode:
        newjs = js + '; ZeFrozenFields.loadFrozenIcons(); '

    return newjs

def toggle_field():
    pass

def toggle_all():
    pass

def add_frozen_fields_shortcuts(cuts, editor):
    toggle_field_shortcut = get_toggle_field()
    toggle_all_shortcut = get_toggle_all()

    cuts.extend([
        (toggle_field_shortcut, toggle_field),
        (toggle_all_shortcut, toggle_all),
    ])

def init_editor():
    editor_did_init_shortcuts.append(add_frozen_fields_shortcuts)
    editor_will_load_note.append(show_frozen_icons)
