from aqt.gui_hooks import editor_will_load_note

def show_frozen_icons(js, note, editor):
    newjs = js
    if editor.addMode:
        newjs = js + '; loadFrozenIcons(); '

    return newjs

def init_editor():
    editor_will_load_note.append(show_frozen_icons)
