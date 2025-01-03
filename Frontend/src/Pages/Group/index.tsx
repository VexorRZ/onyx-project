/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { type AxiosResponse } from "axios";
import { type Response, Topics, Members } from "../../services/interfaces";
import PublicIcon from "@mui/icons-material/Public";
import Topic from "../../Components/TopicContent";
import CustomButton from "../../Components/Button";
import CreateTopic from "../../Containers/CreateTopic";
import TopBar from "../../Components/TopBar";
import DialogBox from "../../Containers/DialogBox";
import GroupContainer from "../../Containers/GroupContainer";
import Loader from "../../Components/Loader";
import useAuth from "../../Hooks/useAuth";
import useGroup from "../../Hooks/useGroups";
import type { Group } from "../../Contexts/GroupContentContext/interfaces";
import { useRadioGroup } from "@mui/material/RadioGroup";
import defaultProfilePic from "../../assets/images/default-pic.jpg";
import FormControlLabel, {
  type FormControlLabelProps,
} from "@mui/material/FormControlLabel";
import { styled } from "@mui/material/styles";
import GroupContainerEditor from "../../Containers/GroupContainerEditor";
import defaultProfiilePic from "../../assets/images/default-profile-pic.png";

import {
  TopicList,
  Pagination,
  PaginationButton,
  PaginationItem,
  ButtonArea,
} from "./styles";

interface StyledFormControlLabelProps extends FormControlLabelProps {
  checked: boolean;
}

const StyledFormControlLabel = styled((props: StyledFormControlLabelProps) => (
  <FormControlLabel {...props} />
))(({ theme, checked }) => ({
  ".MuiFormControlLabel-label": checked && {
    color: theme.palette.primary.main,
  },
}));

