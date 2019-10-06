const blogPosts = [{
    title: 'First Post',
    createdAt: new Date(),
    content: 'Hey all. Here is my first blog post ever. Looking forward to talk about technology and programming languages.'
}]

const getAll = () => {
    return new Promise(resolve => resolve(blogPosts))
}

export { getAll };