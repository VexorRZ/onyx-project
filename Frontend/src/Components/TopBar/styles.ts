/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import styled, { keyframes } from "styled-components";
import { Search, Chat, Notifications, Settings } from "@material-ui/icons";

interface ITopbarIconBadgeProps {
  isRingBell?: boolean;
}

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(180deg);
  }
`;

const shake = keyframes`
  0%
  {
   transform: rotate(-20deg);
  }
  20%
  {
    transform: rotate(20deg);
  }
  40%
  {
     transform: rotate(-20deg);
  }
  60%
  {
    transform: rotate(20deg);
  }
  80%
  {
    transform: rotate(-20deg);
  }
  100%
  {
    transform: rotate(0deg);
  }

`;

export const StyledChatIcon = styled(Chat)`
  color: #7e8cc7ff;
`;
export const StyledNotificationsIcon = styled(Notifications)`
  color: #7e8cc7ff;
  &:hover {
    animation: ${shake} 0.7s linear;
  }
`;
export const StyledSettingsIcon = styled(Settings)`
  color: #7e8cc7ff;

  &:hover {
    animation: ${rotate} 0.4s linear;
  }
`;
export const StyledSearchIcon = styled(Search)``;

export const Container = styled.div`
  height: 64px;
  width: 100%;
  background-color: #0e1014;
  display: flex;
  align-items: center;
  top: 0;
  z-index: 999;
  border-radius: 6px;
  position: sticky;
  box-shadow: 18px 8px 12px 0px rgba(8, 9, 16, 4);

  .topbarLeft {
    flex: 3;

    .logo {
      font-size: 24px;
      margin-left: 20px;
      font-weight: bold;
      color: white;
      cursor: pointer;
    }
  }

  .topbarCenter {
    flex: 4;

    .searchbar {
      width: 100%;
      height: 30px;
      background-color: #7b8296;
      border-radius: 6px;
      display: flex;
      align-items: center;
      color: black;

      .searchIcon {
        font-size: 20px !important;
        margin-left: 10px;
      }
      .searchInput {
        border: none;
        width: 70%;
        background-color: #7b8296;
      }
      .searchInput:focus {
        outline: none;
      }
    }
  }

  .topbarRight {
    flex: 4;
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: white;

    h4 {
      &:hover {
        text-decoration: underline;
      }
    }

    .topbarLink {
      margin-right: 10px;
      font-size: 14px;
      cursor: pointer;
    }

    .topbarIcons {
      display: flex;

      .topbarIconItem {
        margin-right: 17px;
        cursor: pointer;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }
    .topbarImg {
      width: 55px;
      height: 55px;
      border-radius: 50%;
      object-fit: cover;
      cursor: pointer;
    }
    .logout {
      &:hover {
        cursor: pointer;
      }
    }
  }
`;

export const TopbarIconBadge = styled.span<ITopbarIconBadgeProps>`
  width: 15px;
  height: 15px;
  background-color: red;
  border-radius: 50%;
  color: white;
  position: absolute;
  top: -5px;
  right: ${(props) => (props.isRingBell ? "24px" : "5px")};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`;

export const NotificationsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  color: black;
  position: absolute;
  top: 57px;
  width: 227px;
  padding: 4px;
  gap: 2px;
  border-radius: 4px;
  //background-color: #0e1014;

  ::after,
  ::before {
    bottom: 100%;
    left: 50%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }

  ::after {
    border-color: rgba(238, 238, 238, 0);
    border-bottom-color: #eeeeee;
    border-width: 15px;
    margin-left: -15px;
  }

  ::before {
    border-color: rgba(204, 204, 204, 0);
    border-bottom-color: #cccccc;
    border-width: 16px;
    margin-left: -16px;
  }
`;
