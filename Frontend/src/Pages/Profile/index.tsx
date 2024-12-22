/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useState, useCallback, useEffect } from "react";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import TopicIcon from "@mui/icons-material/Topic";
import Chat from "@mui/icons-material/Chat";
import GroupsIcon from "@mui/icons-material/Groups";
import CustomButton from "../../Components/Button";
import useAuth from "../../Hooks/useAuth";
import Dropzone from "../../Components/DropZone";
import CustomInput from "../../Components/Input";
import CameraswitchIcon from "@mui/icons-material/Cameraswitch";
import TopBar from "../../Components/TopBar";
import defaultProfilePic from "../../assets/images/default-profile-pic.png";
import { ToastError } from "../../Components/ToastContainer/ToastMessages";
import DialogBox from "../../Containers/DialogBox";
import { useNavigate } from "react-router-dom";
import UserNewPublication from "../../Containers/UserNewPublication";
import { type comments } from "../../Contexts/TopicContext/interfaces";
import defaulpic from "../../assets/images/fibonacci.jpg";
import Publication from "../../Containers/Publication";
import { type AxiosResponse } from "axios";
import api from "../../services/api";
import PublicationComment from "../../Components/PublicationComment";
import SideMenu from "../../Components/SideMenu";

import {
  Content,
  ProfileContainer,
  ProfileText,
  UserAvatar,
  ProfiletextWrapper,
  StatisticProfileItem,
  StatisticsItemWrapper,
  ProfileStatisticsWrapper,
  ButtonWrapper,
  ProfileEditorContainer,
  EditProfileFieldWrapper,
  CloseIcon,
  CloseIconDiv,
  DataArea,
  CustomHeader,
  UserInfo,
  CustomEditIcon,
  UserPublicationWrapper,
  PublicationsList,
  Resellers,
  Reseller,
  UserGroupsList,
  UserGroup,
  Container,
} from "./styles";

interface IProfileProps {
  userBirthDate?: Date;
  totalNumberOfGroups?: number;
  groupsAsOwner?: number;
  groupsAsModerator?: number;
  groupsAsMember?: number;
  topicsCreated?: number;
  commentsCreated?: number;
  GroupsBanned?: number;
  JoinsRequested?: number;
}

