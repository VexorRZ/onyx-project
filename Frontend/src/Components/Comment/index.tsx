import React, { useState } from "react";
import TextEditor from "../../Containers/Editor";
import CustomButton from "../Button";


import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import DOMPurify from "dompurify";



import {
  CustomDeleteIcon,
  CustomEditIcon,
  EditorWrapper,
  EditToolsWrapper,
  Container,
  UserDataArea,
  LikeArea,
  BoxComment,
  CommentDetails,
  UserName,
  CreationDate,
  EditCommentWrapper,
} from "./styles";
import { AuthorAvatar } from "../PublicationComment/styles";

interface IcommmentProps {
  childrenDetailsWrapper?: React.ReactNode;
  key: number;
  onClick: () => void;
  onClickEdit: () => void;
  authorAvatar: string;
  authorName: string;
  createdAt?: Date;
  body: string;
  userIsAuthor?: boolean;
  children?: React.ReactNode;
}

const comment = ({
  key,
  onClick,
  authorAvatar,
  authorName,
  createdAt,
  body,
  userIsAuthor,
  children,
  onClickEdit,
}: IcommmentProps) => {
  const [wrapperVisible, setWrapperVisible] = useState(false);
  const [editContent, setEditContent] = useState(false);

  const formatCurrentDate = (date: Date) => {
    const dataDoRegistro = new Date("2023-01-01T00:00:00"); // Substitua pela data do seu registro
    const tempoPassado = formatDistanceToNow(dataDoRegistro, {
      addSuffix: true,
    });

    console.log(`Este registro existe há ${tempoPassado}.`);
  };
  return (
    <>
      <Container>
      <UserDataArea>
         <img className="userAvatar" src={authorAvatar}/>
         <CommentDetails className="commentDetails">
          <UserName  >{authorName}</UserName>
          <CreationDate className="creationDate">
          {formatDistanceToNow(createdAt ? createdAt : new Date(), {
                includeSeconds: true,
                addSuffix: true,
                locale: ptBR,
              })}
           </CreationDate>
           </CommentDetails>
        </UserDataArea>
       <BoxComment
          contentEditable={editContent}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(body),
          }}
       />
       <LikeArea>
        {children}
       </LikeArea>
      </Container>
      {userIsAuthor &&               
          <EditToolsWrapper>
               {editContent  && 
               
               <EditCommentWrapper>
               <TextEditor EditorText="Edite seu comentário" alignItems="center" width="100%" onChange={()=>{}}/>
               <CustomButton  width="210px" customBackgroundColor="transparent" customColor="cyan" customBorder="1px solid #373e4a">Editar</CustomButton>
               </EditCommentWrapper>
               }    

            <EditorWrapper title="Editar">
                    <CustomEditIcon
                      onClick={() => {
                        setEditContent(!editContent)
                      }}
                    >
                      Editar
                    </CustomEditIcon>
                  </EditorWrapper>
                  <EditorWrapper title="Deletar">
                    <CustomDeleteIcon
                      onClick={() => {
                        onClick()
                      }}
                    >
                      Deletar
                    </CustomDeleteIcon>
                  </EditorWrapper>
            
           </EditToolsWrapper>
          
         }
    </>
  );
};

export default comment;
