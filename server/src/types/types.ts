import { Prisma } from "@prisma/client";
declare global {
  namespace Express {
    export interface User extends Prisma.UserFieldRefs {}
    export interface Post extends Prisma.PostFieldRefs {}
    export interface Comment extends Prisma.CommentFieldRefs {}
  }
}
