import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const GroupCardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 10px;
`;

export const UserCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  width: 600px;
  border-radius: 6px;
  box-shadow: 0vh;
  background-color: #25282e;
  border: 1px solid #526173;
  padding: 10px;
  box-shadow: 18px 19px 32px -11px rgba(0, 0, 0, 1);

  &:hover {
    cursor: pointer;
  }
`;

export const UserCardAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

export const UserdataArea = styled.div`
  display: flex;
  flex-direction: row;
`;

export const UserCardName = styled.h4`
  margin-left: 8px;
`;

export const CardGetUsers = styled.div`
  border: 1px solid rgb(86, 95, 130);
  border-radius: 5px;
  display: flex;
  margin: auto;
  margin-top: 20px;
  width: 506px;
  height: 180px;
  position: sticky;
  top: 85px;
  background-color: #0e1014;
  justify-content: center;
  align-items: center;
  box-shadow: 18px 8px 12px 0px rgba(8, 9, 16, 4);

  h2 {
    font-weight: bold;
    color: aquamarine;
  }
`;

export const UsersList = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 80em;
  gap: 12px;
  flex: 6;
  margin: auto;
  margin-top: 36px;
  align-items: center;
`;
