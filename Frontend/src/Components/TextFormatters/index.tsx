import React from "react";

import {
  StyledBold,
  StyledItalic,
  StyledUnderlined,
  StyledFormatListBulleted,
  StyledFormatListNumbered,
  StyledImage,
  StyledVideo,
  Container,
} from "./styles";
const TextOperation = ({ editor }: any) => {
  return (
    <Container>
      <button
        title="bold"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        <StyledBold />
      </button>
      <button
        title="Italic"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        <StyledItalic />
      </button>
      <button
        title="underline"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive("underline") ? "is-active" : ""}
      >
        <StyledUnderlined />
      </button>
      <button
        title="bullet-list"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bullet-list") ? "is-active" : ""}
      >
        <StyledFormatListBulleted />
      </button>

      <button
        title="list-numbered"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("list-numbered") ? "is-active" : ""}
      >
        <StyledFormatListNumbered />
      </button>
      <button
        title="image"
        onClick={() => editor.chain().focus().toggleImage().run()}
        className={editor.isActive("image") ? "is-active" : ""}
      >
        <StyledImage />
      </button>

      <button
        title="video"
        onClick={() => editor.chain().focus().toggleVideo().run()}
        className={editor.isActive("video") ? "is-active" : ""}
      >
        <StyledVideo />
      </button>
    </Container>
  );
};

export default TextOperation;