const GroupPage = () => {
  const [group, setGroup] = useState<Group>();
  const [groupName, setGroupName] = useState<string>("");
  const [topics, setTopics] = useState<Topics[]>([]);
  const [members, setMembers] = useState<Members[]>([]);
  const [option, setOption] = useState<boolean>(false);
  const [editProfileVisible, setEditProfileVisible] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<File[]>([]);
  const [createTopic, setCreateTopic] = useState<boolean>(false);
  const [groupId, setGroupId] = useState<string>("");
  const [isOwner, setIsOwner] = useState<object | null>(null);
  const [userId, SetUserId] = useState<string | null>();
  const [DialogIsVisible, SetDialogIsVisible] = useState<boolean>(false);
  const [contentName, setContentName] = useState<string>("topics");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [index] = useState(2);
  const [limit] = useState(10);
  const [pages, setPages] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState<number | undefined>(0);

  const params = useParams();
  const { groupData, asyncGetGroupMembers, asyncEditGroup, dispatch } =
    useGroup();
  const { userData } = useAuth();

  const { group_id } = params;

  const navigate = useNavigate();

  const openTopic = useCallback((topicId: number) => {
    navigate(`/topics/${Number(group_id)}/${topicId}`);
  }, []);

  const openTopicCreate = useCallback(() => {
    setCreateTopic(true);
  }, []);

  const toggleDialogBOx = useCallback((value: boolean) => {
    SetDialogIsVisible(value);
  }, []);

  const toggleEditGroupBox = useCallback((value: boolean) => {
    setEditProfileVisible(value);
  }, []);

  const closeTopicModal = useCallback(() => {
    setCreateTopic(false);
  }, []);

  useEffect(() => {
    SetUserId(userData.id);
  });

  const getGroup = async () => {
    if (!userData?.token) {
      return;
    }

    try {
      setIsLoading(true);
      const res: AxiosResponse<Response> = await api.get<
        Response,
        AxiosResponse<Response>
      >(
        `groups/${Number(group_id)}?page=${Number(currentPage)}&size=${Number(
          limit
        )}`,
        {
          headers: { Authorization: `Bearer ${userData?.token}` },
        }
      );

      const { numberOfTopics, isOwner, findTopics, group, members } = res.data;

      console.log("isOwner", isOwner);

      console.log("grupo carregado:", group);

      // @ts-expect-error

      setGroup(group);
      // setGroup({ ...res.data.groupData[0] });
      setTopics(findTopics);

      setMembers(members);

      if (isOwner) {
        setIsOwner(isOwner);
      }

      // @ts-expect-error
      const totalPages = Math.ceil(total / limit);
      const arrayPages = [];

      for (let i = 1; i <= totalPages; i++) {
        arrayPages.push(i);
      }

      setPages(arrayPages);

      setTotal(numberOfTopics);

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      return err;
    }
  };

  const fetchMembers = useCallback(async () => {
    try {
      setIsLoading(true);

      await asyncGetGroupMembers(Number(groupId), dispatch);

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  }, [index, isLoading]);

  useEffect(() => {
    void getGroup();

    generateContent();

    if (group_id) {
      setGroupId(group_id);
    }
  }, [currentPage, limit, total, contentName, groupData]);

  const changeGroupname = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      event.preventDefault();
      setGroupName(event.currentTarget.value);
    },
    [groupName]
  );

  const editGroup = async () => {
    try {
      const data = new FormData();
      data.append("is_private", JSON.stringify(Boolean(option)));
      data.append("name", groupName);
      data.append("file", profileImage[0]);

      console.log("groupname:", groupName);

      await asyncEditGroup(groupId, data, dispatch);
      toggleEditGroupBox(false);
    } catch (err) {
      return err;
    }
  };

  const deleteGroup = async () => {
    if (!userData?.token) {
      return;
    }

    try {
      const res: AxiosResponse<Response> = await api.delete<
        Response,
        AxiosResponse<Response>
      >(`groups/${String(group_id)}`, {
        headers: { Authorization: `Bearer ${userData?.token}` },
      });

      SetDialogIsVisible(false);

      navigate(`/dashboard`);

      return res.status;
    } catch (err) {
      return err;
    }
  };

  function MyFormControlLabel(props: FormControlLabelProps) {
    const radioGroup = useRadioGroup();

    let checked = false;

    if (radioGroup) {
      checked = radioGroup.value === props.value;
    }

    return <StyledFormControlLabel checked={checked} {...props} />;
  }

  const currentUserIsMember = () => {
    const isMember = members.find(({ id }) => Number(id) === Number(userId));

    if (isMember) {
      return (
        <ButtonArea>
          <CustomButton
            onClick={openTopicCreate}
            width="130px"
            height="40px"
            customBackgroundColor="transparent"
            customColor="green"
            customBorder="1px solid #373e4a"
          >
            Criar tópico
          </CustomButton>
        </ButtonArea>
      );
    } else {
      return (
        <div
          style={{
            display: "none",
          }}
        />
      );
    }
  };

  const generateContent = () => {
    return (
      <>
        {<div>tópicos</div> && topics?.length !== 0}

        {topics?.length !== 0 ? (
          <>
            <TopicList>
              {topics.map((topic, index) => {
                return (
                  <Topic
                    userAvatar={topic.author.avatar.path ?? defaultProfiilePic}
                    userName={topic.author.name}
                    URlGroup={true}
                    topicName={topic.name}
                    numberOfComments={topic.comments.length}
                    key={index}
                    onClick={() => {
                      openTopic(topic.id);
                    }}
                  />
                );
              })}
            </TopicList>
            {currentUserIsMember()}

            <Pagination>
              <div className="total">
                <strong>{total}</strong> tópicos criados
              </div>
              <PaginationButton>
                {currentPage > 1 && (
                  <PaginationItem
                    onClick={() => {
                      setCurrentPage(currentPage - 1);
                    }}
                  >
                    Anterior
                  </PaginationItem>
                )}
                {pages.map((page) => (
                  <>
                    <PaginationItem
                      isSelect={page === currentPage}
                      key={page}
                      onClick={() => {
                        setCurrentPage(Number(page));
                      }}
                    >
                      {page}
                    </PaginationItem>
                  </>
                ))}
                {currentPage < pages.length && (
                  <PaginationItem
                    onClick={() => {
                      setCurrentPage(currentPage + 1);
                    }}
                  >
                    Próxima
                  </PaginationItem>
                )}
              </PaginationButton>
            </Pagination>
          </>
        ) : (
          <>
            <div>Nenhum tópico criado ainda</div>
            <ButtonArea>
              <CustomButton
                onClick={openTopicCreate}
                width="130px"
                height="40px"
              >
                Criar
              </CustomButton>
            </ButtonArea>
          </>
        )}
      </>
    );
  };

  return (
    <>
      <TopBar />
      {editProfileVisible && (
        <GroupContainerEditor
          groupName={groupName}
          onChange={changeGroupname}
          onClickRadioPrivate={() => {
            setOption(true);
          }}
          onClickRadioPublic={() => {
            setOption(false);
          }}
          onClickToggleEditGroup={() => {
            toggleEditGroupBox(false);
          }}
          onClickEditGroup={editGroup}
        />
      )}
      <GroupContainer
        isOwner={isOwner ? isOwner : null}
        groupName={group?.name ? group.name : ""}
        imageSrc={group?.avatar.path ? group.avatar.path : defaultProfilePic}
        group_id={Number(group?.id)}
        numberOfMembers={0}
        onclickDelete={() => {
          toggleDialogBOx(true);
        }}
        onclickEdit={() => {
          toggleEditGroupBox(true);
        }}
        onclickRequesters={() => {}}
        onclickBans={() => {}}
      >
        {<Loader /> && isLoading}

        {generateContent()}

        {createTopic && (
          <CreateTopic groupId={groupId} onClick={closeTopicModal} />
        )}
        {DialogIsVisible && (
          <DialogBox
            visible={DialogIsVisible}
            onCancel={() => {
              toggleDialogBOx(false);
            }}
            onConfirm={() => {
              void deleteGroup();
            }}
          />
        )}
      </GroupContainer>
    </>
  );
};

export default GroupPage;
