const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  // Blog.find({}).then(blogs => {
  //   response.json(blogs)
  // })
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  // Blog.findById(request.params.id)
  //   .then(blog => {
  //     if (blog) {
  //       response.json(blog)
  //     } else {
  //       response.status(404).end()
  //     }
  //   })
  //   .catch(error => next(error))

  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findById(body.userId)

  if (!user) {
    return response.status(400).json({ error: 'user not found' })
  }

  // const newBlog = new Blog({
  //   title: body.title,
  //   author: body.author,
  //   url: body.url,
  //   likes: body.likes,
  // })

  // newBlog.save()
  //   .then(savedBlog => {
  //     response.json(savedBlog)
  //   })
  //   .catch(error => next(error))


  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await newBlog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes  } = request.body

  const blog = {
    title,
    author,
    url,
    likes
  }

  // await Blog.findById(request.params.id)
  //   .then(selectedBlog => {

  //     selectedBlog.title = title
  //     selectedBlog.author = author
  //     selectedBlog.url = url
  //     selectedBlog.likes = likes

  //     return selectedBlog.save().then((updatedBlog) => {
  //       response.json(updatedBlog)
  //     })
  //   })
  //   .catch(error => next(error))

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { returnDocument: 'after' })
  response.json(updatedBlog)
})

module.exports = blogsRouter
