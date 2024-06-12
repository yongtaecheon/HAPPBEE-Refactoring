import { useEffect, useRef } from "react";
import "./Chat.scss";
import { useChat } from "../../../hooks/Chat/useChat";
import { addUserChat } from "../../../redux/ChatReducer";

function ChatboxLoading() {
  return (
    <div className="chatbox-loading">
      <span className="spinner"></span>
      <span className="spinner"></span>
      <span className="spinner"></span>
    </div>
  );
}

function ChatContainer() {
  const { chat, isPending } = useChat();
  const renderChats = () => {
    const arr = [];
    for (let i = 0; i < chat.length; i++) {
      console.log(isPending);
      arr.push(
        <>
          <div className="chatbox-user" key={`user ${i}`}>
            {chat.chats[i].userReq}
          </div>
          {i === chat.length - 1 && isPending ? (
            <ChatboxLoading key={`loading ${i}`} />
          ) : (
            <div className="chatbox-ai" key={`ai ${i}`}>
              {chat.chats[i].aiRes}
            </div>
          )}
        </>
      );
    }
    return arr;
  };

  //새로운 채팅 렌더링 시 포커스
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (messageEndRef.current !== null) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat.length]);
  return (
    <>
      <article className="chat-container">
        <div className="chatbox-ai">
          안녕😸 나랑 편하게 얘기해보자.
          <br />
          힘든 일이 있다면 나에게 편하게 얘기해줘.
          <br />
          위로해줄게!
        </div>
        {renderChats()}
        <div ref={messageEndRef}></div>
      </article>
    </>
  );
}

function ChatInput() {
  const { dispatch, chatText, setChatText, mutateChat, isPending } = useChat();
  const handleChatButton = () => {
    if (!chatText) {
      alert("메시지를 입력해주세요.");
      return;
    }
    dispatch(addUserChat(chatText));
    mutateChat();
  };

  //엔터키 입력시 전송
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleChatButton();
  };

  //input 포커스
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current !== null) {
      if (isPending) inputRef.current.disabled = true; //ai response pending에는 비활성화
      else {
        inputRef.current.disabled = false;
        setChatText("");
      }
      // inputRef.current.focus(); //렌더링 시 input에 focus
    }
  }, [isPending, setChatText]);

  return (
    <>
      <div className="chat-input">
        <input
          placeholder="햅비와 대화해보세요."
          value={chatText}
          ref={inputRef}
          onChange={(e) => setChatText(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
        ></input>
        <button onClick={handleChatButton}>
          <span className="material-symbols-outlined">arrow_upward</span>
        </button>
      </div>
    </>
  );
}

export default function Chat() {
  return (
    <section className="chat">
      <ChatContainer />
      <ChatInput />
    </section>
  );
}
