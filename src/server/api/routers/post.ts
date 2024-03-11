import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { contextProps } from "@trpc/react-query/shared";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
        content: z.string().min(1),
        userId: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const newPost = await ctx.db.post.create({
          data: input,
          select: {
            id: true,
            title: true,
            content: true,
            createdAt: true,
            updatedAt: true,
          },
        });
        
        return newPost;
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          switch (e.code) {
            case "P2002":
              throw new Error("You already have a post with the same title");
            default:
              throw new Error("Unhandled database error: " + JSON.stringify(e, null, 2));
          }
        } else {
          console.log("Unknown error occurred:", e);
        }
        throw e;
      }
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.post.findUnique({
        where: { id: input.id },
        select: {
          id: true,
          title: true,
          content: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.post.findMany();
  }),
});
