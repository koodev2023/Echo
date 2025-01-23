import { SetStateAction } from "react";

export function handlePostMutation(
  createPost: any,
  updatePost: any,
  setLatestPostId: React.Dispatch<React.SetStateAction<string | null>>
) {
  (window.location.pathname === "/write" ? createPost : updatePost).mutate(
    undefined,
    {
      onSuccess: (data: { id: SetStateAction<string | null> }) => {
        if (window.location.pathname === "/write") {
          console.log("success create");
          // console.log("success create", data);
        } else {
          console.log("success update");
          // console.log("success update", data);
        }

        // console.log(" post ID: ", data.id);

        if (window.location.pathname === "/write") {
          setLatestPostId(data.id);
          const newUrl = `/posts/${data.id}/edit`;
          window.history.replaceState(
            { ...window.history.state, as: newUrl, url: newUrl },
            "",
            newUrl
          );
        }
      },
      onError: (err: any) => {
        console.error(err);
      },
    }
  );
}
