import styled from "styled-components";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

export const TopicList = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  gap: 12px;
  flex: 6;
  margin-top: 36px;
  align-items: center;
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
  background: rgb(23, 25, 31);
  box-shadow: rgb(27, 29, 53) 5px 3px 7px 0px;
  width: 550px;
  align-items: center;
  justify-content: space-between;
  padding: 10px;

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

export const ButtonAreaWrapper = styled.div`
  display: flex;
`;

export const UserInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

export const CustomEyeIcon = styled(RemoveRedEyeOutlinedIcon)`
  color: #565f82;
`;
