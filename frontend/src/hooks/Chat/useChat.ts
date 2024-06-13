import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { addAiChat } from "../../redux/ChatReducer";
import { increaseChatCount } from "../../redux/CatReducer";
import { useCatSave } from "../useCatSave";

const useChatSave = () => {
  const chat = useAppSelector((state) => state.chat);
  const postChatSave = async () =>
    await axios.post("/user/create/chat", {
      userReq: chat.chats[chat.length - 1].userReq,
      aiRes: chat.chats[chat.length - 1].aiRes,
    });
  const { mutate: mutateChatSave } = useMutation({
    mutationKey: ["chatSave"],
    mutationFn: postChatSave,
  });

  return { mutateChatSave };
};

export const useChat = () => {
  const chat = useAppSelector((state) => state.chat);
  const [chatText, setChatText] = useState<string>("");
  const dispatch = useAppDispatch();
  const { mutateChatSave } = useChatSave();
  const { mutateCatSave } = useCatSave();

  const postChat = () => axios.post("/api/chat", { text: chatText });

  const { mutate: mutateChat, isPending } = useMutation({
    mutationKey: ["chat"],
    mutationFn: postChat,
    onSuccess: (res) => {
      dispatch(addAiChat(res.data));
      dispatch(increaseChatCount());
      mutateChatSave(); //useChatSave hook 사용
      mutateCatSave(); //useCatSave hook 사용
    },
    onError: (err) => {
      console.error("useChat 에러", err);
    },
  });

  return {
    chat,
    dispatch,
    chatText,
    setChatText,
    mutateChat,
    isPending,
  };
};
