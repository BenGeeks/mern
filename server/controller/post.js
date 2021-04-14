import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

export const getPosts = async (req, res) => {
  console.info('=> getPost has been triggered.');
  try {
    const postMessage = await PostMessage.find();
    console.info('=> SUCCESS!');
    res.status(200).json(postMessage);
  } catch (error) {
    console.info('=> FAILED!');
    res.status(404).json({ message: error.message });
  }
};

export const createPosts = async (req, res) => {
  console.info('createPost has been triggered.');
  const post = req.body;
  const newPost = new PostMessage(post);
  try {
    await newPost.save();
    console.info('=> SUCCESS!');
    res.status(201).json(newPost);
  } catch (error) {
    console.info('=> FAILED!');
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  console.info('updatePost has been triggered.');
  const { id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.info('=> ID does not exist.');
    return res.status(404).send('No post with that id.');
  } else {
    try {
      const updatedPost = await PostMessage.findByIdAndUpdate(id, { ...post, id }, { new: true });
      console.info('=> SUCCESS!');
      res.json(updatedPost);
    } catch (error) {
      console.inf0('=> FAILED!');
      res.json({ message: error.message });
    }
  }
};

export const deletePost = async (req, res) => {
  console.info('deletePost has been triggered.');
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.info('=> ID does not exist.');
    return res.status(404).send('No post with that id.');
  } else {
    try {
      await PostMessage.findByIdAndRemove(id);
      console.info('=> SUCCESS!');
      res.json({ message: 'Post deleted successfully.' });
    } catch (error) {
      console.info('=> FAILED!');
      res.json({ message: error.message });
    }
  }
};

export const likePost = async (req, res) => {
  console.info('LikePost has been triggered.');
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.info('=> ID does not exist.');
    return res.status(404).send('No post with that id.');
  } else {
    try {
      const post = await PostMessage.findById(id);
      const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
      console.info('=> SUCCESS!');
      res.json(updatedPost);
    } catch (error) {
      console.info('=> FAILED!');
      res.json({ message: error.message });
    }
  }
};
