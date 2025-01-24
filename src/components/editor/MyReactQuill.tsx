import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
} from "react";
import ReactQuill from "react-quill-new";
import hljs from "highlight.js";

import katex from "katex";
import ImageUploader from "../uploader/ImageUploader";
import myIcons from "@/data/icons";
import myToolBar from "@/constants/myToolBar";
if (typeof window !== "undefined") window.katex = katex;

const MyReactQuill = ({
  body,
  setBody,
  onChangeDebounce,
  onImageUploaded,
  disabled = false,
  quillRef,
}: {
  body: string;
  setBody: Dispatch<SetStateAction<string>>;
  onChangeDebounce: () => Promise<void> | undefined;
  onImageUploaded: (url: string) => void;
  disabled?: boolean;
  quillRef: React.MutableRefObject<ReactQuill | null>;
}) => {
  // const quillRef = useRef<ReactQuill>(null);
  const uploaderRef = useRef<any>(null);

  useEffect(() => {
    const BlockEmbed: any = ReactQuill.Quill.import("blots/block/embed");
    class DividerBlot extends BlockEmbed {}
    DividerBlot.blotName = "divider";
    DividerBlot.tagName = "hr";
    ReactQuill.Quill.register(DividerBlot);

    const toolbarElements = document.querySelectorAll(
      ".ql-formats, .ql-formats button, .ql-formats span, .ql-formats select"
    );
    toolbarElements.forEach((element) => {
      element.setAttribute("tabindex", "-1");
    });
  }, []);

  var icons: any = ReactQuill.Quill.import("ui/icons");
  icons["undo"] = myIcons.undo;
  icons["redo"] = myIcons.redo;
  icons["divider"] = myIcons.divider;

  const insertImage = (imageUrl: string) => {
    if (!uploaderRef.current || !quillRef.current) return;
    const quill = quillRef.current.getEditor();
    let cursorPosition = quill.getSelection()?.index ?? quill.getLength();

    onImageUploaded(imageUrl);

    quill.insertEmbed(
      cursorPosition,
      "image",
      imageUrl,
      ReactQuill.Quill.sources.USER
    );
    quill.insertText(cursorPosition + 1, "\n", ReactQuill.Quill.sources.USER);
    quill.setSelection(cursorPosition + 2);
  };

  // FYI WHAT IS RANGE
  //   if (range.length == 0) {
  //     console.log("User cursor is at index", range.index);
  //   } else {
  //     const text = quillRef.current
  //       .getEditor()
  //       .getText(range.index, range.length);
  //     console.log("User has highlighted: ", text);
  //   }
  // } else {
  //   console.log("User cursor is not in editor");
  // }

  const myUndo = () => quillRef.current!.editor?.history.undo();
  const myRedo = () => quillRef.current!.editor?.history.redo();
  const openImageUploader = () => {
    if (!uploaderRef.current || !quillRef.current) return;
    uploaderRef.current.open();
  };
  const myDivider = () => {
    if (!quillRef.current) return;
    const quill = quillRef.current.getEditor();

    const range = quill.getSelection(true);
    quill.insertText(range.index, "\n", ReactQuill.Quill.sources.USER);
    quill.insertEmbed(
      range.index + 1,
      "divider",
      true,
      ReactQuill.Quill.sources.USER
    );
    quill.setSelection(range.index + 2, ReactQuill.Quill.sources.SILENT);
  };

  const videoHandler = function () {
    if (!quillRef.current) return;
    const quill = quillRef.current.getEditor();

    const range = quill.getSelection(true);
    const value = prompt("Enter YouTube video URL:");

    // Regular expression to match YouTube video URLs
    const urlRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/).+$/;

    // Check if the URL is a valid YouTube link
    if (value && urlRegex.test(value)) {
      // Convert to embed URL if necessary
      const embedUrl = value.replace("watch?v=", "embed/");

      // Insert the video only if the URL is valid
      quill.editor.insertEmbed(range.index, "video", embedUrl);

      quill.insertText(range.index + 1, "\n", ReactQuill.Quill.sources.USER);
    } else {
      alert("Invalid YouTube URL. Please enter a valid YouTube video link.");
    }
  };

  const modules = useMemo(() => {
    return {
      syntax: { hljs },
      toolbar: {
        handlers: {
          undo: myUndo,
          redo: myRedo,
          image: openImageUploader,
          divider: myDivider,
          video: videoHandler,
        },
        container: myToolBar,
      },
    };
  }, []);

  const handleEditorChange = (
    content: React.SetStateAction<string>,
    editor: ReactQuill.UnprivilegedEditor
  ) => {
    // console.log("Content", content);
    // console.log("Plain Text", editor.getText());
    setBody(content);
  };

  return (
    <>
      <ImageUploader ref={uploaderRef} onUploadSuccess={insertImage} />
      <ReactQuill
        // formats={formats}
        ref={quillRef}
        modules={modules}
        theme="snow"
        value={body}
        readOnly={disabled}
        onChange={async (content, delta, source, editor) => {
          if (disabled) return;

          handleEditorChange(content, editor);
          await onChangeDebounce();
        }}
        placeholder="Tell your story..."
      />
    </>
  );
};

export default MyReactQuill;
