from aqt.gui_hooks import editor_will_load_note, editor_did_init_shortcuts

from .utils import (
    get_toggle_field,
    get_toggle_all,
)


def show_frozen_icons(js, note, editor):
    if not editor.addMode:
        return js

    newjs = js + "; FrozenFields.loadIcons(); "
    return newjs


def toggle_field(editor):
    editor.web.eval("FrozenFields.toggleFrozenCurrent()")


def toggle_all(editor):
    model = editor.note.model()

    any_sticky = any(map(lambda fld: fld["sticky"], model["flds"]))

    # set all to False, if any sticky, otherwise True
    for id, fld in enumerate(model["flds"]):
        if fld["sticky"] == any_sticky:
            editor.web.eval(f"FrozenFields.toggleFrozen({id})")


def add_frozen_fields_shortcuts(cuts, editor):
    if not editor.addMode:
        return

    toggle_field_shortcut = get_toggle_field()
    toggle_all_shortcut = get_toggle_all()

    cuts.extend([
        (toggle_field_shortcut, lambda: toggle_field(editor)),
        (toggle_all_shortcut, lambda: toggle_all(editor), True),
    ])


def init_editor():
    editor_did_init_shortcuts.append(add_frozen_fields_shortcuts)
    editor_will_load_note.append(show_frozen_icons)
