import styled from "styled-components";
import SendIcon from "@mui/icons-material/Send";

export const StyledSendIcon = styled(SendIcon)`
  color: #3cb371;
`;

export const Container = styled.div`
  padding: 18px;
  display: flex;
  flex-direction: column;
  width: 600px;
  height: 100%;
  background: #0e1014;
  color: #c3c8d6;
  box-shadow: 18px 8px 12px 0px rgba(8, 9, 16, 4);
  border: 1px solid rgb(86, 95, 130);
  border-radius: 10px;
  gap: 8px;
  margin-top: 30px;

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
  }
  .publicationBody {
    width: 95%;
    padding: 14px;
    min-height: 100px !important;
    background: #17191f !important;
    border-radius: 6px;
    display: flex;
    justify-content: flex-start;
    word-break: break-all;
  }
  .commentBox {
    height: 33px;
    width: 31.5em;
    background: white;
    padding-top: 1px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .iconWrapper {
      height: 100%;
      display: flex;
      align-items: center;

      &:hover {
        color: #7df0b0;
        cursor: pointer;
      }
    }

    .inputComment {
      width: 93%;
      height: 25px;
      border: none;

      &:focus {
        outline: none;
        border: none;
      }
    }
  }
`;
