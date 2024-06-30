"use client";

import { HandThumbUpIcon as HandThumbUpIconSolid } from "@heroicons/react/24/solid";
import { HandThumbUpIcon as HandThumbUpIconOutline } from "@heroicons/react/24/outline";
import { dislikePost, likePost } from "../actions";
import { useOptimistic } from "react";

interface likeBtnProps {
  isLiked: boolean;
  likeCount: number;
  postId: number;
}

export default function LikeBtn({ isLiked, likeCount, postId }: likeBtnProps) {
  const [state, reducer] = useOptimistic(
    { isLiked, likeCount },
    (prevState, payload) => ({
      isLiked: !prevState.isLiked,
      likeCount: prevState.isLiked
        ? prevState.likeCount - 1
        : prevState.likeCount + 1,
    })
  );

  const onLikeClick = async () => {
    reducer(null);
    if (isLiked) {
      await dislikePost(postId);
    } else {
      await likePost(postId);
    }
  };

  return (
    <button
      onClick={onLikeClick}
      className={`rounded-full py-2 px-4 flex items-center gap-2 text-sm border ${
        state.isLiked ? "border-orange-400 bg-orange-400 *:text-white" : ""
      }`}
    >
      {state.isLiked ? (
        <HandThumbUpIconSolid className="size-4" />
      ) : (
        <HandThumbUpIconOutline className="size-4" />
      )}
      <span>{state.likeCount}</span>
    </button>
  );
}
