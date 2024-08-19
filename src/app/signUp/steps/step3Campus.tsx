import { useSignUpStore } from '@/state/authStore';
import { useState, useMemo, useEffect, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { debounce } from 'lodash';
import AutoCompleteComboBox from '@/components/common/autoCompleteComboBox';
import { getSchoolsList } from '@/services/signUpService';

const Step3Campus = () => {
  const { campusName, setCampusName, setCampus } = useSignUpStore();
  const [inputValue, setInputValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState(inputValue);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLLIElement | null>(null);
  const suggestionsListRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (campusName) setInputValue(campusName);
  }, [campusName]);

  const debouncedInputValue = useMemo(
    () =>
      debounce((value) => {
        setDebouncedValue(value);
      }, 300),
    [],
  );

  useEffect(() => {
    debouncedInputValue(inputValue);
  }, [inputValue, debouncedInputValue]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ['schoolList', debouncedValue],
      queryFn: ({ pageParam = 0 }) =>
        getSchoolsList({ page: pageParam, schoolName: debouncedValue }),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        return lastPage.last ? undefined : lastPage.pageable.pageNumber + 1;
      },
      enabled: true,
    });

  useEffect(() => {
    if (isFetchingNextPage) return;

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    };

    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(handleIntersect, {
      root: suggestionsListRef.current,
      rootMargin: '0px',
      threshold: 0.1,
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

  const suggestions =
    data?.pages.flatMap((page) =>
      page.content.map((school) => ({
        id: school.id,
        display: `${school.name} ${school.campus}`,
      })),
    ) || [];

  const handleSelectSchool = (id: number, name: string) => {
    if (setCampus) setCampus(id);
    if (setCampusName) setCampusName(name);
    setInputValue('');
  };

  return (
    <div style={{ position: 'relative' }}>
      <AutoCompleteComboBox
        inputValue={inputValue}
        setInputValue={setInputValue}
        placeholder="재학 중인 대학교와 캠퍼스 입력"
        onSelect={handleSelectSchool}
        suggestions={suggestions}
        status={status}
        lastElementRef={lastElementRef}
        suggestionsListRef={suggestionsListRef}
      />
    </div>
  );
};

export default Step3Campus;
