import styled from "styled-components";

export const Container = styled.div`
  padding: 18px;
  display: flex;
  flex-direction: column;
  width: 900px;
  background: #0e1014;
  color: #c3c8d6;
  box-shadow: 18px 8px 12px 0px rgba(8, 9, 16, 4);
  border: 1px solid rgb(86, 95, 130);
  border-radius: 10px;
  gap: 8px;

  .publicationHeader {
    display: flex;
    align-items: center;
    gap: 8px;

    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }

    .publicationData {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      gap: 12px;
      .userName {
        font-size: 14px;
        margin: 0;
      }
      .date {
        font-size: 12px;
        font-weight: bold;
      }
    }

    .publicationBody {
      width: 600px;
      min-height: 300px;
      background: #17191f !important;
    }
  }
`;
