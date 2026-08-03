const lodash = require('lodash')

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

const mostBlog = (blogs) => {
    const countAuthor = lodash.countBy(blogs, 'author')

    const authorArray = lodash.map(countAuthor, (count, authorName) => {
        return{
            author: authorName,
            blogs: count
        }
    })
    return lodash.maxBy(authorArray, 'blogs');
}

const mostLikes = (blogs) => {
  const blogsByAuthor = lodash.groupBy(blogs, 'author');
  const authorLikes = lodash.map(blogsByAuthor, (authorBlogs, authorName) => {
    return {
      author: authorName,
      likes: lodash.sumBy(authorBlogs, 'likes')
    };
  });

  return lodash.maxBy(authorLikes, 'likes');
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlog,
  mostLikes
}