const Profile = ({
  totalNumberOfGroups,
  groupsAsOwner,
  topicsCreated,
  commentsCreated,
}: IProfileProps) => {
  const [editProfileVisible, setEditProfileVisible] = useState<boolean>(false);
  const [editAvatarVisible, setEditAvatarVisible] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<File[]>([]);
  const [newUserName, setNewUserName] = useState<string>("");
  const [newUserMail, setNewUserMail] = useState<string>("");
  const [DialogIsVisible, SetDialogIsVisible] = useState<boolean>(false);
  const [publiCations, setPublications] = useState<comments[]>([]);
  const [publication, setPublication] = useState("");
  const [PublicationCommentList, setPublicationCommentList] = useState<
    comments[]
  >([]);
  const [PublicationCommentData, setPublicationCommentData] = useState("");

  const navigate = useNavigate();

  const { userData, dispatch, asyncChangeAvatar, asyncRequestDeleteAccount } =
    useAuth();

  const getPublications = async () => {
    try {
      const res: AxiosResponse = await api.get<AxiosResponse>(`publications`, {
        headers: { Authorization: `Bearer ${userData.token}` },
      });
      console.log("publicações carregadas", res.data);

      setPublications(res.data);

      return res.status;
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    getPublications();
  }, [editAvatarVisible, userData]);

  const changeUserName = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      event.preventDefault();
      setNewUserName(event.currentTarget.value);
    },
    [newUserName]
  );

  const changeUserMail = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      event.preventDefault();
      setNewUserMail(event.currentTarget.value);
    },
    [newUserName]
  );

  const changePublication = useCallback(
    (value: any) => {
      setPublication(value);
    },
    [publication]
  );

  const toggleProfileEdit = useCallback((value: boolean) => {
    setEditProfileVisible(value);
  }, []);

  const toggleDialogBOx = useCallback((value: boolean) => {
    SetDialogIsVisible(value);
  }, []);

  const deleteAccount = async () => {
    try {
      if (userData?.token) {
        await asyncRequestDeleteAccount(Number(userData?.id), userData?.token);
      }
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      return err;
    }
  };

  const updateAvatar = async (event: any) => {
    event.preventDefault();

    if (!userData?.token) {
      ToastError("Sua sessão foi expirada, faça login novamente");
      return;
    }

    const data = new FormData();

    data.append("file", profileImage[0]);

    try {
      void asyncChangeAvatar(dispatch, data);

      setEditAvatarVisible(!editAvatarVisible);
    } catch (err) {
      setEditAvatarVisible(!editAvatarVisible);
    }
  };

  const generateProfilePic = useCallback(() => {
    if (userData.avatar !== null || userData.avatar || "") {
      return userData.avatar.path;
    } else {
      return defaultProfilePic;
    }
  }, [userData]);

  const postNewComment = async (publication_id: number) => {
    if (userData?.name) {
      setPublicationCommentList([
        ...PublicationCommentList,
        {
          id: 0,
          author: {
            name: userData.name,
            id: Number(userData.id),
            avatar: { path: userData.avatar.path },
          },
          body: PublicationCommentData,
          commentLikes: [],
        },
      ]);

      if (!userData.token) {
        throw new Error("Erro inesperado, token não fornecido");
      }

      try {
        alert("entrou no try");
        const res: AxiosResponse = await api.post<AxiosResponse>(
          `publication_comment/${publication_id}`,
          {
            headers: { Authorization: `Bearer ${userData.token}` },
            body: PublicationCommentData,
          }
        );

        console.log(res.status);
      } catch (err) {
        return err;
      }
    } else {
      throw new Error("Erro inesperado, tente novamente");
    }
  };

  return (
    <>
      <TopBar />

      {editProfileVisible && (
        <>
          <ProfileEditorContainer>
            <CloseIconDiv>
              <CloseIcon
                onClick={() => {
                  toggleProfileEdit(false);
                }}
              />
            </CloseIconDiv>
            <DataArea>
              <EditProfileFieldWrapper>
                <CustomInput
                  type="text"
                  value={newUserName}
                  placeHolder="digite seu novo nome"
                  onChange={changeUserName}
                />
              </EditProfileFieldWrapper>
              <EditProfileFieldWrapper>
                <CustomInput
                  type="text"
                  value={newUserMail}
                  placeHolder="digite seu novo email"
                  onChange={changeUserMail}
                />
              </EditProfileFieldWrapper>
            </DataArea>
            <CustomButton
              onClick={() => {
                toggleDialogBOx(true);
              }}
            >
              Deletar perfil?
            </CustomButton>
          </ProfileEditorContainer>
        </>
      )}
      {editAvatarVisible && (
        <ProfileEditorContainer height="330px" width="340px">
          <CloseIconDiv>
            <CloseIcon
              onClick={() => {
                setEditAvatarVisible(false);
              }}
            />
          </CloseIconDiv>
          <Dropzone
            previewMessage="Selecione a sua nova foto de perfil.."
            files={profileImage}
            onDrop={(acceptedImage) => {
              setProfileImage(
                acceptedImage.map((file) =>
                  Object.assign(file, {
                    preview: URL.createObjectURL(file),
                  })
                )
              );
            }}
          />

          <CustomButton
            height="40px"
            width="121px"
            onClick={updateAvatar}
            customBackgroundColor="transparent"
            customColor="cyan"
            customBorder="1px solid #373e4a"
          >
            Alterar
          </CustomButton>
        </ProfileEditorContainer>
      )}
      <Container>
        <SideMenu />
        <Content bluried={editProfileVisible || editAvatarVisible}>
          <ProfileContainer bluried={editProfileVisible || editAvatarVisible}>
            <CustomHeader />
            <UserInfo>
              <UserAvatar
                style={{
                  background: `url(${generateProfilePic()} ) no-repeat center`,
                  backgroundSize: "cover",
                }}
              >
                <div
                  className="userAvatarHover"
                  onClick={() => {
                    setEditAvatarVisible(!editAvatarVisible);
                  }}
                >
                  <CameraswitchIcon
                    style={{
                      width: 32,
                      height: 32,
                      marginTop: 10,
                      color: "#565f82",
                      opacity: "1px !important",
                    }}
                  />

                  <strong>alterar foto</strong>
                </div>
              </UserAvatar>

              <ProfiletextWrapper
                style={{
                  position: "absolute",
                  left: "264px",
                }}
              >
                <ProfileText
                  style={{
                    fontSize: "30px",
                    margin: "0",
                    marginTop: "5px",
                  }}
                >
                  {userData?.name}
                </ProfileText>
              </ProfiletextWrapper>
            </UserInfo>

            <ProfileStatisticsWrapper>
              <StatisticsItemWrapper>
                <GroupsIcon
                  style={{
                    color: "#565f82",
                  }}
                />

                <hr />
                <StatisticProfileItem>
                  Participa de {userData.groups.length} grupos
                </StatisticProfileItem>
              </StatisticsItemWrapper>

              <StatisticsItemWrapper>
                <AdminPanelSettingsIcon
                  style={{
                    color: "#565f82",
                  }}
                />
                <hr />
                <StatisticProfileItem>
                  É dono de {userData.groupsAsAdmin} grupos
                </StatisticProfileItem>
              </StatisticsItemWrapper>

              <StatisticsItemWrapper>
                <TopicIcon
                  style={{
                    color: "#565f82",
                  }}
                />
                <hr />
                <StatisticProfileItem>
                  já criou {userData.topicsCreated} tópicos
                </StatisticProfileItem>
              </StatisticsItemWrapper>

              <StatisticsItemWrapper>
                <Chat
                  style={{
                    color: "#565f82",
                  }}
                />
                <hr />
                <StatisticProfileItem>
                  já comentou {userData.commentsCreated} vezes.
                </StatisticProfileItem>
              </StatisticsItemWrapper>
            </ProfileStatisticsWrapper>
            <ButtonWrapper>
              <CustomButton
                disabled={editProfileVisible}
                marginTop="70px"
                width="80px"
                customBackgroundColor="#0e1014"
                customColor="green"
                customBorder="1px solid #373e4a"
                onClick={() => {
                  toggleProfileEdit(true);
                }}
              >
                <CustomEditIcon /> Editar
              </CustomButton>
            </ButtonWrapper>
          </ProfileContainer>

          <UserPublicationWrapper>
            <UserNewPublication onChangeText={changePublication} />
            <Resellers>
              <div> 280 amigos </div>
              <div className="FriendList">
                <Reseller>
                  <img src={defaulpic} alt="reseller" />
                </Reseller>
                <Reseller>
                  <img src={defaulpic} alt="reseller" />
                </Reseller>
                <Reseller>
                  <img src={defaulpic} alt="reseller" />
                </Reseller>
                <Reseller>
                  <img src={defaulpic} alt="reseller" />
                </Reseller>
                <Reseller>
                  <img src={defaulpic} alt="reseller" />
                </Reseller>
              </div>
            </Resellers>
            <UserGroupsList>
              <strong
                style={{
                  color: "cyan",
                }}
              >
                Grupos
              </strong>
              <div className="groupList">


                {
                  userData.groups.slice(0,4).map((userGroup, index)=> {

                    return (
                      <UserGroup>
                        <h5>{userGroup.name}</h5>
                        <img src={String(userGroup.avatar.path)} alt="reseller" />
                    </UserGroup>
                    )
                  })
                }
       
              </div>
            </UserGroupsList>
          </UserPublicationWrapper>

          <PublicationsList>
            {publiCations.length >= 1 &&
              Boolean(publiCations.length) === true &&
              publiCations.map((publication, index) => {
                return (
                  <Publication
                    publicationId={publication.id}
                    userAvatar={publication.author.avatar.path}
                    userName={publication.author.name}
                    body={publication.body}
                    createdAt={
                      publication.createdAt ? publication.createdAt : new Date()
                    }
                  ></Publication>
                );
              })}
          </PublicationsList>
        </Content>
      </Container>
      {DialogIsVisible && (
        <DialogBox
          visible={DialogIsVisible}
          onCancel={() => {
            toggleDialogBOx(false);
          }}
          onConfirm={() => {
            void deleteAccount();
          }}
        />
      )}
    </>
  );
};

export default Profile;
