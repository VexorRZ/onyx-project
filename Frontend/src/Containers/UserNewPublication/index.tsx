import React, { useCallback, useState } from "react";

import TextEditor from "../Editor";

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

  return (
    <CardContainer>
      <CardHeader>
        <div></div>
      </CardHeader>
      <PublicationContent />
      <CardFooter>
        <TextEditor
          onChange={onChangeText}
          onClickCustomButton={onClickCustomButton}
        />
      </CardFooter>
    </CardContainer>
  );
};

export default UserNewPublication;
