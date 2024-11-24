/* eslint-disable multiline-ternary */
import React, { useState, useEffect, useRef } from "react";
import { type AxiosResponse } from "axios";
import api from "../../services/api";
import useAuth from "../../Hooks/useAuth";

interface INotificationsProps {
  id: number;
  viewd?: boolean;
  author_id?: number;
  receiver_id?: number;
  type?: string;
  sender_name?: string;
}

const Notification = ({ type, sender_name, id }: INotificationsProps) => {
  const [viewd, setViewd] = useState(false);
  const notificationRef = useRef(null);

  const { userData } = useAuth();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        updateNotification();
      }
    });

    if (notificationRef.current) {
      observer.observe(notificationRef.current);
    }

    return () => {
      if (notificationRef.current) {
        observer.unobserve(notificationRef.current);
      }
    };
  }, []);

  const updateNotification = async () => {
    await api.put<AxiosResponse>(`notifications/${id}`, {
      headers: { Authorization: `Bearer ${userData.token}` },
    });
    setViewd(true);
  };

  let action = "";

  if (type === "like") {
    action = "curtiu";
  } else {
    action = "comentou";
  }

  return (
    <span
      ref={notificationRef}
      className="notification"
      style={{
        borderLeft: "1px solid rgb(86, 95, 130)",
        borderRight: "1px solid rgb(86, 95, 130)",
        borderRadius: " 4px",
      }}
    >{`${sender_name} ${action} seu comentário`}</span>
  );
};

export default Notification;
