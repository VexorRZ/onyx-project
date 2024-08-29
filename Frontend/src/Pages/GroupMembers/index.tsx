import React, { useState } from "react";
import api from "../../services/api";
import { TopicList, UserCard, UserCardPic } from "./styles";
import defaultProfilePic from "../../assets/images/default-profile-pic.png";
import { type AxiosResponse } from "axios";
import type { Group } from "../../Contexts/GroupContentContext/interfaces";
import { useParams } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

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
    <>
      <div>members</div>

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
    </>
  );
};

export default GroupMembers;
