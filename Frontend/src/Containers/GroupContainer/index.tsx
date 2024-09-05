import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import PublicIcon from "@mui/icons-material/Public";
import { Container } from "./styles";

interface IGroupContainerProps {
  children?: React.ReactNode;
  group_id: number;
  imageSrc: string;
  groupName: string;
  numberOfMembers: number;
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
} from "./styles";

const GroupContainer = ({
  group_id,
  imageSrc,
  groupName,
  numberOfMembers,
  children,
}: IGroupContainerProps) => {
  const [editProfileVisible, setEditProfileVisible] = useState<boolean>(false);

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
          <img
            src={imageSrc}
            style={{
              width: "200px",

              height: "200px",
              borderRadius: "8%",
            }}
          />
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
        </GroupInfoContainer>
        {children}
      </Container>
    </>
  );
};

export default GroupContainer;
