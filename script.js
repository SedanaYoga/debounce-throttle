const input = document.querySelector('input')
const defaultText = document.querySelector('.default-text')
const debounceText = document.querySelector('.debounce-text')
const throttleText = document.querySelector('.throttle-text')

const updateDebounceText = debounce((text) => {
  debounceText.textContent = text
})
const updateThrottleText = throttle((text) => {
  throttleText.textContent = text
})

input.addEventListener('input', (e) => {
  defaultText.textContent = e.target.value
  updateDebounceText(e.target.value)
  updateThrottleText(e.target.value)
})

function debounce(cb, delay = 1000) {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      cb(...args)
    }, delay)
  }
}

function throttle(cb, delay = 1000) {
  let shouldWait = false
  let waitingArgs
  const timeoutFunc = () => {
    if (waitingArgs === null) {
      shouldWait = false
    } else {
      cb(...waitingArgs)
      waitingArgs = null
      setTimeout(timeoutFunc, delay)
    }
  }

  return (...args) => {
    if (shouldWait) {
      waitingArgs = args
      return
    }

    // the update comes at the beginning
    cb(...args)
    shouldWait = true

    setTimeout(timeoutFunc, delay)
  }
}
