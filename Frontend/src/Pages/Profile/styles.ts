import styled, { css } from "styled-components";
import { ReactComponent as CloseSvg } from "../../assets/icons/close-icon.svg";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

interface IContainerProps {
  bluried: boolean;
}

interface IProfileEditorContainerProps {
  width?: string;
  height?: string;
}

export const CustomEditIcon = styled(EditOutlinedIcon)`
  width: 16px !important;
  height: 16px !important;
  color: green;
`;

export const Container = styled.div<IContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  margin-top: 60px;
  width: 1400px;
  height: 65vh;
  border-radius: 6px;
  box-shadow: 0vh;
  background: #0e1014;
  color: #c3c8d6;

  padding: 10px;
  box-shadow: 18px 8px 12px 0px rgba(8, 9, 16, 4);
  filter: ${(props) => (props.bluried ? `blur(0.2rem)` : `blur(0.0rem)`)};
`;

export const CustomHeader = styled.header`
  width: 100%;
  background-color: #17191f;
  height: 100%;
  display: flex;
`;

export const ProfileText = styled.p`
  display: flex;
`;

export const UserAvatar = styled.div`
  width: 175px;
  height: 175px;
  border-radius: 50%;
  overflow: hidden;
  position: absolute;
  border: 6px solid #0e1014;
  left: 40px;
  top: 276px;

  .userAvatarHover {
    width: 175px;
    border-radius: 0%;
    background-color: green;
    opacity: 0.5;
    position: relative;
    gap: 6px;
    top: 100%;
    position: relative;
    transition: all 0.3s ease-out;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
  }

  &:hover {
    cursor: pointer;

    .userAvatarHover {
      top: 50%;
    }
  }
`;

export const Title = styled.h3`
  display: flex;
  color: #c3c8d6;
`;

export const UserInfo = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export const ProfiletextWrapper = styled.div``;

export const ProfileStatisticsColumn = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 6px;

  hr {
    border-top: 1px solid #bbb;
    width: 1px;
    margin-left: 10px;
  }
`;

export const StatisticProfileItem = styled.p`
  margin: 0;
  text-align: center;
  font-family: sans-serif;
  font-weight: 900;
  font-size: 13px;
  color: #c3c8d6;
`;

export const StatisticsItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 6px;
`;

export const ProfileStatisticsWrapper = styled.div`
  margin-top: 152px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 110px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: flex-end;
`;

export const ProfileEditorContainer = styled.div<IProfileEditorContainerProps>`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  background: #0e1014;
  box-shadow: 18px 8px 12px 0px rgba(8, 9, 16, 4);

  padding: 10px;
  box-shadow: 18px 19px 32px -11px rgba(0, 0, 0, 1);
  width: ${(props) => props.width ?? "600px"};
  height: ${(props) => props.height ?? "600px"};
  z-index: 900;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
`;

export const EditProfileFieldWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CloseIcon = styled(CloseSvg)`
  border-radius: 50px;

  &:hover {
    cursor: pointer;
    background-color: red;
  }
`;

export const CloseIconDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  z-index: 9999;
  width: 100%;
`;

export const DataArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 40px;
  margin-top: 80px;
`;
