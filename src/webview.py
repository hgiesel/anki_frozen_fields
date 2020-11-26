from aqt import mw

from aqt.gui_hooks import (
    webview_will_set_content,
    webview_did_receive_js_message,
)

from aqt.editor import Editor
from aqt.schema_change_tracker import ChangeTracker


mw.addonManager.setWebExports(__name__, r"(web|icons)/.*\.(js|css|png)")


def load_frozen_icon_js(webcontent, context):
    if isinstance(context, Editor) and context.addMode:
        addon_package = context.mw.addonManager.addonFromModule(__name__)
        base_path = f"/_addons/{addon_package}/web"

        webcontent.css.append(f"{base_path}/frozen.css")
        webcontent.js.append(f"{base_path}/frozen.js")


def sticky_getter_and_setter(handled, message, context: Editor):
    cmd = message.split(":", 1)

    if cmd[0] in ["toggle_sticky", "get_sticky"]:
        model = context.note.model()
        idx = int(cmd[1])

        fld = model["flds"][idx]

        if cmd[0] == "toggle_sticky":
            change_tracker = ChangeTracker(context.mw)
            change_tracker.mark_basic()

            fld["sticky"] = not fld["sticky"]

        return (True, fld["sticky"])

    return handled


def init_webview():
    webview_will_set_content.append(load_frozen_icon_js)
    webview_did_receive_js_message.append(sticky_getter_and_setter)
