import React from "react";

import { TopicList, UserCard, UserCardPic } from "./styles";
import defaultProfilePic from "../../assets/images/default-profile-pic.png";
import { type AxiosResponse } from "axios";

const GroupMembers = () => {
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

    const { group, numberOfTopics, isOwner } = res.data;
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
