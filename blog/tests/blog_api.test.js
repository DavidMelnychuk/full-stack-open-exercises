const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const Blog = require("../models/blog");

beforeEach(async () => {
  // Delete and intialize blog database before each test.
  await Blog.deleteMany({});

  helper.initialBlogs.forEach(async (blog) => {
    await new Blog(blog).save();
  });
});

const api = supertest(app);

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

afterAll(() => {
  mongoose.connection.close();
});
