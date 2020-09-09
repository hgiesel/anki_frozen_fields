var ZeFrozenFields = {
  setFrozen: (target, isSticky) => {
    if (isSticky) {
      target.classList.add('is-frozen')
    }
    else {
      target.classList.remove('is-frozen')
    }
  },

  trailingNumberRegex: /[0-9]+$/,

  loadFrozenIcons: () => {
    const flakes = document.querySelectorAll('.fname')

    for (const flake of flakes) {
      const idx = flake.id.match(ZeFrozenFields.trailingNumberRegex)

      flake.addEventListener('click', () => {
        pycmd(`toggle_sticky:${idx}`, (isSticky) => {
          ZeFrozenFields.setFrozen(flake, isSticky)
        })
      })

      pycmd(`get_sticky:${idx}`, (isSticky) => {
        ZeFrozenFields.setFrozen(flake, isSticky)
      })
    }
  },
}
