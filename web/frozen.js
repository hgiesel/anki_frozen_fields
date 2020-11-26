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

  loadIcons: () => {
    const fnames = document.querySelectorAll('.fname')

    for (const fname of fnames) {
      const idx = fname.id.match(FrozenFields.trailingNumberRegex)

      const flake = document.createElement('i')
      flake.classList.add('frozen-icon')

      fname.insertBefore(flake, fname.firstChild)

      flake.addEventListener('click', () => {
        pycmd(`toggle_sticky:${idx}`, (isSticky) => {
          FrozenFields.setFrozen(fname, isSticky)
        })
      })

      pycmd(`get_sticky:${idx}`, (isSticky) => {
        FrozenFields.setFrozen(fname, isSticky)
      })
    }
  },
}
