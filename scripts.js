'use strict';

const minDistanceInput = document.getElementById('min-distance')
const maxDistanceInput = document.getElementById('max-distance')

const goButton = document.getElementById('go')

const earthRadius = 3960.0
const degreesToRadians = Math.PI / 180.0
const radiansToDegrees = 180.0 / Math.PI

goButton.onclick = () => {
  const minDistance = parseFloat(minDistanceInput.value)
  const maxDistance = parseFloat(maxDistanceInput.value)

  const distance = minDistance + Math.random() * (maxDistance - minDistance)
  const direction = Math.random() * 2 * Math.PI

  const xOffset = distance * Math.cos(direction)
  const yOffset = distance * Math.sin(direction)

  navigator.geolocation.getCurrentPosition(({ coords }) => {
    const { latitude, longitude } = coords

    const latOffset = xOffset / earthRadius * radiansToDegrees

    const longRadius = earthRadius * Math.cos(latitude * degreesToRadians)
    const longOffset = yOffset / longRadius * radiansToDegrees

    const targetLatitude = latitude + latOffset
    const targetLongitude = longitude + longOffset

    window.location.href = 'https://www.google.com/maps/dir/?api=1' +
      `&destination=${targetLatitude},${targetLongitude}` +
      '&travelmode=walking'
  });

}
