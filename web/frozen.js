var FrozenFields = {
  setFrozen: (target, isSticky) => {
    target.classList.toggle('is-frozen', isSticky)
  },

  toggleFrozenField: (editorField) => {
    pycmd(`toggle_sticky:${editorField.getAttribute("ord")}`, (isSticky) => {
      FrozenFields.setFrozen(editorField.labelContainer, isSticky)
    })
  },

  toggleFrozen: (num) => {
    FrozenFields.toggleFrozenField(getEditorField(num))
  },

  toggleFrozenCurrent: () => {
    const currentField = getCurrentField()

    if (currentField) {
      FrozenFields.toggleFrozenField(currentField.parentElement)
    }
  },

  makeFlake: (ord, setter) => {
    const flake = document.createElement('i')
    flake.classList.add('frozen-icon')
    flake.addEventListener(
      'click',
      () => bridgeCommand(`toggle_sticky:${ord}`, setter),
    )

    return flake
  },

  loadIcons: () => {
    bridgeCommand(`get_stickies`, (stickies) => {
      forEditorField(stickies, (field, initialSticky) => {
        const setter = (isSticky) => FrozenFields.setFrozen(field.labelContainer, isSticky)

        if (!field.hasAttribute("has-frozen")) {
          debugger
          const flake = FrozenFields.makeFlake(field.getAttribute("ord"), setter)
          field.labelContainer.insertBefore(flake, field.label)
          field.setAttribute("has-frozen", "")
        }

        setter(initialSticky)
      })
    })
  },
}
