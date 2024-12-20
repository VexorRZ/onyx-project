import React from "react";


import {
  Container,
  TopicName,
  CommentWrapper,
  TopbarIconteItem,
  TopbarIconBadge,
  ChatItem,
  Comments,
  UserAvatar,
  UserName,
  UserWrapper,
  AsideDataWrapper,
  UserNameWrapper,
} from "./styles";

interface ITopicContentProps {
  topicName: string;
  numberOfComments: number | string;
  URlGroup?: boolean;
  userName: string;
  userAvatar: string;
  onClick?: () => void;
}

const TopicContent = ({
  topicName,
  numberOfComments,
  URlGroup,
  userAvatar,
  userName,
  onClick,
}: ITopicContentProps) => {
  return (
    <Container URlGroup={URlGroup} onClick={onClick}>
      <UserWrapper>

       <UserAvatar src={userAvatar}/>
       <UserNameWrapper>
        <strong className="title">Author:</strong>
       <UserName>{userName}</UserName>
       </UserNameWrapper>
      </UserWrapper>
    <AsideDataWrapper>
      <strong>Assunto: </strong>
      <TopicName>{topicName}</TopicName>
      </AsideDataWrapper>
      <CommentWrapper>
        <TopbarIconteItem className="topbarIconItem">
          <ChatItem />
          <TopbarIconBadge className="topbarIconBadge">
            {numberOfComments}{" "}
          </TopbarIconBadge>
          <Comments>comentários</Comments>
        </TopbarIconteItem>
      </CommentWrapper>
    </Container>
  );
};

export default TopicContent;
