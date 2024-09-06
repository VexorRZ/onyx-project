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

  const getGroupMembers = async () => {
    const res: AxiosResponse<Response> = await api.get<
      Response,
      AxiosResponse<Response>
    >(`/groupsmembers/${group_id}?page=${1}&size=${5}`, {
      headers: { Authorization: `Bearer ${userData?.token}` },
    });

    console.log("group", res.data);

    //@ts-expect-error
    setGroup({ ...res.data.groupExists });
    //@ts-expect-error
    setMembers(res.data.members);
  };

  useEffect(() => {
    getGroupMembers();
  }, []);

  const getMoreMembers = useCallback(async () => {
    if (!userData?.token) {
      return;
    }

    if (lastData) {
      return;
    }

    if (isLoading) {
      return;
    }

    setIsLoading(true);

    const res: AxiosResponse<Response> = await api.get<
      Response,
      AxiosResponse<Response>
    >(`/groupsmembers/${group_id}?page=${String(index)}&size=5`, {
      headers: { Authorization: `Bearer ${userData?.token}` },
    });

    if (res) {
      console.log("resposta adicional", res);
      //@ts-expect-error
      if (res.data.members.length === 0 || !res.data) {
        setLastData(true);
        setIsLoading(false);
        return;
      } else {
        //@ts-ignore
        setMembers((prevMembers) => [...prevMembers, ...res.data.members]);

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

  return (
    <>
      <TopBar />
      <GroupContainer
        numberOfMembers={group?.members.length ? group.members.length : 0}
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
        </TopicList>
        <div ref={loaderRef} />
      </GroupContainer>
    </>
  );
};

export default GroupMembers;
