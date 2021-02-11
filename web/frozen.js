var FrozenFields = {
  setFrozen: (target, isSticky) => {
    if (isSticky) {
      target.classList.add('is-frozen')
    }
    else {
      target.classList.remove('is-frozen')
    }
  },

  toggleFrozen: (idx) => {
    const fname = document.getElementById(`name${idx}`)

    pycmd(`toggle_sticky:${idx}`, (isSticky) => {
      FrozenFields.setFrozen(fname, isSticky)
    })
  },

  toggleFrozenCurrent: () => {
    if (currentField) {
      const currentId = Number(currentField.id.match(FrozenFields.trailingNumberRegex))
      FrozenFields.toggleFrozen(currentId)
    }
  },

  trailingNumberRegex: /[0-9]+$/,

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
