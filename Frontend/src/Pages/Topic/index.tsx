/* eslint-disable spaced-comment */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { type AxiosResponse } from "axios";
import api from "../../services/api";
import {
  type GroupTopic,
  type TopicData,
  type comments,
  type Members
} from "../../Contexts/TopicContext/interfaces";
import useAuth from "../../Hooks/useAuth";
import useTopicContext from "../../Hooks/useTopics";
import Button from "../../Components/Button";
import TopBar from "../../Components/TopBar";
import Like from "../../Components/Like";
import TextEditor from "../../Containers/Editor";
import Comment from "../../Components/Comment";
import { io } from "socket.io-client";

import {
  Container,
  GroupImage,
  GroupTitle,
  Header,
  TopicContent,
  CommentsLists,
  ButtonArea,
  Pagination,
  PaginationButton,
  PaginationItem,
  CommentContentWrapper,
} from "./styles";

const TopicPage = () => {
  const [groupTopic, setTopic] = useState<Partial<TopicData>>({});
  const [commentBoxOpenned, setCommentBoxOppened] = useState(false);
  const [comment, setComment] = useState("");
  const [commentList, setCommentlist] = useState<comments[]>([]);
  const [groupMembers, setGroupMembers] = useState<Members[]>([])
  const [liked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(5);
  const [pages, setPages] = useState<number[]>([]);
  const [total, setTotal] = useState(0);
  const [socket, setSocket] = useState(null);
  const params = useParams();
  const { group_id, topic_id } = params;

  const { userData } = useAuth();

  const { asyncDeleteComment } = useTopicContext();

  const navigate = useNavigate();

  const deleteComment = async (
    group_id: number,
    topic_id: number,
    comment_id: number
  ) => {
    try {
      await asyncDeleteComment(group_id, topic_id, comment_id, userData.token);
    } catch (err) {
      console.log(err);
      return;
    } finally {
      if (commentList) {
        const newCommentList = commentList.filter(
          ({ id }) => id !== comment_id
        );
        setCommentlist(newCommentList);
      }
    }
  };

  const getTopicByCredentials = async () => {
    if (!userData?.token) {
      return;
    }

    try {
      const res: AxiosResponse<GroupTopic> = await api.get<
        GroupTopic,
        AxiosResponse<GroupTopic>
      >(
        `/topics/${Number(group_id)}/${Number(
          topic_id
        )}?page=${currentPage}&size=${limit}`,
        {
          headers: { Authorization: `Bearer ${userData.token}` },
        }
      );

      const { totalCount, comments, topic, members } = res.data;

      console.log("resposta", res.data);
      setCommentlist(comments);
      setGroupMembers(members)
      setTopic({ ...topic });

      if (totalCount) {
        const totalPages = Math.ceil(totalCount / limit);
        const arrayPages = [];

        for (let i = 1; i <= totalPages; i++) {
          arrayPages.push(i);
        }
      
        setPages(arrayPages);
        setTotal(totalCount);
      }
    } catch (err) {
      return err;
    }
  };

  const postNewComment = async () => {
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

      setCommentBoxOppened(false);

      try {
        const res: AxiosResponse = await api.post<AxiosResponse>(
          `/comments/${Number(group_id)}/${Number(topic_id)}`,
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

  const addNewComment = useCallback(() => {
    setCommentBoxOppened(!commentBoxOpenned);
  }, [commentBoxOpenned]);

  const changeComment = useCallback(
    (value: any) => {
      setComment(value);
    },
    [comment]
  );

  const updateLike = async (commentId: number) => {
    try {
      const res: AxiosResponse<GroupTopic> = await api.put<
        GroupTopic,
        AxiosResponse<GroupTopic>
      >(`comments_likes/${Number(userData.id)}/${Number(commentId)}`, {
        headers: { Authorization: `Bearer ${userData.token}` },
      });

      return res;
    } catch (err) {
      return err;
    }
  };

  const commentHasLike = (commentId: number) => {
    const currentComment = commentList.find(({ id }) => id === commentId);

    const userLikeExists = currentComment?.commentLikes.find(
      ({ author_id }) => author_id === Number(userData.id)
    );

    return userLikeExists;
  };

  const currentUserIsMember = () => {
    const isMember = groupMembers.find(
      ({ id }) => id === Number(userData.id)
    );

    if (isMember) {
      return true;
    } else {
      return false;
    }
  };

  const currentUserIsAuthor = (commentId: number) => {
    const currentCumment = commentList.find(({ id }) => id === commentId);

    if (currentCumment?.author.id === Number(userData.id)) {
      return true;
    } else {
      return false;
    }
  };

  const handleNotification = async (
    receiver_name: string,
    receiver_id: number,
    type: string
  ) => {
    try {
      if (String(receiver_id) === userData.id) {
        return;
      }
      const res: AxiosResponse<GroupTopic> = await api.post<
        GroupTopic,
        AxiosResponse<GroupTopic>
      >(`notifications/${userData.id}/${receiver_id}`, {
        headers: { Authorization: `Bearer ${userData.token}` },
        sender_name: userData.name,
        sender_id: userData.id,
        receiver_name,
        receiver_id,
        group_id: group_id,
        group_name: groupTopic.name,
        topic_name: groupTopic.topics ? groupTopic.topics[0].name : "",
        topic_id: topic_id,
        type,
      });

      return res;
    } catch (err) {
      return err;
    } finally {
      // @ts-expect-error
      socket.emit("sendNotification", {
        sender_name: userData.name,
        receiver_name,
        receiver_id,
        group_id: group_id,
        group_name: groupTopic.name,
        topic_name: groupTopic.topics ? groupTopic.topics[0].name : "",
        topic_id: topic_id,
        type,
      });
    }
  };

  useEffect(() => {
    void getTopicByCredentials();
    //@ts-expect-error
    setSocket(io("http://localhost:3333"));
  }, [currentPage, limit, total, liked]);

  function useQuery() {
    const { search } = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
  }

  return (
    <>
      <TopBar />
      <Container>
        <Header>
          <GroupTitle>{groupTopic.name}</GroupTitle>
          <GroupImage />
        </Header>
        <TopicContent>
          return (
          <>
            <h2>{groupTopic.name}</h2>
            <div className="authorWrapper">
              <h3>Autor:</h3> <h4>{groupTopic.name}</h4>
            </div>
            <CommentsLists>
              {commentList.map((comment, index) => {
                return (
                  <CommentContentWrapper
                    key={index}
                
                  >
                    <Comment
                      createdAt={
                        new Date(
                          comment.createdAt ? comment.createdAt : new Date()
                        )
                      }
                      userIsAuthor={Boolean(currentUserIsAuthor(comment.id))}
                      key={index}
                      body={comment.body}
                      authorAvatar={comment.author.avatar.path}
                      authorName={comment.author.name}
                      onClick={() => {
                        void deleteComment(
                          Number(group_id),
                          Number(topic_id),
                          comment.id
                        );
                      }}
                    >
                     <Like
                      hasLike={Boolean(commentHasLike(comment.id))}
                      onClickWithLike={async () => {
                        await updateLike(comment.id);
                      }}
                      onClickWithDisLike={async () => {
                        await updateLike(comment.id);

                        handleNotification(
                          comment.author.name,
                          comment.author.id,
                          "like"
                        );
                      }}
                      likeAmount={comment.commentLikes.length}
                    />
                    </Comment>
                  </CommentContentWrapper>
                );
              })}
              {commentBoxOpenned && (
                <TextEditor
                  alignItems="flex-start"
                  width="100%"
                  onChange={changeComment}
                />
              )}

              {currentUserIsMember() && (
                <ButtonArea>
                  {commentBoxOpenned && (
                    <Button
                      width="150px"
                      customBackgroundColor="transparent"
                      customColor="cyan"  
                      customBorder="1px solid #373e4a"
                      onClick={() => {
                        void postNewComment();
                        // handleNotification(
                        //   groupTopic.topics
                        //     ? groupTopic.topics[0].author.name
                        //     : "",
                        //   groupTopic.topics
                        //     ? groupTopic.topics[0].author.id
                        //     : 0,
                        //   "CommentOnTopic"
                        // );
                      }}
                    >
                      Postar
                    </Button>
                  )}
                  <Button
                      width="150px"
                      customBackgroundColor="transparent"
                      customColor="cyan"  
                      customBorder="1px solid #373e4a"  
                    onClick={() => {
                      addNewComment();
                    }}
                  >
                    {!commentBoxOpenned
                      ? `${`Adicionar comentário`}`
                      : `${`cancelar`}`}
                  </Button>
                </ButtonArea>
              )}
            </CommentsLists>
          </>
          );
        </TopicContent>
        <>
          <Pagination>
            <strong>{total} Comentários</strong>
            <PaginationButton>
              {currentPage > 1 && (
                <PaginationItem
                  to={`../topics/${group_id}/${topic_id}/?page=${
                    currentPage - 1
                  }*`}
                  onClick={() => {
                    setCurrentPage(currentPage - 1);
                    navigate(
                      `../topics/${group_id}/${topic_id}/?page=${
                        currentPage - 1
                      }`,
                      { replace: true }
                    );
                  }}
                >
                  Anterior
                </PaginationItem>
              )}
              {pages.map((page) => (
                <>
                  <PaginationItem
                    to={`../topics/${group_id}/${topic_id}/?page=${page}`}
                    isSelect={page === currentPage}
                    key={page}
                    onClick={() => {
                      setCurrentPage(Number(page));
                      navigate(
                        `../topics/${group_id}/${topic_id}/?page=${page}`,
                        {
                          replace: true,
                        }
                      );
                    }}
                  >
                    {page}
                  </PaginationItem>
                </>
              ))}
              {currentPage < pages.length && (
                <PaginationItem
                  to={`../topics/${group_id}/${topic_id}/?page=${
                    currentPage + 1
                  }`}
                  onClick={() => {
                    setCurrentPage(currentPage + 1);
                    navigate(
                      `../topics/${group_id}/${topic_id}/?page=${
                        currentPage + 1
                      }`,
                      { replace: true }
                    );
                  }}
                >
                  Próxima
                </PaginationItem>
              )}
            </PaginationButton>
          </Pagination>
        </>
      </Container>
    </>
  );
};

export default TopicPage;
