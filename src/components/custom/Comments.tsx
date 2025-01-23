"use client";

import Link from "next/link";
import CommentSingle from "./CommentSingle";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { CommentWithUser } from "@/types/customTypes";
import { useState } from "react";
import fetcher from "@/lib/fetcher";
import { Textarea } from "../ui/textarea";

const Comments = ({ postSlug }: { postSlug: string }) => {
  const { status } = useSession();
  const [desc, setDesc] = useState("");

  const { data, mutate, isLoading } = useSWR(
    `/api/comments?postSlug=${postSlug}`,
    fetcher
  );

  const handleSubmit = async () => {
    setDesc("");

    await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ desc, postSlug }),
    });

    mutate();
  };

  return (
    <div className="flex flex-col gap-5">
      {status === "loading" ? null : status === "authenticated" ? (
        <div className="flex flex-col gap-3">
          <div className="text-lg font-bold">
            {isLoading ? "" : data.length} Comments
          </div>
          <div className="flex flex-row max-md:flex-col gap-3">
            <Textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Write a comment..."
            />
            <Button disabled={!desc} variant="default" onClick={handleSubmit}>
              Send
            </Button>
          </div>
        </div>
      ) : (
        <Link href="/login">Sign in to write a comment.</Link>
      )}

      <div className="flex flex-col gap-5">
        {isLoading
          ? null
          : data.map((comment: CommentWithUser, index: number) => (
              <CommentSingle
                key={index}
                userImageUrl={comment.user.image}
                userName={comment.user.name!}
                createdAt={comment.createdAt.toString()}
                commentBody={comment.desc}
              />
            ))}
      </div>
    </div>
  );
};

export default Comments;
