import { Request, Response } from "express";

import { prisma } from "../model/db";
import catchAsync from "../error/catchAsync";
import customError from "../error/customError";

export const writeComment = catchAsync(async (req: Request, res: Response) => {
  const content = req.body.content as string;
  const postId = req.params.postid;
  const authorId = req.user.id;
  console.log(content, "content");
  console.log(postId, "postId");
  console.log(authorId, "authorId");

  if (!content) {
    throw new customError("content is required", 400);
  }
  const comment = await prisma.comment.create({
    data: {
      content,
      postId,
      authorId,
    },
  });
  res.status(201).json(comment);
});

export const updateComment = catchAsync(async (req: Request, res: Response) => {
  const { postid } = req.params;
  const { content } = req.body;
  if (!content) {
    throw new customError("content is required", 400);
  }

  const comment = await prisma.comment.update({
    where: {
      id: postid,
      authorId: req.user.id,
    },
    data: {
      content,
    },
  });

  res.status(200).json(comment);
});

export const deleteComment = catchAsync(async (req: Request, res: Response) => {
  const { postid } = req.params;
  const comment = await prisma.comment.findUnique({
    where: {
      id: postid,
    },
  });
  if (!comment) {
    throw new customError("comment not found", 404);
  }
  if (comment.authorId !== req.user.id) {
    throw new customError("you are not the author of this comment", 403);
  }
  await prisma.comment.delete({
    where: {
      id: postid,
    },
  });

  res.status(204).json();
});
export const getCommentsByPostId = catchAsync(
  async (req: Request, res: Response) => {
    const { postid } = req.params;

    const post = await prisma.post.findUnique({
      where: { id: postid },
      include: {
        comments: {
          select: {
            content: true,
            createdAt: true,
            author: {
              select: {
                name: true,
              },
            },
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!post) {
      throw new customError("Post not found", 404);
    }

    res.status(200).json(post.comments);
  }
);
