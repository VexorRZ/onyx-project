import styled from "styled-components";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import DashboardIcon from "@mui/icons-material/SpaceDashboardRounded";

interface IContainerProps {
  position?: string;
}

interface ItemWrapperProps {
  width: string;
}
export const Container = styled.div<IContainerProps>`
  border: 1px solid rgb(86, 95, 130);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  margin-left: 18px;
  width: 300px;
  height: 258px;
  min-height: 258px;
  position: ${(props) => (props.position ? props.position : "sticky")};
  top: 85px;
  height: 100%;
  background-color: #0e1014;
  justify-content: space-evenly;
  box-shadow: 18px 8px 12px 0px rgba(8, 9, 16, 4);

  ::-webkit-scrollbar {
    width: 30px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const ItemWrapper = styled.div<ItemWrapperProps>`
  width: ${(props) => props.width};
  border: 1px solid #565f82;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 28px;
  justify-content: center;
  border-radius: 4px;
  transition: border 0.5s;
`;

export const StyledAccountCircleIcon = styled(AccountCircleIcon)`
  color: #565f82;
`;
export const StyledGroupsList = styled(GroupsIcon)`
  color: #565f82;
`;
export const StyledPersonIcon = styled(PersonIcon)`
  color: #565f82;
`;

export const StyledGroupAddIcon = styled(GroupAddIcon)`
  color: #565f82;
`;

export const StyledDashboardIcon = styled(DashboardIcon)`
  color: #565f82;
`;

export const ElementArea = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: 10px;

  :hover {
    ::after {
      content: "";
      width: 7px;
      height: 14px;
      color: green;
      background-color: green;
      opacity: 1;
      position: absolute;
      margin-left: 30px;
    }
  }

  ::after {
    content: "";
    width: 7px;
    height: 14px;
    color: green;
    background-color: green;
    opacity: 0;
    position: absolute;
    transition: opacity 1s ease;
    margin-left: 30px;
  }

  h6 {
    color: #ebeff5;
    font-family: sans-serif;
    transition: color 0.5s;
    margin: 0;
  }

  &:hover ${StyledGroupAddIcon} {
    color: green;
    transition: 1s;
  }

  &:hover ${StyledPersonIcon} {
    color: green;
    transition: 1s;
  }
  &:hover ${StyledGroupsList} {
    color: green;
    transition: 1s;
  }
  &:hover ${StyledAccountCircleIcon} {
    color: green;
    transition: 1s;
  }

  &:hover ${StyledDashboardIcon} {
    color: green;
    transition: 1s;
  }

  &:hover ${ItemWrapper} {
    cursor: pointer;
    color: green;
    border-color: #7b8296;

    h6 {
      color: green;
      margin: 0;
    }
  }
`;

export const GroupsList = styled.div``;
