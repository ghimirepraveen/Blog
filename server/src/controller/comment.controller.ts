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
