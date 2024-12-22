import { IBlog } from "./blogs.interface";
import { Blog } from "./blogs.model";

const createBlog = async (payload: IBlog): Promise<IBlog> => {
  const result = (await Blog.create(payload)).populate("author", {
    name: 1,
    email: 1,
    _id: 0,
  });
  return result;
};

const getAllBlogs = async (): Promise<IBlog[]> => {
  const result = await Blog.find().populate("author", {
    name: 1,
    email: 1,
    _id: 0,
  });
  return result;
};

const getSingleBlog = async (blogId: string) => {
  const result = await Blog.findById(blogId).populate("author", {
    name: 1,
    email: 1,
    _id: 0,
  });
  return result;
};

export const blogService = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
};
