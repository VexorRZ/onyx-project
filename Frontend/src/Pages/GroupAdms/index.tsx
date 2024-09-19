import React, { useState, useEffect, useRef, useCallback } from "react";
import api from "../../services/api";
import defaultProfilePic from "../../assets/images/default-profile-pic.png";
import { type AxiosResponse } from "axios";
import type { Group } from "../../Contexts/GroupContentContext/interfaces";
import { useParams } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import GroupContainer from "../../Containers/GroupContainer";
import TopBar from "../../Components/TopBar";
import defaultpic from "../../assets/images/default-pic.jpg";
import { members } from "../../Contexts/GroupContext/interfaces";
import CustomButton from "../../Components/Button";
import Loader from "../../Components/Loader";
import {
  TopicList,
  UserCard,
  UserCardPic,
  ButtonAreaWrapper,
  UserInfoWrapper,
  CustomEyeIcon,
  NoTopicsCard,
} from "./styles";

const GroupMembers = () => {
  const [group, setGroup] = useState<Group>();
  const [groupMembers, setMembers] = useState<members[]>([]);
  const [index, setIndex] = useState(2);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastData, setLastData] = useState<boolean>(false);

  const loaderRef = useRef(null);

  const { userData } = useAuth();

  const params = useParams();
  const { group_id } = params;

  const getMoreMembers = useCallback(async () => {
    if (!userData?.token) {
      return;
    }

    if (lastData === true) {
      return;
    }

    if (isLoading) {
      return;
    }

    setIsLoading(true);

    const res: AxiosResponse<Response> = await api.get<
      Response,
      AxiosResponse<Response>
    >(`/groupsmoderators/${group_id}?page=${index}&size=5`, {
      headers: { Authorization: `Bearer ${userData?.token}` },
    });

    console.log("resposta", res);
    if (res) {
      //@ts-expect-error
      if (res.data.moderators.length === 0 || !res.data.moderators) {
        setLastData(true);
        setIsLoading(false);
        return;
      } else {
        //@ts-ignore
        setMembers((prevMembers) => [...prevMembers, ...res.data.moderators]);
        console.log("index", index);
        setIndex((prevIndex) => prevIndex + 1);
        setIsLoading(false);
      }
    }

    setIsLoading(false);
  }, [index, isLoading]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        getMoreMembers();
      }
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [getMoreMembers]);

  useEffect(() => {
    const getGroupMembers = async () => {
      setIsLoading(true);
      try {
        const res: AxiosResponse<Response> = await api.get<
          Response,
          AxiosResponse<Response>
        >(`/groupsmoderators/${group_id}?page=${1}&size=${5}`, {
          headers: { Authorization: `Bearer ${userData?.token}` },
        });

        console.log("group", res.data);

        //@ts-expect-error
        setGroup({ ...res.data.groupExists });
        //@ts-expect-error
        setMembers(res.data.moderators);
      } catch (err) {
        return err;
      }
      setIsLoading(false);
    };
    getGroupMembers();
  }, []);

  return (
    <>
      <TopBar />
      <GroupContainer
        numberOfMembers={group?.moderators.length ? group.moderators.length : 0}
        groupName={group?.name ? group.name : ""}
        imageSrc={group?.avatar.path ? group.avatar.path : defaultpic}
        group_id={Number(group?.id)}
      >
        <TopicList>
          <h3>Members</h3>
          {groupMembers.map((member, index) => {
            return (
              <>
                <UserCard
                  ref={loaderRef}
                  key={index}
                  style={{
                    background: "#17191f",
                    boxShadow: "rgb(27, 29, 53) 5px 3px 7px 0px",
                    width: "550px",
                    alignItems: "center",
                  }}
                >
                  <UserInfoWrapper>
                    <UserCardPic
                      src={
                        member.avatar?.path
                          ? member.avatar?.path
                          : defaultProfilePic
                      }
                    />
                    <strong
                      style={{
                        color: "white",
                      }}
                    >
                      {member.name}
                    </strong>
                  </UserInfoWrapper>
                  <ButtonAreaWrapper>
                    <CustomButton width="124px" height="32px">
                      <CustomEyeIcon />
                      ver perfil
                    </CustomButton>
                  </ButtonAreaWrapper>
                </UserCard>
                {isLoading && <Loader />}
              </>
            );
          })}
          {lastData && (
            <NoTopicsCard>
              Não há moderadores para serem carregados
            </NoTopicsCard>
          )}
        </TopicList>
        {isLoading && <Loader />}
        <div ref={loaderRef} />
      </GroupContainer>
    </>
  );
};

export default GroupMembers;
