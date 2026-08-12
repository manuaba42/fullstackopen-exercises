const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')

blogsRouter.get('/', async (request, response) => {
  // Blog.find({}).then(blogs => {
  //   response.json(blogs)
  // })
  const blogs = await Blog.find({})
  response.json(blogs)
})

// blogsRouter.get('/:id', (request, response, next) => {
//   Blog.findById(request.params.id)
//     .then(blog => {
//       if (blog) {
//         response.json(blog)
//       } else {
//         response.status(404).end()
//       }
//     })
//     .catch(error => next(error))
// })

blogsRouter.post('/', (request, response, next) => {
  const body = request.body

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  })

  newBlog.save()
    .then(savedBlog => {
      response.json(savedBlog)
    })
    .catch(error => next(error))
})

// blogsRouter.delete('/:id', (request, response, next) => {
//   Blog.findByIdAndDelete(request.params.id)
//     .then(() => {
//       response.status(204).end()
//     })
//     .catch(error => next(error))
// })

// blogsRouter.put('/:id', (request, response, next) => {
//   const { title, author, url, likes  } = request.body

//   Blog.findById(request.params.id)
//     .then(selectedBlog => {
//       if (!selectedBlog) {
//         return response.status(404).end()
//       }

//       selectedBlog.title = title
//       selectedBlog.author = author
//       selectedBlog.url = url
//       selectedBlog.likes = likes

//       return selectedBlog.save().then((updatedBlog) => {
//         response.json(updatedBlog)
//       })
//     })
//     .catch(error => next(error))
// })

module.exports = blogsRouter
