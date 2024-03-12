import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

// Todo: Create a private procedure that requires authentication
export const postRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(1, "Title is empty."),
        content: z.string().min(1, "This post has no content"),
        userId: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const newPost = await ctx.db.post.create({
          data: input,
        });

        return newPost;
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          switch (e.code) {
            case "P2002":
              throw new Error("You already have a post with the same title");
            default:
              throw new Error(
                "Unhandled database error: " + JSON.stringify(e, null, 2),
              );
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
      const post = await ctx.db.post.findUnique({
        where: { id: input.id },
      });
      if (!post) return null;
      else return post;
    }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.post.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),

  delete: publicProcedure
    .input(z.object({ id: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.post.delete({ where: { id: input.id } });
    }),
});
