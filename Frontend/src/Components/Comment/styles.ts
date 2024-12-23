import styled from "styled-components";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

export const Container = styled.div`
border: 2px solid #17191f;
padding: 10px;
display: flex;
flex-direction: column;
color: #fff;
border-radius: 8px;
gap: 10px;
`;



export const UserDataArea = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    background: #17191F;
    width: 20%;
    padding: 5px;
    border-radius: 8px;

 .userAvatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
 }

`;

export const CommentDetails = styled.div`
   display: flex;
  flex-direction: column;
`;

export const UserName = styled.strong`
color: #fff;

`;

export const CreationDate  = styled.data`
color: lime;

`;


export const LikeArea = styled.div`
display: flex;
justify-content: flex-end;
`;

export const BoxComment = styled.div`
display: flex;
width: 98%;
min-height: 70px;
max-height: 400px;
border: 1px solid #17191f;
padding: 8px;
`;

export const EditToolsWrapper = styled.div`
display: flex;
justify-content: flex-end;
gap: 4px;

`;

export const EditorWrapper = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1px;
  border: 0.5px solid rgb(86, 95, 130);
  border-radius: 4px;
  :hover {
    cursor: pointer;
  }
`;


export const CustomEditIcon = styled(EditOutlinedIcon)`
  width: 16px !important;
  height: 16px !important;
  color: green;
`;

export const CustomDeleteIcon = styled(DeleteOutlineOutlinedIcon)`
  width: 16px !important;
  height: 16px !important;
  color: red;
`;

