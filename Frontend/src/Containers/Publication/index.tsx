import React, { useState, useCallback, useEffect } from "react";
import DOMPurify from "dompurify";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import PublicationComment from "../../Components/PublicationComment/index";
import { type Comments } from "../../Contexts/TopicContext/interfaces";
import useAuth from "../../Hooks/useAuth";
import { type AxiosResponse } from "axios";
import api from "../../services/api";

import { Container, StyledSendIcon } from "./styles";
export type Publicattion = {
  userAvatar: string;
  userName: string;
  createdAt: Date;
  body: string;
  publicationId?: number;
};

const Publication = ({
  userAvatar,
  userName,
  createdAt,
  body,
  publicationId,
}: Publicattion) => {
  const [commentList, setCommentlist] = useState<Comments[]>([]);
  const [comment, setComment] = useState("");
  const { userData } = useAuth();

  // const changeComment = useCallback(
  //   (value: any) => {
  //     setComment(value);
  //   },
  //   [comment]
  // );

  const UpdateComment = (event: any) => {
    setComment(event.target.value);
  };

  const getPublicationComments = async (publicationId: number | undefined) => {
    if (!userData.token) {
      throw new Error("Erro inesperado, token não fornecido");
    }

    try {
      const res: AxiosResponse = await api.get<AxiosResponse>(
        `publication_comments/${Number(publicationId)}`,
        {
          headers: { Authorization: `Bearer ${userData.token}` },
        }
      );

      console.log(res.data);
      setCommentlist(res.data);
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    getPublicationComments(publicationId);
  }, []);

  const postNewComment = async (publicationId: number | undefined) => {
    if (userData?.name) {
      setCommentlist([
        ...commentList,
        {
          id: 0,
          author: {
            name: userData.name,
            id: Number(userData.id),
            avatar: { path: userData.avatar.path },
          },
          body: comment,
          commentLikes: [],
        },
      ]);

      if (!userData.token) {
        throw new Error("Erro inesperado, token não fornecido");
      }

      try {
        const res: AxiosResponse = await api.post<AxiosResponse>(
          `publication_comment/${Number(publicationId)}`,
          {
            headers: { Authorization: `Bearer ${userData.token}` },
            body: comment,
          }
        );

        return res.status;
      } catch (err) {
        return err;
      }
    } else {
      throw new Error("Erro inesperado, tente novamente");
    }
  };

  return (
    <Container>
      <header className="publicationHeader">
        <img className="avatar" src={userAvatar} alt="" />
        <div className="publicationData">
          <h6 className="userName">{userName} </h6>
          <time dateTime="PT2H30" className="date">
            {/* {formatDistanceToNow(createdAt ? createdAt : new Date(), {
              includeSeconds: true,
              addSuffix: true,
              locale: ptBR,
            })} */}
          </time>
        </div>
      </header>

      <article
        className="publicationBody"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(body),
        }}
      />

      <>
        {commentList.map((comment, index) => {
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
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "16px",
        }}
      >
        <img
          src={userData.avatar.path}
          style={{
            width: "33px",
            height: "33px",
            borderRadius: " 20%",
          }}
        />
        <div className="commentBox">
          <textarea
            className="inputComment"
            placeholder="comente algo"
            value={comment}
            onChange={UpdateComment}
          />
          <div className="iconWrapper">
            <StyledSendIcon
              onClick={() => {
                postNewComment(publicationId);
              }}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Publication;
