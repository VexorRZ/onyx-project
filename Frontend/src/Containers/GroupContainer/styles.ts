import styled from "styled-components";
import ChatIcon from "@mui/icons-material/Chat";
import GroupsIcon from "@mui/icons-material/Groups";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import DescriptionIcon from "@mui/icons-material/Description";
import GavelIcon from "@mui/icons-material/Gavel";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: auto;
  margin-top: 40px;
  margin-bottom: 50px;
  width: 1400px;
  min-height: 100%;
  height: 100%;
  flex: 10;
  border-radius: 6px;
  box-shadow: 0vh;
  padding: 10px 32px 32px 32px;
  background-color: #0e1014;
  box-shadow: 18px 8px 12px 0px rgba(8, 9, 16, 4);
`;

export const ButtonAdminContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  img {
    width: 90px;
    height: 90px;
    border-radius: 50%;
  }
`;

export const NavBar = styled.ul`
  border-radius: 6px;
  width: 550px;
  z-index: 99;
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  height: 50px;
  display: flex;
  align-items: center;
  background: #090a0d;
  justify-content: center;
  color: white;
  gap: 28px;
  box-shadow: 18px 8px 12px 0px rgba(8, 9, 16, 4);
`;

export const NavBarItem = styled.li`
  float: left;
  display: flex;
  gap: 2px;
  align-items: center;
  h4 {
    font-weight: bold;
  }
  &:hover {
    cursor: pointer;
  }
`;

export const NavBarWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const StyledAdminIcon = styled(AdminPanelSettingsIcon)`
  color: #565f82;
`;
export const StyledGroupsList = styled(GroupsIcon)`
  color: #565f82;
`;
export const StyledChatIcon = styled(ChatIcon)`
  color: #565f82;
`;
export const StyledDescriptionIcon = styled(DescriptionIcon)`
  color: #565f82;
`;
export const StyledGavelIcon = styled(GavelIcon)`
  color: #565f82;
`;

export const GroupTitle = styled.h3`
  color: white;
`;

export const GroupInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  gap: 24px;
`;

export const GroupInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 6px;
  div {
    width: 2px;
    height: 16px;
    background-color: black;
  }
`;

export const GroupImage = styled.img``;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 2;
  width: 100%;
`;
