"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Ellipsis } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "nextjs-toploader/app";

const CardDropdownMenu = ({
  postId,
  isPublished,
}: {
  postId: string;
  isPublished: boolean;
}) => {
  const router = useRouter();

  const pushToEdit = () => router.push(`/posts/${postId}/edit`);

  const deletionDraftOrPost = useMutation({
    mutationFn: async () => {
      try {
        await fetch(`/api/deletePost/${postId}`, {
          method: "DELETE",
        });
      } catch (error) {
        console.log("error deleting post");
      }
    },
    onSuccess: () => router.refresh(),
  });

  // Added confirmation dialog before deletion
  const handleDeleteDraftOrPost = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      // Confirmation dialog
      try {
        deletionDraftOrPost.mutate();
      } catch (error: any) {
        console.error("Error deleting post:", error.message);
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-min w-min p-0.5">
          <Ellipsis className="w-5 h-5 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top" className="w-min">
        {isPublished ? (
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                pushToEdit();
              }}
            >
              Edit post
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={async (e) => {
                e.stopPropagation();
                await handleDeleteDraftOrPost();
              }}
              className="text-red-500"
            >
              Delete post
            </DropdownMenuItem>
          </DropdownMenuGroup>
        ) : (
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                pushToEdit();
              }}
            >
              Edit draft
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={async (e) => {
                e.stopPropagation();
                await handleDeleteDraftOrPost();
              }}
              className="text-red-500"
            >
              Delete draft
            </DropdownMenuItem>
          </DropdownMenuGroup>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CardDropdownMenu;
