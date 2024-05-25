import { Request, Response } from "express";

import { prisma } from "../model/db";
import catchAsync from "../error/catchAsync";
import customError from "../error/customError";
import uploadPhoto from "../config/cloudnary";
import auth from "../middleware/auth";

export const writeBlog = catchAsync(async (req: Request, res: Response) => {
  const title = req.body.title as string;
  const content = req.body.content as string;

  let imgUrl;
  if (req.file) imgUrl = await uploadPhoto(req.file);

  if (!title || !content) {
    throw new customError("title and content are required", 400);
  }

  const blog = await prisma.post.create({
    data: {
      title,
      content,
      authorId: req.user.id,
      img: imgUrl,
    },
  });

  res.status(201).json(blog);
});

export const getBlogs = catchAsync(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string, 10) || 1;
  const limit = parseInt(req.query.limit as string, 10) || 10;
  const skip = (page - 1) * limit;

  const [totalBlogs, blogs] = await Promise.all([
    prisma.post.count(),
    prisma.post.findMany({
      skip,
      take: limit,

      select: {
        id: true,
        title: true,
        content: true,
        img: true,
        createdAt: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    }),
  ]);

  const totalPages = Math.ceil(totalBlogs / limit);

  res.status(200).json({
    totalBlogs,
    totalPages,
    currentPage: page,
    blogs,
  });
});

export const getBlog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const blog = await prisma.post.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      title: true,
      content: true,
      img: true,
      createdAt: true,

      author: {
        select: {
          name: true,
        },
      },
    },
  });
  if (!blog) {
    throw new customError("blog not found", 404);
  }
  res.status(200).json(blog);
});

export const updateBlog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content } = req.body;
  if (!title || !content) {
    throw new customError("title and content are required", 400);
  }

  const blog = await prisma.post.update({
    where: {
      id: id,
    },
    data: {
      title,
      content,
    },
  });
  let data = {
    title: blog.title,
    content: blog.content,
    createdAt: blog.createdAt,
  };

  res.status(200).json(data);
});

export const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const blog = await prisma.post.findUnique({
    where: {
      id: id,
    },
  });
  if (!blog) {
    throw new customError("blog not found", 404);
  }
  if (blog.authorId !== req.user.id) {
    throw new customError("you are not authorized to delete this blog", 401);
  }

  await prisma.post.delete({
    where: {
      id: id,
    },
  });

  res.status(204).json("successfully deleted blog");
});

export const searchBlog = catchAsync(async (req: Request, res: Response) => {
  const { title } = req.query;
  console.log("title");

  if (!title) {
    throw new customError("title is required", 400);
  }

  const whereClause: any = {
    OR: [
      { title: { contains: title as string, mode: "insensitive" } },
      { content: { contains: title as string, mode: "insensitive" } },
      { author: { name: { contains: title as string, mode: "insensitive" } } },
    ],
  };

  const blogs = await prisma.post.findMany({
    where: whereClause,
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
      img: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  if (blogs.length === 0) {
    throw new customError("blog not found", 404);
  }

  res.status(200).json(blogs);
});
