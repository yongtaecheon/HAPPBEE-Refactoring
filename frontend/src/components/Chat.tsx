import { useEffect, useRef, useState } from 'react';
import '../styles/Chat.scss';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { addAiChat, addUserChat } from '../redux/ChatReducer';
import { increaseChatCount } from '../redux/CatReducer';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

function ChatboxLoading() {
  return (
    <div className='chatbox-loading'>
      <span className='spinner'></span>
      <span className='spinner'></span>
      <span className='spinner'></span>
    </div>
  );
}

export default function Chat() {
  const chat = useAppSelector(state => state.chat);
  const [chatText, setChatText] = useState<string>('');
  const dispatch = useAppDispatch();

  const postChat = () => axios.post('/api/chat', { text: chatText }).then(res => res.data);
  const { mutate: mutateChat, isPending } = useMutation({
    mutationKey: ['chat'],
    mutationFn: postChat,
    onSuccess: (res) => {
      dispatch(addAiChat(res));
      dispatch(increaseChatCount());
    }
  })

  const handleChatButton = () => {
    if (!chatText) {
      alert('메시지를 입력해주세요.');
      return;
    }
    dispatch(addUserChat(chatText));
    mutateChat();
  }

  //엔터키 입력시 전송
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter')
      handleChatButton();
  }

  //새로운 채팅 렌더링 시 포커스
  const messageEndRef = useRef<HTMLDivElement|null>(null);
  useEffect(() => {
    if (messageEndRef.current !== null) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chat.user]);

  //input 포커스
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current !== null) {
      if (isPending)
        inputRef.current.disabled = true; //ai response pending에는 비활성화
      else {
        inputRef.current.disabled = false;
        setChatText('');
      }
      // inputRef.current.focus(); //렌더링 시 input에 focus
    }
  }, [isPending]);

  const renderChats = () => {
    const arr = [];
    for (let i = 0; i < chat.length; i++){
      arr.push(
        <>
          <div className='chatbox-user' key={`user ${i}`}>{chat.user[i]}</div>
          {i === chat.length - 1 ?
            (isPending ? <ChatboxLoading key={`loading ${i}`} /> : <div className='chatbox-ai' key={`ai ${i}`}>{chat.ai[i]}</div>)
            :(<div className='chatbox-ai' key={`ai ${i}`}>{chat.ai[i]}</div>)
          }
        </>
      );
    }
    return arr;
  }
  return (
    <section className='chat'>
      <article className='chat-container'>
        <div className='chatbox-ai'>안녕😸 나랑 편하게 얘기해보자.</div>
        {renderChats()}
        <div ref={messageEndRef}></div>
      </article>
      <div className='chat-input'>
        <input placeholder='햅비냥과 대화해보세요.' value={chatText} ref={inputRef} onChange={(e)=>setChatText(e.target.value)} onKeyDown={(e)=>handleKeyDown(e)}></input>
        <button onClick={handleChatButton}><span className='material-symbols-outlined'>arrow_upward</span></button>
      </div>
    </section>
  )
}