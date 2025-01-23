import MyEditor from "@/components/editor/MyEditor";
import { auth } from "@/auth";
import { notFound } from "next/navigation";

export default async function page() {
  const session = await auth();
  if (!session?.user) notFound();

  const username = session.user.username || "default";

  return (
    <div className="editor-page">
      <MyEditor
        userEmailName={username}
        editorType="create"
        postToEdit={null}
      />
    </div>
  );
}
