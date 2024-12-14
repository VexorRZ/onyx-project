import React, { useEffect, useState, useCallback } from "react";
import TopBar from "../../Components/TopBar";
import useUsers from "../../Hooks/useUsers";
import useAuth from "../../Hooks/useAuth";
import defaultProfilePic from "../../assets/images/default-profile-pic.png";
import CustomButton from "../../Components/Button";
import useDebounce from "../../utils/Debounce";
import { type AxiosResponse } from "axios";
import api from "../../services/api";
import Loader from "../../Components/Loader";
import SideMenu from "../../Components/SideMenu";
import UserCard from "../../Components/UserCard";

import { type Users } from "../../Contexts/UsersContext/interfaces";

import { Container, Content, CardGetUsers, UsersList } from "./styles";

const UsersPage = () => {
  const [loadedUsers, setUsers] = useState<Users[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  const { userData } = useAuth();

  useEffect(() => {
    if (debouncedSearchTerm) {
      GetUsers();
    }
  }, [debouncedSearchTerm]);

  const GetUsers = async () => {
    try {
      setLoading(true);
      const res: AxiosResponse<Response> = await api.get<
        Response,
        AxiosResponse<Response>
      >(`users/${searchTerm}`, {
        headers: { Authorization: `Bearer ${userData.token}` },
      });

      if (Array.isArray(res.data)) {
        setUsers(res.data);
      }
    } catch (err) {
      return err;
    } finally {
      setLoading(false);
    }
  };

  const AddUser = async (userId: number, friendId: number) => {
    try {
      const res: AxiosResponse<Response> = await api.post<
        Response,
        AxiosResponse<Response>
      >(`friends/${userId}/${friendId}`, {
        headers: { Authorization: `Bearer ${userData.token}` },
      });

      if (Array.isArray(res.data)) {
        setUsers(res.data);
      }
    } catch (err) {
      return err;
    } finally {
      return true;
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    console.log(searchTerm);
  };

  const CurrentContent = () => {
    if (!loading && loadedUsers.length === 0) {
      return (
        <CardGetUsers>
          <h2>Busque usuários</h2>
        </CardGetUsers>
      );
    }

    if (loading) {
      return <Loader />;
    } else if (loadedUsers.length != 0) {
      return (
        <>
          <strong
            style={{
              color: "#fff",
            }}
          >
            Usuários encontrados
          </strong>
          <UsersList>
            {loadedUsers.map((user, index) => {
              return (
                <UserCard
                  onClickAdd={() => {
                    AddUser(Number(userData.id), Number(user.id));
                  }}
                  onClickView={() => {}}
                  avatar={
                    user.avatar?.path ? user.avatar?.path : defaultProfilePic
                  }
                  name={user.name}
                  index={index}
                />
              );
            })}
          </UsersList>
        </>
      );
    }
  };

  return (
    <>
      <TopBar onChange={handleChange} />
      <Container>
        <SideMenu />
        <Content>{CurrentContent()}</Content>
      </Container>
    </>
  );
};

export default UsersPage;
