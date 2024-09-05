import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { TopicList, UserCard, UserCardPic } from "./styles";
import defaultProfilePic from "../../assets/images/default-profile-pic.png";
import { type AxiosResponse } from "axios";
import type { Group } from "../../Contexts/GroupContentContext/interfaces";
import { useParams } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import GroupContainer from "../../Containers/GroupContainer";
import TopBar from "../../Components/TopBar";
import defaultpic from "../../assets/images/default-pic.jpg";
import { members } from "../../Contexts/GroupContext/interfaces";

const GroupMembers = () => {
  const [group, setGroup] = useState<Group>();
  const [groupMembers, setMembers] = useState<members[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(5);

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

  return (
    <>
      <TopBar />
      <GroupContainer
        numberOfMembers={0}
        groupName={group?.name ? group.name : ""}
        imageSrc={group?.avatar.path ? group.avatar.path : defaultpic}
        group_id={Number(group?.id)}
      >
        <TopicList>
          <h3>Members</h3>
          {groupMembers.map((member, index) => {
            return (
              <UserCard
                key={index}
                style={{
                  background: "transparent",
                  border: "1px solid white",
                }}
              >
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
              </UserCard>
            );
          })}
        </TopicList>
      </GroupContainer>
    </>
  );
};

export default GroupMembers;
