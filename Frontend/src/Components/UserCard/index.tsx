import React from "react";
import {
  UserCardContainer,
  UserCardAvatar,
  UserCardName,
  UserdataArea,
  ButtonArea,
} from "./styles";
type UserCard = {
  index: number;
  avatar: string;
  name: string;
  onClickAdd: () => void;
  onClickView: () => void;
};
import CustomButton from "../Button";

const UserCard = ({
  index,
  avatar,
  name,
  onClickAdd,
  onClickView,
}: UserCard) => {
  return (
    <UserCardContainer key={index}>
      <UserdataArea>
        <UserCardAvatar src={avatar} alt="" />
        <UserCardName>{name}</UserCardName>
      </UserdataArea>
      <ButtonArea>
        <CustomButton
          width="120px"
          customBackgroundColor="#14161c"
          customColor="lime"
          onClick={onClickAdd}
        >
          Adicionar
        </CustomButton>
        <CustomButton
          width="120px"
          customBackgroundColor="#14161c"
          customColor="aquamarine"
          onClick={onClickView}
        >
          Ver perfil
        </CustomButton>
      </ButtonArea>
    </UserCardContainer>
  );
};

export default UserCard;
