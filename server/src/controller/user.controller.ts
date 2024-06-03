import { Request, Response } from "express";

import { prisma } from "../model/db";
import catchAsync from "../error/catchAsync";
import customError from "../error/customError";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validateEmail } from "../utils/mailValidation";

export const register = catchAsync(async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    throw new customError("email and password are required", 400);
  }

  validateEmail(email);

  const userExist = await prisma.users.findUnique({
    where: {
      email,
    },
  });
  if (userExist) {
    throw new customError("user already exist", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.users.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  const {
    password: _,
    id: undefined,
    createdAt,
    updatedAt,
    ...userdata
  } = user;
  console.log(userdata);

  res.status(201).json(userdata);
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new customError("email and password are required", 400);
  }

  const user = await prisma.users.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new customError("user not found", 404);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new customError("invalid credentials", 401);
  }
  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "24h",
    }
  );

  let sanitizedUser = {
    ...user,
    id: undefined,
    password: undefined,
    createdAt: undefined,
    updatedAt: undefined,
  };

  res
    .status(200)
    .cookie(
      process.env.COOKIES_NAME as string,
      JSON.stringify({ token, user: sanitizedUser }),
      {
        path: "/",
        secure: false,
        maxAge: 86400,
      }
    )

    .json({
      user: sanitizedUser,
      token,
    });
});
export const me = catchAsync(async (req: Request, res: Response) => {
  const id = req.user?.id as string;
  const user = await prisma.users.findUnique({
    where: {
      id,
    },
    select: {
      name: true,
      email: true,
      posts: {
        select: {
          id: true,
          title: true,
          content: true,
          img: true,
        },
      },
    },
  });
  res.status(200).json(user);
});

export const updateMe = catchAsync(async (req: Request, res: Response) => {
  const id = req.user?.id as string;
  const { name } = req.body;
  const user = await prisma.users.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });
  res.status(200).json(user);
});

export const deleteMe = catchAsync(async (req: Request, res: Response) => {
  const id = req.user?.id as string;
  await prisma.users.delete({
    where: {
      id,
    },
  });
  res.status(200).json({ message: "user deleted" });
});

export const changePassword = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.user?.id as string;
    const user = await prisma.users.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new customError("user not found", 404);
    }

    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      throw new customError("oldPassword and newPassword are required", 400);
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      throw new customError("invalid old password", 401);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.users.update({
      where: {
        id: userId,
      },
      data: {
        password: hashedPassword,
      },
    });

    res.status(200).json({ message: "password changed" });
  }
);

export const logout = catchAsync(async (req: Request, res: Response) => {
  res
    .status(200)
    .clearCookie(process.env.COOKIES_NAME as string)
    .json({ message: "logout success" });
});

//forget password
