import styled from "styled-components";
import RadioGroup from "@mui/material/RadioGroup";

interface IProfileEditorContainerProps {
  width?: string;
  height?: string;
}

export const GroupEditorContainer = styled.div<IProfileEditorContainerProps>`
  top: 8em;
  display: flex;
  border-radius: 6px;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  background-color: #0e1014;
  padding: 10px;
  box-shadow: 18px 19px 32px -11px rgba(0, 0, 0, 1);
  width: ${(props) => props.width ?? "600px"};
  height: ${(props) => props.height ?? "600px"};
  z-index: 900;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  border: 1px solid #373e4a;
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

export const EditProfileFieldWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

interface IStyledRadioGroupProps {
  radioActive: boolean;
}

export const StyledRadioGroup = styled(RadioGroup)<IStyledRadioGroupProps>`
  display: flex !important;
  flex-direction: row !important;
  align-items: center !important;
  gap: 21px !important;
  justify-content: flex-start !important;

  .option-description {
    font-size: 10px;
    color: ${(props) => (props.radioActive ? "#1976d2" : "#fff")};
  }
  .radio-options {
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 6px;
    padding: 2px;
    &:hover {
      background-color: #373e4a;
    }
  }

  .css-17yyoxz-MuiFormControlLabel-root {
    margin-left: 0px !important;
  }
  .css-1yyanpp-MuiFormControlLabel-root {
    margin-left: 0px !important;
  }
`;

export const CardOptions = styled.div`
  height: 112px;
  width: 339px;
  display: flex;
  flex-direction: column;
  background-color: #0e1014;
  border: 1px solid #373e4a;
  padding: 10px;
`;
