import React, { useCallback, useState } from "react";
import CustomButton from "../../Components/Button";
import TextEditor from "../Editor";
import Publication from "../Publication";
import { type Comments } from "../../Contexts/TopicContext/interfaces";
import useAuth from "../../Hooks/useAuth";
interface IEditorprops {
  onClickCustomButton?: () => void;
  onChangeText: (val: any) => void;
}
import {
  CardContainer,
  CardHeader,
  PublicationContent,
  CardFooter,
  Container,
} from "./styles";

const UserNewPublication = ({
  onClickCustomButton,
  onChangeText,
}: IEditorprops) => {
  const [publications, setPublications] = useState<Comments[]>([]);
  const [publicationBody, setPublicationBody] = useState("");

  const { userData } = useAuth();

  const changePublicationBody = useCallback(
    (value: any) => {
      setPublicationBody(value);
    },
    [publicationBody]
  );

  const createNewPublication = async () => {
    if (userData?.name) {
      setPublications([
        ...publications,
        {
          id: 0,
          author: {
            name: userData.name,
            id: Number(userData.id),
            avatar: { path: userData.avatar.path },
          },
          body: publicationBody,
          commentLikes: [],
        },
      ]);

      if (!userData.token) {
        throw new Error("Erro inesperado, token não fornecido");
      }
    } else {
      throw new Error("Erro inesperado, tente novamente");
    }
  };
  return (
    <Container>
      <CardContainer>
        <CardHeader>
          <div></div>
        </CardHeader>
        <PublicationContent />
        <CardFooter>
          <TextEditor
            onClickCustomButton={createNewPublication}
            alignItems="flex-start"
            width="100%"
            onChange={changePublicationBody}
          />
          {/* <div style={{ margin: "auto" }}>
            <CustomButton width="200px" onClick={createNewPublication}>
              postares
            </CustomButton>
          </div> */}
        </CardFooter>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        ></div>
      </CardContainer>
      {publications.map((publication, index) => {
        return (
          <Publication
            userAvatar={userData.avatar.path}
            userName={userData.name}
            body={publication.body}
            createdAt={new Date()}
          />
        );
      })}
    </Container>
  );
};

export default UserNewPublication;
