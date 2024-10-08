'use client';

import { useEffect } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';

import Header from '@/components/layout/header';
import { handleSignOut } from '@/services/auth/signInService';
import { getMyData } from '@/services/myDataService';
import { RoundBtnFilled } from '@/styles/button';
import Container from '@/styles/container';

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 100%;
  width: 48px;
  height: 48px;
  background: var(--primary);
  position: relative;
`;

const Flexbox = styled.div`
  display: flex;
  padding: 1rem;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const CenterContainer = styled.div`
  flex: 1;
`;

const Nickname = styled.h1`
  font-weight: var(--font-semi-bold);
  font-size: var(--font-size-lg);
`;

const AddressButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: var(--font-size-sm);
`;

const ListContainer = styled.ul`
  border: 0.1rem solid var(--gray200);
  border-radius: var(--border-radius-lg);
  margin: 1rem;
  overflow: hidden;
`;

const ListItem = styled.li<{ $isLast?: boolean }>`
  display: flex;
  padding: 1rem;
  cursor: pointer;
  justify-content: space-between;
  border-bottom: ${(props) =>
    props.$isLast ? '' : '0.1rem solid var(--gray200)'};
`;

const ListButton = styled.div.attrs({
  className: 'icon',
})`
  word-spacing: 3px;
  padding: 1rem;
  margin: -1rem;
`;

const LogoutButton = styled.button`
  justify-self: end;
  font-weight: var(--font-semi-bold);
  text-align: right;
  color: var(--warning);
  border-bottom: 1.5px solid var(--warning);
`;

const MyPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['myData'],
    queryFn: getMyData,
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['myData'] });
  }, [queryClient]);

  return (
    <>
      <Header buttonLeft="hamburger" text="마이페이지" buttonRight="home" />
      <Container>
        <Flexbox>
          <ImageWrapper>
            {data && data.image && data.image !== 'null' && (
              <Image
                src={data.image}
                alt="My Profile Image"
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
            )}
          </ImageWrapper>
          <CenterContainer>
            <Nickname>
              {isError
                ? '닉네임 없음'
                : isLoading
                  ? '불러오는 중'
                  : data && data.nickname}
            </Nickname>
            <AddressButton onClick={() => router.push('/myPage/edit/address')}>
              <Image
                src="./map-pin.svg"
                alt="map pin icon"
                width="18"
                height="18"
                priority
              />
              <p>주소관리</p>
            </AddressButton>
          </CenterContainer>
          <RoundBtnFilled onClick={() => router.push(`/${data?.userId}`)}>
            프로필보기
          </RoundBtnFilled>
        </Flexbox>
        <ListContainer>
          <ListItem onClick={() => router.push('/myPage/points')}>
            <p>내 포인트</p>
            <ListButton>{`${data ? data.point : '0'}P >`}</ListButton>
          </ListItem>
          {/* <ListItem>
            <p>앱 테마</p>
            <ListButton onClick={() => router.push('/')}>
              {'>'}
            </ListButton>
          </ListItem> */}
          <ListItem onClick={() => router.push('/myPage/edit/bankAccount')}>
            <p>환불 계좌 입력</p>
            <ListButton>{'>'}</ListButton>
          </ListItem>
          <ListItem $isLast onClick={() => router.push('/inquiry')}>
            <p>문의 게시판</p>
            <ListButton>{'>'}</ListButton>
          </ListItem>
        </ListContainer>
        <Flexbox>
          <LogoutButton onClick={() => handleSignOut(router)}>
            로그아웃
          </LogoutButton>
        </Flexbox>
      </Container>
    </>
  );
};

export default MyPage;
