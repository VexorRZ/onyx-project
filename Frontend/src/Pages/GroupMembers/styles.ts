import styled from "styled-components";

export const TopicList = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  gap: 8px;
  flex: 6;
  margin-top: 36px;
`;

export const UserCard = styled.div`
  display: flex;
  flex-direction: row;
  width: 313px;
  height: 54px;
  background-color: #373e4a;
  border-radius: 4px;
  padding: 4px;
  gap: 10px;

  strong {
    font-size: 14px;
  }
`;

export const UserCardPic = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid;
  padding: 1px;
`;
