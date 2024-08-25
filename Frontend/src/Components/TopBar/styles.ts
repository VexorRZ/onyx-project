/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import styled from "styled-components";

interface ITopbarIconBadgeProps {
  isRingBell?: boolean;
}

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
