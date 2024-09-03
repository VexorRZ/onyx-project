import React from "react";
import Dropzone from "../../Components/DropZone";
import CloseIcon from "../../Components/CloseIcon";
import FormControlLabel, {
  type FormControlLabelProps,
} from "@mui/material/FormControlLabel";
import PublicIcon from "@mui/icons-material/Public";

import { Container } from "./styles";

export const GroupEditorContainer = styled.div<IProfileEditorContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  background-color: #25282e;
  border: 1px solid #526173;
  padding: 10px;
  box-shadow: 18px 19px 32px -11px rgba(0, 0, 0, 1);
  width: ${(props) => props.width ?? "600px"};
  height: ${(props) => props.height ?? "600px"};
  z-index: 900;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
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
  background-color: #25282e;
  border: solid 1px white;
  padding: 10px;
`;

function MyFormControlLabel(props: FormControlLabelProps) {
  const radioGroup = useRadioGroup();

  let checked = false;

  if (radioGroup) {
    checked = radioGroup.value === props.value;
  }

  return <StyledFormControlLabel checked={checked} {...props} />;
}

const GroupContainerEditor: React.FC = () => {
  return (
    <>
      <GroupEditorContainer>
        <CloseIconDiv>
          <CloseIcon
            onClick={() => {
              toggleEditGroupBox(false);
            }}
          />
        </CloseIconDiv>
        <Dropzone
          previewMessage="Selecione a sua nova foto de perfil.."
          files={profileImage}
          onDrop={(acceptedImage) => {
            setProfileImage(
              acceptedImage.map((file) =>
                Object.assign(file, {
                  preview: URL.createObjectURL(file),
                })
              )
            );
          }}
        />
        <DataArea>
          <EditProfileFieldWrapper>
            <CustomInput
              type="text"
              value={groupName}
              placeHolder="Alterar Nome"
              onChange={changeGroupname}
            />
          </EditProfileFieldWrapper>
        </DataArea>
        <CardOptions>
          <StyledRadioGroup
            radioActive={true}
            name="use-radio-group"
            defaultValue="first"
          >
            <div className="radio-options">
              <PublicIcon />
              <MyFormControlLabel
                value="first"
                label="público"
                control={
                  <Radio
                    onClick={() => {
                      setOption(false);
                    }}
                  />
                }
              />
              <span className="option-description">
                (Qualquer pessoa poderá visualizar o conteúdo do grupo)
              </span>
            </div>
            <div className="radio-options">
              <LockIcon />
              <MyFormControlLabel
                value="second"
                label="privado"
                control={
                  <Radio
                    onClick={() => {
                      setOption(true);
                    }}
                  />
                }
              />

              <span className="option-description">
                (Somente membros poderão ver o conteúdo do grupo)
              </span>
            </div>
          </StyledRadioGroup>
        </CardOptions>
        <CustomButton
          onClick={() => {
            void editGroup();
          }}
        >
          Alterar dados
        </CustomButton>
      </GroupEditorContainer>
    </>
  );
};

export default GroupContainerEditor;
