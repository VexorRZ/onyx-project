import React, { useState } from "react";
import Dropzone from "../../Components/DropZone";
import CloseIcon from "../../Components/CloseIcon";
import FormControlLabel, {
  type FormControlLabelProps,
} from "@mui/material/FormControlLabel";
import PublicIcon from "@mui/icons-material/Public";
import CustomButton from "../../Components/Button";
import CustomInput from "../../Components/Input";
import LockIcon from "@mui/icons-material/Lock";
import Radio from "@mui/material/Radio";
import { useRadioGroup } from "@mui/material/RadioGroup";
import { styled } from "@mui/material/styles";
import {
  GroupEditorContainer,
  CloseIconDiv,
  DataArea,
  EditProfileFieldWrapper,
  StyledRadioGroup,
  CardOptions,
} from "./styles";

interface IGroupContainEditorProps {
  groupName: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickRadioPrivate: () => void;
  onClickRadioPublic: () => void;
  onClickEditGroup: () => void;
  onClickToggleEditGroup: (param: boolean) => void;
}
interface StyledFormControlLabelProps extends FormControlLabelProps {
  checked: boolean;
}

const StyledFormControlLabel = styled((props: StyledFormControlLabelProps) => (
  <FormControlLabel {...props} />
))(({ theme, checked }) => ({
  ".MuiFormControlLabel-label": checked && {
    color: theme.palette.primary.main,
  },
}));

function MyFormControlLabel(props: FormControlLabelProps) {
  const radioGroup = useRadioGroup();

  let checked = false;

  if (radioGroup) {
    checked = radioGroup.value === props.value;
  }

  return <StyledFormControlLabel checked={checked} {...props} />;
}

const GroupContainerEditor = ({
  groupName,
  onChange,
  onClickRadioPrivate,
  onClickRadioPublic,
  onClickEditGroup,
  onClickToggleEditGroup,
}: IGroupContainEditorProps) => {
  const [profileImage, setProfileImage] = useState<File[]>([]);
  return (
    <>
      <GroupEditorContainer>
        <CloseIconDiv>
          <CloseIcon onClick={onClickToggleEditGroup} />
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
              onChange={onChange}
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
              <PublicIcon
                style={{
                  color: "green",
                }}
              />
              <MyFormControlLabel
                value="first"
                label="público"
                style={{
                  color: "white",
                }}
                control={
                  <Radio
                    onClick={() => {
                      onClickRadioPrivate;
                    }}
                  />
                }
              />
              <span className="option-description">
                (Qualquer pessoa poderá visualizar o conteúdo do grupo)
              </span>
            </div>
            <div className="radio-options">
              <LockIcon
                style={{
                  color: "red",
                }}
              />
              <MyFormControlLabel
                value="second"
                label="privado"
                style={{
                  color: "white",
                }}
                control={
                  <Radio
                    onClick={() => {
                      onClickRadioPublic;
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
          customBackgroundColor="transparent"
          customBorder="1px solid #373e4a"
          customColor="cyan"
          onClick={() => {
            onClickEditGroup;
          }}
        >
          Alterar dados
        </CustomButton>
      </GroupEditorContainer>
    </>
  );
};

export default GroupContainerEditor;
