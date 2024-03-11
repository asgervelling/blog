"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import { api } from "~/trpc/react";

export function CreatePost() {
  const router = useRouter();
  const { user } = useUser();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const createPost = api.post.create.useMutation({
    onSuccess: () => {
      router.push("/");
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });
  const isPosting = createPost.isLoading;

  if (!user) return null;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createPost.mutate({ title, content, userId: user.id });
      }}
      className="flex flex-col gap-2"
    >
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={isPosting}
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <input
        type="text"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={isPosting}
        className="h-full w-full rounded-full px-4 py-2 text-black"
      />
      <button
        type="submit"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={isPosting}
      >
        {isPosting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
