const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
    let total = 0
    // console.log(blogs)
    for (const blog of blogs){
        // console.log(blog)
        total = total + blog.likes
    }
    return total
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null;
    }

    return blogs.reduce((favorite, current) => {
        return current.likes > favorite.likes ? current : favorite;
    }, blogs[0]);
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
