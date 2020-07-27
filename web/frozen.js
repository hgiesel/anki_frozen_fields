const setFrozen = (target, isSticky) => {
  if (isSticky) {
    target.classList.add('is-frozen')
  }
  else {
    target.classList.remove('is-frozen')
  }
}

const trailingNumberRegex = /[0-9]+$/

const loadFrozenIcons = () => {
  const flakes = document.querySelectorAll('.fname')

  for (const flake of flakes) {
    const idx = flake.id.match(trailingNumberRegex)

    flake.addEventListener('click', () => {
      pycmd(`toggle_sticky:${idx}`, (isSticky) => {
        setFrozen(flake, isSticky)
      })
    })

    pycmd(`get_sticky:${idx}`, (isSticky) => {
      setFrozen(flake, isSticky)
    })
  }
}
