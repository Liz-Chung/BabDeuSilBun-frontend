'use client';

import { Client, Stomp } from '@stomp/stompjs';
import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';

import Image from 'next/image';
import { useParams } from 'next/navigation';

import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import styled from 'styled-components';

import Header from '@/components/layout/header';
import MessageItem from '@/components/listItems/messageItem';
import MyMessageItem from '@/components/listItems/myMessageItem';
import { useInfiniteScroll } from '@/hook/useInfiniteScroll';
import { apiClientWithCredentials } from '@/services/apiClient';
import { getChatMessages } from '@/services/chatService';
import { getMyData } from '@/services/myDataService';
import Container from '@/styles/container';
import PaddingBox from '@/styles/paddingBox';
import { ChatMessageType } from '@/types/chatTypes';

const SOCKET_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}stomp`;

const ContainerBox = styled(Container)`
  background: var(--gray100);
  height: 100vh;
  display: flex;
  overflow: hidden;
`;

const ScrollContainer = styled.section`
  display: flex;
  flex-grow: 1;
  flex-direction: column-reverse;
  overflow-y: auto;
`;

const MessageWrapper = styled.div`
  padding: 1rem 0;
  display: flex;
  flex-direction: column-reverse;
  gap: 1.5rem;
`;

const NewMessageWrapper = styled.div`
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputBox = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  background: white;
  box-shadow: 1.48px 1.48px 7px var(--shadow);
  width: 100vw;
  padding: 1rem 1rem 3rem 1rem;

  input {
    width: 100%;
    padding: 0.5rem 2rem 0.5rem 1rem;
    border-radius: 50px 50px;
    background: var(--gray100);
  }

  button {
    position: absolute;
    right: 1.6rem;
    bottom: 3.5rem;
  }
`;

const ChatPage = () => {
  const params = useParams();
  const chatRoomId = params.chatRoomId as string;
  const queryClient = useQueryClient();
  const client = useRef<Client | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const [newMessages, setNewMessages] = useState<ChatMessageType[]>([]);
  const [inputValue, setInputValue] = useState('');

  const { data: myData } = useQuery({
    queryKey: ['MyData'],
    queryFn: getMyData,
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['chatMessages'] });
  }, [queryClient]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ['chatMessages', chatRoomId],
      queryFn: ({ pageParam = 0 }) =>
        getChatMessages({
          page: pageParam,
          chatRoomId: Number(chatRoomId),
        }),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        return lastPage.last ? undefined : lastPage.pageable.pageNumber + 1;
      },
      enabled: !!myData,
    });

  const lastElementRef = useInfiniteScroll<HTMLDivElement>({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    rootMargin: '100px 0px 0px 0px',
  });

  useEffect(() => {
    if (myData) {
      const socket = new SockJS(SOCKET_URL);
      client.current = Stomp.over(() => socket);

      const authToken =
        apiClientWithCredentials.defaults.headers.common.Authorization;

      client.current = new Client({
        webSocketFactory: () => socket,
        debug: (str) => {
          console.log(str);
        },
        connectHeaders: {
          Authorization: authToken as string,
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,

        onConnect: () => {
          console.log('입장하셨습니다.');

          client.current?.subscribe(
            `/meeting/chat-rooms/${chatRoomId}`,
            async (message) => {
              if (message.body) {
                const newMessage = JSON.parse(message.body);
                setNewMessages((prevMessages) => [...prevMessages, newMessage]);
              }
            },
          );
        },
        onStompError: (frame) => {
          console.error('STOMP client failed to connect:', frame);
        },
      });

      client.current.activate();

      return () => {
        if (client.current?.connected) {
          client.current.deactivate();
          console.log('STOMP client disconnected.');
        }
      };
    }
  }, [myData, chatRoomId]);

  // 새로운 메세지 전송 시 자동으로 아래로 이동
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [newMessages]);

  const sendMessage = async () => {
    if (myData && client.current) {
      if (!client.current.connected) {
        console.error('STOMP client is not connected.');
        return;
      }

      if (inputValue.trim() === '') {
        console.error('Input is empty.');
        return;
      }

      const message = {
        content: inputValue,
      };

      client.current.publish({
        destination: `/socket/chat-rooms/${chatRoomId}`,
        body: JSON.stringify(message),
      });

      setInputValue('');
    } else {
      console.error('STOMP client is not connected or input is empty.');
    }
  };

  return (
    <>
      <Header text="채팅" buttonLeft="back" />
      <ContainerBox>
        {status === 'pending' ? (
          <>로딩중</>
        ) : status === 'error' ? (
          <PaddingBox>문의 내역을 불러오지 못했습니다.</PaddingBox>
        ) : status === 'success' && myData ? (
          data && data.pages[0].content.length > 0 ? (
            <ScrollContainer ref={chatContainerRef}>
              <NewMessageWrapper>
                {newMessages.map((message) =>
                  message.senderId === myData?.userId ? (
                    <MyMessageItem message={message} key={message.createdAt} />
                  ) : (
                    <MessageItem message={message} key={message.createdAt} />
                  ),
                )}
              </NewMessageWrapper>
              {data.pages.map((page, pageIndex) => (
                <MessageWrapper key={pageIndex}>
                  {page.content.map((message, index) => (
                    <div
                      key={message.createdAt}
                      ref={
                        pageIndex === data.pages.length - 1 &&
                        index === page.content.length - 1
                          ? lastElementRef
                          : null
                      }
                    >
                      {message.senderId === myData?.userId ? (
                        <MyMessageItem message={message} />
                      ) : (
                        <MessageItem message={message} />
                      )}
                    </div>
                  ))}
                </MessageWrapper>
              ))}
            </ScrollContainer>
          ) : (
            <PaddingBox>
              대화가 시작되었습니다. 가장 먼저 인사를 나눠 보세요!
            </PaddingBox>
          )
        ) : null}
        <InputBox>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              const { key, nativeEvent } = e;
              if (key === 'Enter' && !nativeEvent.isComposing) {
                sendMessage();
              }
            }}
          />
          <button onClick={sendMessage}>
            <Image
              src="/sendMessage.svg"
              alt="메세지 전송 버튼"
              width="24"
              height="24"
            />
          </button>
        </InputBox>
      </ContainerBox>
    </>
  );
};

export default ChatPage;
