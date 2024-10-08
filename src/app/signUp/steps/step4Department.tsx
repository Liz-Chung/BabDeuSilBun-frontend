'use client';

import { debounce } from 'lodash';
import { useEffect, useMemo, useRef, useState } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';

import AutoCompleteComboBox from '@/components/common/autoCompleteComboBox';
import { useInfiniteScroll } from '@/hook/useInfiniteScroll';
import { getMajorsList } from '@/services/auth/signUpService';
import { useSignUpStore } from '@/state/authStore';

const Step4Department = () => {
  const { departmentName, setDepartmentName, setDepartment, setButtonActive } =
    useSignUpStore();
  const [inputValue, setInputValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');
  const suggestionsListRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (departmentName) {
      setInputValue(departmentName);
      setButtonActive(true);
    } else {
      setButtonActive(false);
    }
  }, [departmentName]);

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
      queryKey: ['majorList', debouncedValue],
      queryFn: ({ pageParam = 0 }) =>
        getMajorsList({ page: pageParam, majorName: debouncedValue || '' }),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        return lastPage.last ? undefined : lastPage.pageable.pageNumber + 1;
      },
      enabled: true,
    });

  const lastElementRef = useInfiniteScroll<HTMLLIElement>({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    root: suggestionsListRef.current,
  });

  const suggestions =
    data?.pages.flatMap((page) =>
      page.content.map((major) => ({
        id: major.id,
        display: major.name,
      })),
    ) || [];

  const handleSelectMajor = (id: number, name: string) => {
    if (setDepartment) setDepartment(id);
    if (setDepartmentName) setDepartmentName(name);
  };

  return (
    <div style={{ position: 'relative' }}>
      <AutoCompleteComboBox
        inputValue={inputValue}
        setInputValue={setInputValue}
        placeholder="재학 중인 학과를 입력하세요"
        onSelect={handleSelectMajor}
        suggestions={suggestions}
        status={status}
        lastElementRef={lastElementRef}
        suggestionsListRef={suggestionsListRef}
      />
    </div>
  );
};

export default Step4Department;
