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

  // helper.initialBlogs.forEach(async (selectedBlog) => {
  //   let blogObject = new Blog(selectedBlog)
  //   await blogObject.save()
  //   console.log('saved')
  // })
  for (let i of helper.initialBlogs) {
    let blogObject = new Blog(i)
    await blogObject.save()
    console.log('saved')
  }

  console.log('done')
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

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'async/await simplifies making async calls',
    author: 'me',
    url: 'http://localhost:3001/',
    likes: 10,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    
  const blogsAtEnd = await helper.blogInDb()
  // console.log('blogsAtEnd = ', blogsAtEnd.length)
  // console.log('helper = ', helper.initialBlogs.length)
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
    
  const contents = blogsAtEnd.map(e => e.title)
  assert(contents.includes('async/await simplifies making async calls'))
})

test('if likes property is missing, it defaults to 0', async () => {
  const newBlog = {
    title: 'Test blog without likes',
    author: 'Jane Doe',
    url: 'http://testurl.com'
    // Notice the 'likes' property is completely missing here
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  // Assert that the returned blog object has exactly 0 likes
  // console.log(response.body)
  assert.strictEqual(response.body.likes, 0)
})

test('blog without title or url is not added', async () => {
  const newBlog = {
    author: 'me',
    likes: 10
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogAtEnd = await helper.blogInDb()

  assert.strictEqual(blogAtEnd.length, helper.initialBlogs.length)
})

after(async () => {
  await mongoose.connection.close()
})
