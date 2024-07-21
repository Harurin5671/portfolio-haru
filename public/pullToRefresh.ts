document.addEventListener('DOMContentLoaded', () => {
  let startY = 0
  let isPulling = false

  const refreshThreshold = 100 // Umbral para activar la actualización
  const refreshIndicator = document.createElement('div')
  refreshIndicator.className = 'refresh-indicator'
  refreshIndicator.textContent = 'Refrescando...'
  document.body.appendChild(refreshIndicator)

  window.addEventListener('touchstart', (e: TouchEvent) => {
    if (window.scrollY === 0) {
      startY = e.touches[0].clientY
      isPulling = true
    }
  })

  window.addEventListener('touchmove', (e: TouchEvent) => {
    if (isPulling) {
      const currentY = e.touches[0].clientY
      if (currentY - startY > refreshThreshold) {
        document.body.classList.add('refreshing')
      }
    }
  })

  window.addEventListener('touchend', () => {
    if (isPulling && document.body.classList.contains('refreshing')) {
      // Simular una acción de actualización
      setTimeout(() => {
        document.body.classList.remove('refreshing')
        location.reload() // Esta línea recarga la página. Reemplázala con tu lógica personalizada.
      }, 2000) // Simular un retraso para la acción de actualización
    }

    isPulling = false
  })
})
