export const getColorRange = (percent) => {
  let bgColor = 'rgba(217, 217, 217, 0.3)'
  let iconColor = '#333638'
  let textColor = '#333638'

  if (percent > 0 && percent <= 20) {
    bgColor = 'var(--red-mid)'
    iconColor = 'var(--red-dark)'
    textColor = 'var(--gray-1)'
  } else if (percent > 20 && percent <= 40) {
    bgColor = 'var(--orange-light)'
    iconColor = 'var(--orange-dark)'
    textColor = 'var(--white)'
  } else if (percent > 40 && percent <= 60) {
    bgColor = 'var(--yellow-light)'
    iconColor = 'var(--yellow-dark)'
    textColor = 'var(--gray-1)'
  } else if (percent > 60 && percent <= 80) {
    bgColor = 'var(--blue-light)'
    iconColor = 'var(--blue-dark)'
    textColor = 'var(--white)'
  } else if (percent > 80 && percent <= 100) {
    bgColor = 'var(--green-mid)'
    iconColor = 'var(--green-dark)'
    textColor = 'var(--gray-1)'
  }

  return { bgColor, iconColor, textColor }
}