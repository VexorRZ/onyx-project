import React from "react";

import {
  Container,
  GroupCardHeader,
  GroupTitle,
  TopicList,
  GroupAvatar,
  GroupInfoArea,
  CardButton,
  InfoWrapper,
  ButtonArea,
  AmountWrapper,
  InfoText,
  StatusText,
  TitleAndStatus,
  CenterArea,
  StatusWrapper,
  NavBar,
  NavBarItem,
  GroupInfo,
  NavBarItemLabel,
  GroupDescription,
  ContentWrapper,
  NavBarItemNumber,
  StyleAdminIcon,
  StyledGroupsIcon,
  StyledChatIcon,
  StyledPublicIcon,
  StyledLockIcon,
} from "./styles";

interface IGrupoCardProps {
  onClickView?: () => void;
  onClickEnter: () => void;
  groupName?: string;
  numberOfMbembers?: number;
  children?: React.ReactNode;
  numberOfTopics?: number;
  groupImage?: string;
  isPrivate?: boolean;
  dialogIsVisible?: boolean;
  groupOwner?: string;
  groupStatus?: string;
  statusColor?: string;
  CardButtonTextEnter?: string;
  cardButtonTextEnterVisible?: boolean;
  ButtonViewGroupVisible?: boolean;
  CardButtonTextView?: string;
  marginLeft?: string;
  description?: string;
}

const NewGroupCard = ({
  children,
  groupName,
  numberOfMbembers,
  numberOfTopics,
  CardButtonTextEnter,
  cardButtonTextEnterVisible,
  ButtonViewGroupVisible,
  CardButtonTextView,
  groupImage,
  isPrivate,
  groupOwner,
  groupStatus,
  statusColor,
  marginLeft,
  description,
  onClickView,
  onClickEnter,
}: IGrupoCardProps) => {
  return (
    <Container marginLeft={marginLeft}>
      <GroupAvatar src={groupImage} />

      <ContentWrapper>
        <NavBar>
          <NavBarItem>
            <StyleAdminIcon />
            <NavBarItemLabel>
              Dono: <p>{groupOwner}</p>
            </NavBarItemLabel>
          </NavBarItem>
          <NavBarItem>
            <StyledGroupsIcon />
            <NavBarItemLabel>Membros</NavBarItemLabel>
            <NavBarItemNumber>
              <p>{numberOfMbembers}</p>
            </NavBarItemNumber>
          </NavBarItem>
          <NavBarItem>
            <StyledChatIcon />
            <NavBarItemLabel>Tópicos</NavBarItemLabel>
            <NavBarItemNumber>
              <p>{numberOfTopics}</p>
            </NavBarItemNumber>
          </NavBarItem>
          <NavBarItem>
            {groupStatus === "Público" ? (
              <StyledPublicIcon />
            ) : (
              <StyledLockIcon />
            )}
            <NavBarItemLabel>Grupo</NavBarItemLabel>
            <NavBarItemLabel statusColor={statusColor}>
              {groupStatus}
            </NavBarItemLabel>
          </NavBarItem>
        </NavBar>
        <GroupInfo>
          <GroupTitle>{groupName}</GroupTitle>
          <GroupDescription>{description}</GroupDescription>
        </GroupInfo>
        <ButtonArea>
          <CardButton
            onClick={onClickEnter}
            disabled={isPrivate}
            visible={cardButtonTextEnterVisible}
          >
            {CardButtonTextEnter}
          </CardButton>
          <CardButton onClick={onClickView} visible={ButtonViewGroupVisible}>
            {CardButtonTextView}
          </CardButton>
        </ButtonArea>
      </ContentWrapper>
    </Container>
  );
};

export default NewGroupCard;
