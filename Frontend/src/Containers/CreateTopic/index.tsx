import React, { useState, useCallback } from "react";
// import { closeEsc } from "../../utils/HandlesHelpers";
import { type AxiosResponse } from "axios";
import { type Topics } from "../../services/interfaces";
import api from "../../services/api";
import CustomInput from "../../Components/Input";
import CustomButton from "../../Components/Button";
import { useNavigate } from "react-router-dom";
import {
  Container,
  CloseIconDiv,
  CloseIcon,
  CustomSelect,
  CustomOption,
} from "./styles";

interface IcreateTopic {
  onClick: () => void;
  closeEsc?: () => void;
  groupId: string;
}

const CreateTopic = ({ onClick, groupId }: IcreateTopic) => {
  const [topicName, setTopicName] = useState<string>("");
  const [isClosed, setIsclosed] = useState<string>("false");

  const navigate = useNavigate();

  const changeGroupname = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      event.preventDefault();
      setTopicName(event.currentTarget.value);
    },
    [topicName]
  );

  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const value = event.target.value;
    setIsclosed(value);
  };

  const createTopic = async (event: any) => {
    event.preventDefault();
    const token = localStorage.getItem("@token");

    if (!token) {
      throw new Error("Erro inesperado, token não fornecido");
    }

    try {
      const res: AxiosResponse<Topics> = await api.post<
        Topics,
        AxiosResponse<Topics>
      >(`topics/${Number(groupId)}`, {
        headers: { Authorization: `Bearer ${token}` },
        name: topicName,
        is_closed: Boolean(isClosed),
      });

      navigateToCreatedTopic(res.data.id);
    } catch (err) {}
  };

  const navigateToCreatedTopic = (topicId: number) => {
    navigate(`/topics/${Number(groupId)}/${topicId}`);
  };
  return (
    <Container id={groupId}>
      <CloseIconDiv>
        <CloseIcon onClick={onClick} />
      </CloseIconDiv>
      <CustomInput
        type="text"
        value={topicName}
        placeHolder="Digite o nome do tópico"
        onChange={changeGroupname}
      />
      <CustomSelect name="selectGroup" onChange={selectChange}>
        <CustomOption selected disabled>
          Escolha uma opção
        </CustomOption>
        <CustomOption value="false">aberto </CustomOption>
        <CustomOption value="true">fechado </CustomOption>
      </CustomSelect>
      <CustomButton
        onClick={createTopic}
        customBackgroundColor="transparent"
        opacity={0.7}
        customColor="green"
        height="64px"
        width="180px"
        customBorder="1px solid #373e4a"
      >
        Criar
      </CustomButton>
    </Container>
  );
};

export default CreateTopic;
