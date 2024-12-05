import React from "react";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { useNavigate } from "react-router-dom";
import Dashboard from "../../Pages/Dashboard/index";

import {
  Container,
  ElementArea,
  ItemWrapper,
  StyledAccountCircleIcon,
  StyledGroupAddIcon,
  StyledPersonIcon,
  StyledGroupsList,
  StyledDashboardIcon,
} from "./styles";

interface ISideMenuProps {
  position?: string;
}

const SideMenu: React.FC = ({ position }: ISideMenuProps) => {
  const navigate = useNavigate();

  const openDashboard = () => {
    navigate("/dashboard");
  };

  const openProfilePage = () => {
    navigate("/profile");
  };

  const openUserGroups = () => {
    navigate("/user-groups");
  };

  const openGroupCreatePage = () => {
    navigate("/create-group");
  };

  const openUsersList = () => {
    navigate("/users");
  };

  return (
    <Container position={position}>
      <ElementArea onClick={openDashboard}>
        <ItemWrapper width="28px">
          <StyledDashboardIcon />
        </ItemWrapper>
        <ItemWrapper width="76px">
          <h6>Dashboard </h6>
        </ItemWrapper>
      </ElementArea>
      <ElementArea onClick={openProfilePage}>
        <ItemWrapper width="28px">
          <StyledAccountCircleIcon />
        </ItemWrapper>
        <ItemWrapper width="76px">
          <h6>Perfil </h6>
        </ItemWrapper>
      </ElementArea>
      <ElementArea onClick={openUsersList}>
        <ItemWrapper width="28px">
          <StyledPersonIcon />
        </ItemWrapper>
        <ItemWrapper width="76px">
          <h6>Usuários </h6>
        </ItemWrapper>
      </ElementArea>

      <ElementArea onClick={openUserGroups}>
        <ItemWrapper width="28px">
          <StyledGroupsList />
        </ItemWrapper>
        <ItemWrapper width="76px">
          <h6> Meus grupos </h6>
        </ItemWrapper>
      </ElementArea>

      <ElementArea onClick={openGroupCreatePage}>
        <ItemWrapper width="28px">
          <StyledGroupAddIcon />
        </ItemWrapper>
        <ItemWrapper width="76px">
          <h6>Criar grupo</h6>
        </ItemWrapper>
      </ElementArea>
    </Container>
  );
};

export default SideMenu;
