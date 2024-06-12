import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { addAiChat } from "../../redux/ChatReducer";
import { increaseChatCount } from "../../redux/CatReducer";

const useChatSave = () => {
  const chat = useAppSelector((state) => state.chat);
  const postChatSave = () =>
    axios.post("/user/create/chat", {
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
  const postChat = () => axios.post("/api/chat", { text: chatText });
  const { mutate: mutateChat, isPending } = useMutation({
    mutationKey: ["chat"],
    mutationFn: postChat,
    onSuccess: (res) => {
      mutateChatSave(); //useChatSave hook 사용
      dispatch(addAiChat(res.data));
      dispatch(increaseChatCount());
    },
    onError: (res) => {
      console.log(res);
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
