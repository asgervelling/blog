"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";

export function CreatePost() {
  const router = useRouter();
  const { user } = useUser();
  if (!user) return null;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");


  const createPost = api.post.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setTitle("");
      setContent("");
    },
    onError(opts) {
      console.error('Error:', JSON.stringify(opts, null, 2));
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createPost.mutate({ title, content, userId: user.id });
        const err = createPost.error;
      }}
      className="flex flex-col gap-2"
    >
      {createPost.error && (
        <>
          <p>Error: {createPost.error.message}</p>
          <p><pre>{JSON.stringify(createPost.error.data, null, 2)}</pre></p>
        </>
      )}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <input
        type="text"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="h-full w-full rounded-full px-4 py-2 text-black"
      />
      <button
        type="submit"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={createPost.isLoading}
      >
        {createPost.isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
