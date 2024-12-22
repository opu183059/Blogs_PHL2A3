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

const getAllBlogs = async (query: any): Promise<IBlog[]> => {
  const { search, sortBy, sortOrder, filter } = query;
  const conditions: any = {};
  const sort: any = {};

  if (search) {
    conditions.$or = [
      { title: { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i" } },
    ];
  }

  if (filter) {
    conditions.author = filter;
  }

  if (sortBy) {
    sort[sortBy] = sortOrder === "desc" ? -1 : 1;
  }

  const result = await Blog.find(conditions).sort(sort).populate("author", {
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
