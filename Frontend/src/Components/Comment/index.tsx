import React, { useState } from "react";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import DOMPurify from "dompurify";

import {
  Comment,
  AuthorAvatar,
  CommentAuthor,
  CommentDate,
  CommentContent,
  CommentDetailsWrapper,
  CustomDeleteIcon,
  CustomEditIcon,
  EditorWrapper,
} from "./styles";
import { boolean } from "yup";
import { Title } from "../../Pages/ForgotPassword/styles";

interface IcommmentProps {
  childrenDetailsWrapper?: React.ReactNode;
  key: number;
  onClick: () => void;
  authorAvatar: string;
  authorName: string;
  createdAt?: Date;
  body: string;
  userIsAuthor?: boolean;
}

const comment = ({
  key,
  childrenDetailsWrapper,
  onClick,
  authorAvatar,
  authorName,
  createdAt,
  body,
  userIsAuthor,
}: IcommmentProps) => {
  const [wrapperVisible, setWrapperVisible] = useState(true);
  return (
    <>
      <Comment key={key}>
        <div
          style={{
            display: "flex",
            gap: "14px",
          }}
        >
          <AuthorAvatar src={authorAvatar} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <CommentAuthor>{authorName}</CommentAuthor>
            <CommentDate>
              {format(
                new Date(createdAt ?? new Date()),
                "'dia' dd 'de' MMMM', às ' HH:mm'h'",
                { locale: ptBR }
              )}
            </CommentDate>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "8px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <CommentContent
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(body),
              }}
            />
            <CommentDetailsWrapper>
              <div className="likeWrapper">{childrenDetailsWrapper}</div>
            </CommentDetailsWrapper>
          </div>
          {userIsAuthor && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                gap: "6px",
              }}
            >
              {wrapperVisible && (
                <>
                  <EditorWrapper title="Editar">
                    <CustomEditIcon>Editar</CustomEditIcon>
                  </EditorWrapper>
                  <EditorWrapper title="Deletar">
                    <CustomDeleteIcon
                      onClick={() => {
                        onClick();
                      }}
                    >
                      Deletar
                    </CustomDeleteIcon>
                  </EditorWrapper>
                </>
              )}
            </div>
          )}
        </div>
      </Comment>
    </>
  );
};

export default comment;
