from aqt import mw


toggle_field_keyword = "frozenFieldsToggleField"
toggle_all_keyword = "frozenFieldsToggleAll"


def get_toggle_field():
    return mw.pm.profile.get(toggle_field_keyword, "F9")


def get_toggle_all():
    return mw.pm.profile.get(toggle_all_keyword, "Shift+F9")
