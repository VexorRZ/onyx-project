import React, { useState } from "react";
import api from "../../services/api";
import { TopicList, UserCard, UserCardPic } from "./styles";
import defaultProfilePic from "../../assets/images/default-profile-pic.png";
import { type AxiosResponse } from "axios";
import type { Group } from "../../Contexts/GroupContentContext/interfaces";
import { useParams } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import GroupContainer from "../../Containers/GroupContainer";

const GroupMembers = () => {
  const [group, setGroup] = useState<Group>();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(5);

  const { userData } = useAuth();

  const params = useParams();
  const { group_id } = params;

  const getGroupMembers = async () => {
    const res: AxiosResponse<Response> = await api.get<
      Response,
      AxiosResponse<Response>
    >(
      `groups/${Number(group_id)}?page=${Number(currentPage)}&size=${Number(
        limit
      )}`,
      {
        headers: { Authorization: `Bearer ${userData?.token}` },
      }
    );

    const {} = res.data;
  };
  return (
    <GroupContainer
      numberOfMembers={group?.members.length ? group?.members.length : 0}
      groupName={group?.name ? group.name : ""}
      imageSrc={group?.avatar.path ? group.avatar.path : ""}
      group_id={Number(group?.id)}
    >
      <TopicList>
        {group?.members?.map((member, index) => {
          return (
            <UserCard key={index}>
              <UserCardPic
                src={
                  member.avatar?.path ? member.avatar?.path : defaultProfilePic
                }
              />
              <strong>{member.name}</strong>
            </UserCard>
          );
        })}
      </TopicList>
    </GroupContainer>
  );
};

export default GroupMembers;
