import React, { useCallback, useState } from "react";
import CustomButton from "../../Components/Button";
import TextEditor from "../Editor";
import Publication from "../Publication";
interface IEditorprops {
  onClickCustomButton: () => void;
  onChangeText: (val: any) => void;
}
import {
  CardContainer,
  CardHeader,
  PublicationContent,
  CardFooter,
} from "./styles";

const UserNewPublication = ({
  onClickCustomButton,
  onChangeText,
}: IEditorprops) => {
  const [comment, setComment] = useState("");
  const [publications, setPublications] = useState([]);

  return (
    <CardContainer>
      <CardHeader>
        <div></div>
      </CardHeader>
      <PublicationContent />
      <CardFooter>
        <TextEditor onChange={onChangeText} />
        <div style={{ margin: "auto" }}>
          <CustomButton width="200px" onClick={onClickCustomButton}>
            postares
          </CustomButton>
        </div>
      </CardFooter>
    </CardContainer>
  );
};

export default UserNewPublication;
