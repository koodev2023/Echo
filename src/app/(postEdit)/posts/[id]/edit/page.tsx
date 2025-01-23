import MyEditor from "@/components/editor/MyEditor";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { getPostById } from "@/services/postService";

export default async function Page({ params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user) notFound();

  const username = session.user.username || "default";

  const postToEdit = await getPostById(params.id);
  if (!postToEdit) notFound();

  return (
    <div className="editor-page">
      <MyEditor
        userEmailName={username}
        editorType="edit"
        postToEdit={postToEdit}
      />
    </div>
  );
}
