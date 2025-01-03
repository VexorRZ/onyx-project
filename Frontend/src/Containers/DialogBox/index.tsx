import React from "react";
import { Container, OptionsWrapper, DialogText } from "./styles";
import CustomButton from "../../Components/Button";

interface IDialogBoxProps {
  onCancel: () => void;
  onConfirm: () => void;

  visible: boolean;
}

const DialogBox = ({ visible, onCancel, onConfirm }: IDialogBoxProps) => {
  return (
    <Container visible={visible}>
      <DialogText>
        Tem certeza de que deseja deletar esse grupo? Essa ação não poderá ser
        desfeita.
      </DialogText>
      <OptionsWrapper>
        <CustomButton
          customBorder="1px solid #373e4a"
          customBackgroundColor="transparent"
          customColor="cyan"
          width="130px"
          height="40px"
          onClick={() => {
            onConfirm();
          }}
        >
          Confirmar
        </CustomButton>
        <CustomButton
          customBorder="1px solid #373e4a"
          customBackgroundColor="transparent"
          customColor="red"
          width="130px"
          height="40px"
          onClick={() => {
            onCancel();
          }}
        >
          Cancelar
        </CustomButton>
      </OptionsWrapper>
    </Container>
  );
};

export default DialogBox;
