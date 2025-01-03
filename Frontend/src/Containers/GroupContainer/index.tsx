import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import PublicIcon from "@mui/icons-material/Public";
import { Container } from "./styles";
import CustomButton from "../../Components/Button";

interface IGroupContainerProps {
  children: React.ReactNode;
  isOwner: boolean | null | object;
  group_id: number;
  imageSrc: string;
  groupName: string;
  numberOfMembers: number;
  onclickEdit: () => void;
  onclickDelete: () => void;
  onclickRequesters: () => void;
  onclickBans: () => void;
}

import {
  ButtonAdminContainer,
  NavBar,
  NavBarItem,
  NavBarWrapper,
  StyledAdminIcon,
  StyledChatIcon,
  StyledGroupsList,
  StyledDescriptionIcon,
  StyledGavelIcon,
  GroupInfoContainer,
  Header,
  GroupTitle,
  GroupInfo,
  GroupImage,
  ButtonAdminWrapper,
  GroupAvatar,
} from "./styles";

const GroupContainer = ({
  group_id,
  imageSrc,
  groupName,
  numberOfMembers,
  children,
  isOwner,
  onclickEdit,
  onclickDelete,
  onclickBans,
  onclickRequesters,
}: IGroupContainerProps) => {
  const navigate = useNavigate();
  return (
    <>
      <Container>
        <ButtonAdminContainer>
          <NavBarWrapper>
            <NavBar>
              <NavBarItem>
                <StyledChatIcon />
                <h6
                  onClick={() => {
                    navigate(`/group/${group_id}`);
                  }}
                >
                  Discussão
                </h6>
              </NavBarItem>
              <NavBarItem>
                <StyledGroupsList />
                <h6
                  onClick={() => {
                    navigate(`/group/${group_id}/members`);
                  }}
                >
                  Membros
                </h6>
              </NavBarItem>
              <NavBarItem>
                <StyledAdminIcon />
                <h6
                  onClick={() => {
                    navigate(`/group/${group_id}/adms`);
                  }}
                >
                  Administradores
                </h6>
              </NavBarItem>

              <NavBarItem>
                <StyledDescriptionIcon />
                <h6
                  onClick={() => {
                    navigate(`/group/${group_id}/info`);
                  }}
                >
                  Descrição
                </h6>
              </NavBarItem>
              <NavBarItem>
                <StyledGavelIcon />
                <h6
                  onClick={() => {
                    navigate(`/group/${group_id}/rules`);
                  }}
                >
                  Regras
                </h6>
              </NavBarItem>
            </NavBar>
          </NavBarWrapper>
        </ButtonAdminContainer>
        <GroupInfoContainer>
          <GroupAvatar src={imageSrc} />
          <Header>
            <GroupTitle>{groupName}</GroupTitle>
            <GroupInfo>
              <PublicIcon
                style={{
                  color: "#565f82",
                }}
              />
              <GroupTitle> grupo público</GroupTitle>
              <div />
              <GroupTitle>{numberOfMembers} membros</GroupTitle>
            </GroupInfo>

            <GroupImage />
          </Header>
          <ButtonAdminContainer>
            {isOwner && (
              <ButtonAdminWrapper>
                <CustomButton
                  width="90px"
                  height="30px"
                  customColor="red"
                  customBackgroundColor="transparent"
                  customBorder="1px solid #373e4a"
                  onClick={onclickDelete}
                >
                  Deletar
                </CustomButton>
                <CustomButton
                  width="90px"
                  height="30px"
                  customColor="green"
                  customBackgroundColor="transparent"
                  customBorder="1px solid #373e4a"
                  onClick={onclickEdit}
                >
                  Editar
                </CustomButton>

                <CustomButton
                  width="90px"
                  height="30px"
                  customColor="green"
                  customBackgroundColor="transparent"
                  customBorder="1px solid #373e4a"
                  onClick={() => {
                    onclickRequesters;
                  }}
                >
                  Solicitações
                </CustomButton>

                <CustomButton
                  width="90px"
                  height="30px"
                  customColor="green"
                  customBackgroundColor="transparent"
                  customBorder="1px solid #373e4a"
                  onClick={() => {
                    onclickBans;
                  }}
                >
                  Banidos
                </CustomButton>
              </ButtonAdminWrapper>
            )}
          </ButtonAdminContainer>
        </GroupInfoContainer>
        {children}
      </Container>
    </>
  );
};

export default GroupContainer;
