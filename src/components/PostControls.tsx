"use client";
import { TrashIcon } from "@radix-ui/react-icons";

import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

import { api } from "~/trpc/react";
import type { Post } from "@prisma/client";
import { revalidatePathServerAction } from "~/server/actions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type PostControlsProps = {
  post: Post;
};

/**
 * A couple of buttons to edit or delete a post.
 */
export default function PostControls({ post }: PostControlsProps) {
  const router = useRouter();

  const onSuccess = async () => {
    void revalidatePathServerAction("/");
    router.push("/");
  };

  const onError = () => {
    toast.error("Something went wrong. Please try again.");
  };

  const deletePost = api.post.delete.useMutation({
    onSuccess,
    onError,
  });

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            onClick={() => deletePost.mutate({ id: post.id })}
          >
            <TrashIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Delete post</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
