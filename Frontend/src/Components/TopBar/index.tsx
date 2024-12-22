/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useCallback } from "react";
import { Search } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { io } from "socket.io-client";
import defaultProfilePic from "../../assets/images/default-profile-pic.png";
import Notification from "../../Components/Notification";
import { notification } from "../../services/interfaces";
import api from "../../services/api";
import { type AxiosResponse } from "axios";
import { AsyncLogoutFn } from "../../Contexts/AuthContext/middlewares";
import { ToastMessage } from "../ToastContainer/ToastMessages";

import {
  Container,
  TopbarIconBadge,
  NotificationsContainer,
  StyledChatIcon,
  StyledNotificationsIcon,
  StyledSettingsIcon,
} from "./styles";
interface IinputProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface InotificationProps {
  type: number;
  sender_name: string;
}

const TopBar = ({ onChange }: IinputProps) => {
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState<notification[]>([]);
  const [newNotificationAmount, setNewNotificationsAmount] = useState(0);
  const [notificationsVisible, setnotificationsVisible] =
    useState<boolean>(false);

  const { dispatch, userData } = useAuth();

  useEffect(() => {
    getNotifications();
  }, [userData]);

  const getNotifications = async () => {
    const res: AxiosResponse = await api.get<AxiosResponse>(`notifications`, {
      headers: { Authorization: `Bearer ${userData.token}` },
    });
    const arrayData = res.data as notification[];
    const filteredArrayData = arrayData.filter(
      ({ viewed }) => viewed === false
    );
    setNotifications(filteredArrayData);
    setNewNotificationsAmount(filteredArrayData.length);
  };

  useEffect(() => {
    // @ts-expect-error
    setSocket(io("http://localhost:3333"));
  }, []);

  useEffect(() => {
    if (socket) {
      // @ts-expect-error
      socket.on("getNotification", (data: notification) => {
        setNotifications((prev) => [...prev, data]);
        setNewNotificationsAmount((prev) => {
          return prev + 1;
        });
        if (data.type === "like") {
          ToastMessage(
            `${data.sender_name} curtiu seu comentário no tópico  "${data.topic_name}" no grupo "${data.group_name}"`
          );
        }

        if (data.type === "CommentOnTopic") {
          ToastMessage(
            `${data.sender_name} comentou no seu tópico "${data.topic_name}" no grupo "${data.group_name}"`
          );
        }
      });
    }
  }, [socket]);

  const toggleNotifications = (value: boolean) => {
    setnotificationsVisible(value);
  };

  useEffect(() => {
    if (socket) {
      // @ts-expect-error
      socket.emit("newUser", userData);
    }
  }, [socket, userData]);

  const navigate = useNavigate();

  const Logout = () => {
    AsyncLogoutFn(dispatch);
    navigate("/");
  };

  const openProfilePage = () => {
    navigate("/profile");
  };

  const openDashboard = () => {
    navigate("/dashboard");
  };

  const generateProfilePic = useCallback(() => {
    if (userData.avatar !== null || userData.avatar || "") {
      return userData.avatar.path;
    } else {
      return defaultProfilePic;
    }
  }, []);

  return (
    <Container>
      <div className="topbarLeft">
        <span className="logo" onClick={openDashboard}>
          Onyx
        </span>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Buscar por grupos"
            onChange={onChange}
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <StyledChatIcon />
            <div>grupos</div>
          </div>
          <div className="topbarIconItem">
            <StyledNotificationsIcon
              onClick={() => {
                setnotificationsVisible(!notificationsVisible);
                setNewNotificationsAmount(0);
              }}
            />
            <div>notificações</div>
            <>
              {newNotificationAmount > 0 && (
                <TopbarIconBadge className="topbarIconBadge" isRingBell>
                  {newNotificationAmount}
                </TopbarIconBadge>
              )}
            </>

            {notificationsVisible && notifications.length > 0 && (
              <NotificationsContainer>
                {notifications.map((notification) => {
                  return (
                    <Notification
                      id={notification.id}
                      type={notification.type}
                      sender_name={notification.sender_name}
                    />
                  );
                })}
              </NotificationsContainer>
            )}
          </div>
          <div className="topbarIconItem">
            <StyledSettingsIcon />

            <div>Configurações</div>
          </div>
        </div>
        <img
          src={generateProfilePic()}
          alt="avatar"
          className="topbarImg"
          onClick={openProfilePage}
        />
        <h4 onClick={Logout} className="logout">
          sair
        </h4>
      </div>
    </Container>
  );
};

export default TopBar;
