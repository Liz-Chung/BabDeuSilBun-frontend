'use client';

import { Spinner } from '@chakra-ui/react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export default function Loading() {
  return (
    <Wrapper>
      <Spinner
        color="var(--primary)"
        size="xl"
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
      />
    </Wrapper>
  );
}
