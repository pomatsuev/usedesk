import init from './spa/init'

const ROOT_ELEMENT = '[data-react-app]'

document.addEventListener('DOMContentLoaded', () => {
    const element = document.querySelector(ROOT_ELEMENT)
    if (element) {
        init(element)
    }
})