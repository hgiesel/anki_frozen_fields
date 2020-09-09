from aqt import mw

from ..gui.settings import Settings

from .utils import (
    toggle_field_keyword,
    toggle_all_keyword,
)


def set_settings(
    toggle_field_shortcut: str,
    toggle_all_shortcut: str,
):
    mw.pm.profile[toggle_field_keyword] = toggle_field_shortcut
    mw.pm.profile[toggle_all_keyword] = toggle_all_shortcut

def show_settings():
    dialog = Settings(mw, set_settings)

    toggle_field_shortcut = mw.pm.profile.get(toggle_field_keyword, 'F9')
    toggle_all_shortcut = mw.pm.profile.get(toggle_all_keyword, 'Shift+F9')

    dialog.setupUi(toggle_field_shortcut, toggle_all_shortcut)
    return dialog.exec_()

def init_addon_manager():
    mw.addonManager.setConfigAction(__name__, show_settings)
