import React, { useState, useEffect, useRef, useCallback } from "react";
import api from "../../services/api";
import defaultProfilePic from "../../assets/images/default-profile-pic.png";
import { type AxiosResponse } from "axios";
import type { Group } from "../../Contexts/GroupContentContext/interfaces";
import { useParams } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import GroupContainer from "../../Containers/GroupContainer";
import TopBar from "../../Components/TopBar";
import defaultpic from "../../assets/images/default-pic.jpg";
import { members } from "../../Contexts/GroupContext/interfaces";
import CustomButton from "../../Components/Button";
import Loader from "../../Components/Loader";
import { TextoContainer } from "./styles";

const GroupRules = () => {
  const [group, setGroup] = useState<Group>();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loaderRef = useRef(null);

  const { userData } = useAuth();

  const params = useParams();
  const { group_id } = params;

  useEffect(() => {
    const getGroupMembers = async () => {
      setIsLoading(true);
      try {
        const res: AxiosResponse<Response> = await api.get<
          Response,
          AxiosResponse<Response>
        >(`groups/${String(group_id)}`, {
          headers: { Authorization: `Bearer ${userData?.token}` },
        });

        //@ts-expect-error
        setGroup({ ...res.data.groupExists });
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        return err;
      }
      setIsLoading(false);
    };
    getGroupMembers();
  }, []);

  return (
    <>
      <TopBar />
      <GroupContainer
        numberOfMembers={group?.moderators.length ? group.moderators.length : 0}
        groupName={group?.name ? group.name : ""}
        imageSrc={group?.avatar.path ? group.avatar.path : defaultpic}
        group_id={Number(group?.id)}
      >
        <TextoContainer>
          <p>GroupInfo</p>
        </TextoContainer>
        {isLoading && <Loader />}
        <div ref={loaderRef} />
      </GroupContainer>
    </>
  );
};

export default GroupRules;
