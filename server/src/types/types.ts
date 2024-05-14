import { Prisma } from "@prisma/client";
declare global {
  namespace Express {
    export interface Users extends Prisma.UsersFieldRefs {}
    export interface Post extends Prisma.PostFieldRefs {}
    export interface Comment extends Prisma.CommentFieldRefs {}
  }
}
