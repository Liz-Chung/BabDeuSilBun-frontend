'use client';

import { useEffect, useRef, useState } from 'react';

import styled from 'styled-components';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { SmallCustomDropdown } from '@/components/common/dropdown';
import { Divider } from '@chakra-ui/react';
import TeamOrderItem from '@/components/listItems/teamOrderItem';
import ImminentOrderItem from '@/components/listItems/imminentOrderItem';
import { getTeamOrderList } from '@/services/teamOrderService';
import { MeetingsResponse } from '@/types/coreTypes';

import ImminentOrderSkeleton from '@/components/listItems/imminentOrderSkeleton';
import TeamOrderSkeleton from '@/components/listItems/teamOrderSkeleton';

// Styled Components
const ListContainer = styled.section`
  margin: 124px 0 20px;
`;

const SectionContainer = styled.section<{ $additional?: string }>`
  padding: 1rem;
  padding-right: ${(props) => props.$additional || '1rem'};
  padding-bottom: ${(props) => props.$additional || '1rem'};
`;

const CardContainer = styled.div`
  display: flex;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
`;

const DropDownWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const GroupTitle = styled.h3`
  font-weight: var(--font-semi-bold);
  font-size: var(--font-size-xl);
`;

// Sort options
const options = [
  { id: 1, value: 'deadline', name: '주문이 임박한 순' },
  { id: 2, value: 'delivery-fee', name: '배달비가 낮은 순' },
  { id: 3, value: 'min-price', name: '최소주문금액이 낮은 순' },
  { id: 4, value: 'delivery-time', name: '배송시간이 짧은 순' },
];

// Main Component
function TeamOrderList() {
  const [selectedSort, setSelectedSort] = useState<string>('deadline');
  const [isOpen, setIsOpen] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  // Fetch imminent orders
  const {
    data: imminentData,
    status: imminentStatus,
    error: imminentError,
  } = useQuery<MeetingsResponse>({
    queryKey: ['imminentTeamOrders'],
    queryFn: () =>
      getTeamOrderList({ page: 0, size: 4, sortCriteria: 'deadline' }),
  });

  // Fetch paginated team orders
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['teamOrderList', selectedSort],
    queryFn: ({ pageParam = 0 }) =>
      getTeamOrderList({ page: pageParam, sortCriteria: selectedSort }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.last ? undefined : lastPage.pageable.pageNumber + 1;
    },
  });

  useEffect(() => {
    if (isFetchingNextPage) return;

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    };

    observer.current = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    });

    if (lastElementRef.current) {
      observer.current.observe(lastElementRef.current);
    }

    return () => {
      if (observer.current && lastElementRef.current) {
        observer.current.unobserve(lastElementRef.current);
      }
    };
  }, [isFetchingNextPage, hasNextPage, fetchNextPage]);

  const handleSelect = (value: string | null) => {
    if (value !== null) {
      setSelectedSort(value);
    }
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <ListContainer>
      <SectionContainer $additional="0">
        <GroupTitle>임박한 모임</GroupTitle>
        <CardContainer>
          {imminentStatus === 'pending' && (
            <>
              <ImminentOrderSkeleton />
              <ImminentOrderSkeleton />
              <ImminentOrderSkeleton />
              <ImminentOrderSkeleton />
            </>
          )}
          {imminentStatus === 'error' && (
            <p>
              Error:{' '}
              {imminentError?.message || '알 수 없는 오류가 발생했습니다.'}
            </p>
          )}
          {imminentStatus === 'success' &&
            (imminentData?.content.length > 0 ? (
              imminentData.content.map((item) => (
                <ImminentOrderItem key={item.meetingId} item={item} />
              ))
            ) : (
              <div>모집 중인 모임이 없습니다.</div>
            ))}
        </CardContainer>
      </SectionContainer>

      <Divider />

      <SectionContainer>
        <DropDownWrapper>
          <GroupTitle>모임 모아보기</GroupTitle>
          <SmallCustomDropdown
            options={options}
            selectedValue={selectedSort}
            onSelect={handleSelect}
            isOpen={isOpen}
            onToggle={handleToggle}
          />
        </DropDownWrapper>

        {status === 'pending' && (
          <>
            <TeamOrderSkeleton />
            <TeamOrderSkeleton />
            <TeamOrderSkeleton />
            <TeamOrderSkeleton />
            <TeamOrderSkeleton />
          </>
        )}
        {status === 'error' && <p>Error: {error.message}</p>}
        {status === 'success' && data && (
          <>
            {data.pages.map((page) =>
              page.content.map((item, index) => (
                <div
                  key={item.meetingId}
                  ref={
                    index === page.content.length - 1 ? lastElementRef : null
                  }
                >
                  <TeamOrderItem item={item} />
                  <Divider />
                </div>
              )),
            )}
            {/* {!hasNextPage && <div>all fetched</div>} */}
          </>
        )}
        {status === 'success' && !data && <div>모집 중인 모임이 없습니다.</div>}
      </SectionContainer>
    </ListContainer>
  );
}

export default TeamOrderList;
