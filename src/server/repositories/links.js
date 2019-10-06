const links = [{
    title: 'Stack Overflow',
    url: 'http://www.stackoverflow.com'
}, {
    title: 'Skip the Dishes',
    url: 'http://www.skipthedishes.com'
}]

const getAll = () => {
    return new Promise(resolve => resolve(links))
}

export { getAll };