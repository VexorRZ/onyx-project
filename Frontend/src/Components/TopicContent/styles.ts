import styled from "styled-components";
import { Chat } from "@material-ui/icons";
interface ITopbarIconBadgeProps {
  isRingBell?: boolean;
}

interface ItopicContent {
  URlGroup?: boolean;
}

export const Container = styled.div<ItopicContent>`
  transition: transform 250ms;
  display: flex;
  flex:10;
  justify-content: space-around;
  align-items: center;
  border-radius: 6px;
  height: 120px;
  background-color: #17191F;
  min-height: 64px;

   &:hover {
    cursor: pointer;
    /* background-color: #303640;
    transition: all 0.2s ease-in;
    transition: ${(props) =>
      props.URlGroup ? " all 0.3s ease-in" : "all 0.2s ease-in"};
    transform: ${(props) =>
      props.URlGroup ? "translateX(4px)" : "translateY(-3px)"};
    background-color: #373e4a; */
  } 
`;

export const TopicName = styled.h4`
  width: 60%;
  margin: 0;
  color: #ebeff5;
  font-size: 15px;
  font-style: italic;
`;

export const NumberOfComments = styled.div`
  background-color: #ff0000;
  width: 19px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  border: solid 1px #3e4d60;

  &:hover {
    transition: all 0.2s ease-in;
    background-color: #fc4e4e;
  }
`;

export const CommentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 8px;
  flex: 2;
`;

export const TopbarIconteItem = styled.div`
  margin-right: 17px;
  cursor: pointer;
  position: relative;
  display: flex;
  
  flex-direction: column;
  align-items: center;
`;
export const TopbarIconBadge = styled.span<ITopbarIconBadgeProps>`
  width: 15px;
  height: 15px;
  background-color: red;
  opacity: 0.8;
  border-radius: 50%;
  color: black;
  position: absolute;
  top: -5px;
  right: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`;

export const ChatItem = styled(Chat)`
  color: #7e8cc7ff;
  opacity: 0.8;
`;

export const Comments = styled.div`
  color: #ebeff5;
`;

export const UserWrapper = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    height: 100%;
    background: #0e1014;
    border-radius: 6px;
    margin-left: 12px;
    padding-right: 18px;
`;

export const UserAvatar = styled.img`
width: 40px;
height: 40px;
border-radius: 50%;
border: 1px inherit #7e8cc7ff;
padding: 4px;
`;


export const AsideDataWrapper = styled.aside`
 border: 1px solid #373e4a;
 border-top: none;
 border-left: none;
margin-left: 28px;
display: flex;
flex: 8;
flex-direction: column;
width: 300px;
position: relative;
align-items: flex-start;
justify-content: center;
height: 100%;
padding: 6px 14px;
background: #0e1014;
border-radius: 6px;
border-top-left-radius: 0px;
strong {
  margin: 0;
  color: aquamarine;
}
`;




export const UserNameWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
.title{ 
 
  color: #7e8cc7ff;
}
`;

export const UserName = styled.strong`
 color: #fff;
`;
