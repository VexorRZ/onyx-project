import styled from "styled-components";

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 20px;
`;

export const GroupCardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 10px;
`;

export const CardGetUsers = styled.div`
  border: 1px solid rgb(86, 95, 130);
  border-radius: 5px;
  display: flex;
  margin: auto;
  margin-top: 20px;
  margin-left: 22em;
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
  margin-left: 6em;
`;
