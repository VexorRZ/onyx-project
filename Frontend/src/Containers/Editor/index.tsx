import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
//import Link from "@tiptap/extension-link";
import MenuBar from "../TextEditorMenuBar";
import Placeholder from "@tiptap/extension-placeholder";
import { Container } from "./styles";

interface IEditorprops {
  onChange: (val: any) => void;
  onClickCustomButton?: () => void;
}

const TextEditor = ({ onChange }: IEditorprops) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder,
      BulletList,
      OrderedList,
      Image,
      Youtube,
    ],
    autofocus: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <Container>
      <EditorContent
        editor={editor}
        onChange={onChange}
        className="contentEditor"
      />
      <MenuBar editor={editor} className="menuBar" />
    </Container>
  );
};

export default TextEditor;
