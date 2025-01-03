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
import { useLocation } from "react-router-dom";
import CustomButton from "../../Components/Button";
import { Container } from "./styles";

interface IEditorprops {
  onChange: (val?: any, val2?: any) => void;
  onClickCustomButton?: () => void;
  alignItems: string;
  width: string;
  EditorText: string;
}

const TextEditor = ({
  onChange,
  onClickCustomButton,
  alignItems,
  width,
  EditorText,
}: IEditorprops) => {
  const location = useLocation();

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
    <Container width={width} alignItems={alignItems}>
      <strong>{EditorText}</strong>
      <EditorContent
        editor={editor}
        onChange={onChange}
        className="contentEditor"
      />

      {location.pathname.includes("profile") ? (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <MenuBar editor={editor} className="menuBar" />
          <CustomButton
            onClick={onClickCustomButton}
            width="160px"
            customBackgroundColor="transparent"
            customColor="cyan"
            customBorder="1px solid #373e4a"
          >
            Postar
          </CustomButton>
        </div>
      ) : (
        <MenuBar editor={editor} className="menuBar" />
      )}
    </Container>
  );
};

export default TextEditor;
