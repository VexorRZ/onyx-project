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

import { type Users } from "../../Contexts/UsersContext/interfaces";

import {
  Container,
  UserCardAvatar,
  UserCardContainer,
  UserCardName,
  UserdataArea,
  CardGetUsers,
  UsersList,
} from "./styles";

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
        <UsersList>
          {loadedUsers.map((user, index) => {
            return (
              <>
                <UserCardContainer key={index}>
                  <UserdataArea>
                    <UserCardAvatar
                      src={
                        user.avatar?.path
                          ? user.avatar?.path
                          : defaultProfilePic
                      }
                      alt=""
                    />
                    <UserCardName>{user.name}</UserCardName>
                  </UserdataArea>
                  <CustomButton width="120px">Ver perfil</CustomButton>
                </UserCardContainer>
              </>
            );
          })}
        </UsersList>
      );
    }
  };

  return (
    <Container>
      <TopBar onChange={handleChange} />
      <SideMenu />

      {CurrentContent()}
    </Container>
  );
};

export default UsersPage;
