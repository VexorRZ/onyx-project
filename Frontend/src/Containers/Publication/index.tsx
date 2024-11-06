import React, { useState } from "react";
import DOMPurify from "dompurify";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Container } from "./styles";
import PublicationComment from "../../Components/PublicationComment/index";
import { type Comments } from "../../Contexts/TopicContext/interfaces";
import TextEditor from "../Editor";
import { StyledItalic } from "../../Components/TextFormatters/styles";

export type Publicattion = {
  userAvatar: string;
  userName: string;
  createdAt: Date;
  body: string;
};

const Publication = ({
  userAvatar,
  userName,
  createdAt,
  body,
}: Publicattion) => {
  const [commments, setComments] = useState<Comments[]>([]);
  return (
    <Container>
      <header className="publicationHeader">
        <img className="avatar" src={userAvatar} alt="" />
        <div className="publicationData">
          <h6 className="userName">{userName} </h6>
          <time dateTime="PT2H30" className="date">
            {formatDistanceToNow(createdAt ? createdAt : new Date(), {
              includeSeconds: true,
              addSuffix: true,
              locale: ptBR,
            })}
          </time>
        </div>
      </header>

      <article
        style={{
          background: "#17191f",
          borderRadius: "6px",
          padding: "12px",
        }}
        className="publicationBody"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(body),
        }}
      />
      <TextEditor
        customHeightButton="20px"
        customWidthButton="20px"
        height="45px"
        mingHeight="45px"
        onChange={() => {}}
      />
      <>
        {commments.map((comment, index) => {
          return (
            <PublicationComment
              key={index}
              onClick={() => {}}
              authorAvatar={comment.author.avatar.path}
              authorName={comment.author.name}
              body={comment.body}
            />
          );
        })}
      </>
    </Container>
  );
};

export default Publication;
