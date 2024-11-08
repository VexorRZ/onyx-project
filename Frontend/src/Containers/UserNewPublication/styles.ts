import styled from "styled-components";

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 200px;
  padding: 10px;
  border-radius: 8px;
  background: #0e1014;
  color: #c3c8d6;
  padding: 10px;
  box-shadow: 18px 8px 12px 0px rgba(8, 9, 16, 4);
`;

export const CardHeader = styled.header`
  display: flex;

  div {
    display: flex;
    flex-direction: column;
  }
`;

export const PublicationContent = styled.article`
  width: 600px;
  height: 400px;
`;

export const CardFooter = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 8px;
`;
