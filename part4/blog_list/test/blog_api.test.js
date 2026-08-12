const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const helper = require('../test/test_helper')
const Blog = require('../models/blogs')


const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('cleared')

  // helper.initialBlogs.forEach(async (blog) => {
  //   let blogObject = new Blog(blog)
  //   await blogObject.save()
  //   console.log('saved')
  // })
  // console.log('done')

  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()

})


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('a specific blog can be viewed', async () => {
  // const response = await api.get('/api/blogs')
  // const blogsAtStart = response.body
  // // console.log(blogsAtStart)

  // const blogToView = blogsAtStart[0]

  const blogsAtStart = await helper.blogInDb()
  const blogToView = blogsAtStart[0]

  // console.log(blogToView)
  // console.log(blogToView.id)
  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  // console.log(resultBlog)
  assert.deepStrictEqual(resultBlog.body, blogToView)
})

after(async () => {
  await mongoose.connection.close()
})
