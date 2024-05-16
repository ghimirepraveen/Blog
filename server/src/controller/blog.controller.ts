import { Request, Response } from "express";

import { prisma } from "../model/db";
import catchAsync from "../error/catchAsync";
import customError from "../error/customError";
import uploadPhotos from "../config/cloudnary";

export const writeBlog = catchAsync(async (req: Request, res: Response) => {
  const title = req.body.title as string;
  const content = req.body.content as string;
  console.log(req);

  // const images = (req.files && Object.values(req.files)) || [];

  if (!title || !content) {
    throw new customError("title and content are required", 400);
  }
  // if (images.length < 1) {
  //   throw new customError("images should be min 1 and max 5", 400);
  // }

  // const image = images[0];

  // const imageUrl = await uploadPhotos(image.tempFilePath, req.user.id);

  const blog = await prisma.post.create({
    data: {
      title,
      content,
      authorId: req.user.id,
      img: "hello", //imageUrl ,
    },
  });

  res.status(201).json(blog);
});

export const getBlogs = catchAsync(async (req: Request, res: Response) => {
  const blogs = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  res.status(200).json(blogs);
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
//write a end point such that it will search for a blog with a specific title

export const searchBlog = catchAsync(async (req: Request, res: Response) => {
  const { title } = req.query;
  if (!title) {
    throw new customError("title is required", 400);
  }
  const blog = await prisma.post.findMany({
    where: {
      title: {
        contains: title.toString(),
      },
    },
    select: {
      title: true,
      content: true,
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
