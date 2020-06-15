'use strict';

const Post = require('../models/post.model');
const awsService = require('../services/aws/upload_files');
const PostPagination = require('../services/post');
const userService = require('../services/user');

const getPosts = async (req, res) => {
  const { page, pagination } = getPagination(req);

  const postService = new PostPagination(page, pagination);

  const query = { user: req.userId };
  const result = await postService.getAll(query);
  res.status(200).send({ data: result });
};

const filterPosts = async (req, res) => {
  if (!req.body.email) return res.status(400).send({ message: "email user doesn't provided" });

  const user = await userService.getUser({ email: req.body.email });

  if (!user) return res.status(400).send({ message: "email doesn't match" });

  const filters = await getFilters(req, user);
  const { page, pagination } = getPagination(req);
  const postService = new PostPagination(page, pagination);

  const result = await postService.getAll(filters);

  res.status(200).send({ data: result });
};

const createPost = async (req, res) => {
  const { content, title } = req.body;
  const file = req.file;

  if (!content) return res.status(400).send({ message: "content doesn't provided" });
  if (!title) return res.status(400).send({ message: "title doesn't provided" });
  if (!file) return res.status(400).send({ message: "post image doesn't provided" });

  const imageUrl = await awsService.uploadFileAws(file);

  const post = new Post();
  post.content = content;
  post.title = title;
  post.user = req.userId;
  post.image_url = imageUrl;

  post.save((err) => {
    if (err) res.status(500).send({ message: 'Error creating post' });

    res.status(201).send({ message: 'post created' });
  });
};

const updatePost = async (req, res) => {
  const updates = {};

  const postId = req.body.postId;

  if (!postId) return res.status(400).send({ message: "postId doesn't provided" });

  if (req.body.title) updates.title = req.body.title;
  if (req.body.content) updates.content = req.body.content;

  let result = '';
  try {
    result = await Post.findOneAndUpdate({ _id: postId, user: req.userId }, updates);
  } catch (error) {
    res.status(400).send({ message: 'Nothing updated' });
  }
  res.status(201).send({ message: result });
};

const deletePost = async (req, res) => {
  const { postId } = req.body;
  if (!postId) return res.status(400).send({ message: 'postId property no provided' });

  try {
    await Post.findByIdAndDelete({ _id: postId, user: req.userId });
  } catch (error) {
    res.status(400).send({ message: "Post doesn't exist" });
  }

  res.status(201).send({ message: `post ${postId} deleted` });
};

// utilities

const getPagination = (req) => {
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const pagination = req.query.pagination ? parseInt(req.query.pagination) : 10;

  return {
    page,
    pagination
  };
};

const getFilters = async (req, user) => {
  const filters = {};

  const { title, content } = req.body;

  if (title) filters.title = title;
  if (content) filters.content = content;

  if (user) filters.user = user.id;

  return filters;
};

module.exports = {
  getPosts,
  filterPosts,
  createPost,
  deletePost,
  updatePost
};
