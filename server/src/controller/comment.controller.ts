import { Request, Response } from "express";

import { prisma } from "../model/db";
import catchAsync from "../error/catchAsync";
import customError from "../error/customError";

export const writeComment = catchAsync(async (req: Request, res: Response) => {
  const content = req.body.content as string;
  const postId = req.params.id;

  if (!content) {
    throw new customError("content is required", 400);
  }

  const comment = await prisma.comment.create({
    data: {
      content,
      postId,
      authorId: req.user.id,
    },
  });

  res.status(201).json(comment);
});

export const updateComment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { content } = req.body;
  if (!content) {
    throw new customError("content is required", 400);
  }

  const comment = await prisma.comment.update({
    where: {
      id: id,
    },
    data: {
      content,
    },
  });

  res.status(200).json(comment);
});

export const deleteComment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const comment = await prisma.comment.findUnique({
    where: {
      id: id,
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
      id: id,
    },
  });

  res.status(204).json();
});

export const getComment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const comment = await prisma.post.findMany({
    where: {
      id: id,
    },
    select: {
      comments: {
        select: {
          content: true,
          createdAt: true,
        },
      },
    },
  });

  if (!comment) {
    throw new customError("comment not found", 404);
  }
  res.status(200).json(comment);
});
