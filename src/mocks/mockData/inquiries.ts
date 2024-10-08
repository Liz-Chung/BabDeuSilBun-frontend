import { InquiryResponse, InquiryType } from '@/types/myDataTypes';
import { ImageType } from '@/types/types';

export const inquiries: InquiryType[] = [
  {
    inquiryId: 1,
    title: 'DummyText',
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    status: 'PENDING',
    createdAt: '2024-07-23T10:40:00',
    updatedAt: '2024-07-23T10:40:00',
  },
  {
    inquiryId: 2,
    title: 'DummyText',
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    status: 'PENDING',
    createdAt: '2024-07-23T10:40:00',
    updatedAt: '2024-07-23T10:40:00',
  },
  {
    inquiryId: 3,
    title: 'DummyText',
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    status: 'PENDING',
    createdAt: '2024-07-23T10:40:00',
    updatedAt: '2024-07-23T10:40:00',
  },
  {
    inquiryId: 4,
    title: 'DummyText',
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    status: 'PENDING',
    createdAt: '2024-07-23T10:40:00',
    updatedAt: '2024-07-23T10:40:00',
  },
  {
    inquiryId: 5,
    title: '모임장 연락이 안돼요',
    content:
      '아니 8시에 만나기로 했는데 40분째 연락 두절 실환가요 아침도 못 먹고 등교하게 생겼어요.',
    answer:
      '안녕하세요 고객님, 이용에 불편을 드려 죄송합니다. 해당 모임장님께 즉시 확인 요청 드렸으며, 빠른 조치를 취할 수 있도록 최선을 다하겠습니다. 감사합니다.',
    status: 'COMPLETED',
    createdAt: '2024-07-20T08:40:00',
    updatedAt: '2024-07-20T09:40:00',
  },
  {
    inquiryId: 6,
    title: '메뉴가 잘못 왔어요',
    content:
      '아아를 시켰는데 뜨아가 왔네요.. 제가 왜 죄 지은 사람 마냥ㅠㅠ 제꺼 대신 드렸어요...',
    answer:
      '안녕하세요 고객님, 불편을 끼쳐드려 대단히 죄송합니다. 주문하신 메뉴와 다르게 제공된 점에 대해 즉시 환불 처리해드렸습니다. 앞으로 더 나은 서비스를 제공할 수 있도록 노력하겠습니다. 감사합니다.',
    status: 'COMPLETED',
    createdAt: '2024-07-21T11:10:00',
    updatedAt: '2024-07-21T13:40:00',
  },
  {
    inquiryId: 7,
    title: '예상 시간 보다 1시간 늦었는데요',
    content:
      '배고파 죽는 줄 알았네요. 웬만해선 리뷰 안 남기는데 이건 모임이라 쉽게 넘어갈 수가 없어서요. 환불 부탁드려요.',
    answer:
      '안녕하세요 고객님, 예상보다 지연된 점 진심으로 사과드립니다. 해당 건에 대해 포인트로 환불 처리해드렸습니다. 앞으로 더 빠르고 정확한 서비스 제공을 위해 최선을 다하겠습니다. 감사합니다.',
    status: 'COMPLETED',
    createdAt: '2024-07-22T13:50:00',
    updatedAt: '2024-07-22T14:40:00',
  },
  {
    inquiryId: 8,
    title: '학과를 바꾸고 싶어요',
    content: '전과를 해서 학과를 바꾸고 싶은데 어떻게 해야 하나요?',
    answer:
      '안녕하세요 고객님, 전과 관련 문의에 대해 안내드리겠습니다. help@bdsb.com으로 전과 확인 이미지와 현재 문의 내용을 함께 캡쳐하여 보내주시면, 신속하게 처리해드리겠습니다. 감사합니다.',
    status: 'COMPLETED',
    createdAt: '2024-07-23T10:40:00',
    updatedAt: '2024-07-23T10:40:00',
  },
  {
    inquiryId: 9,
    title: 'DummyText',
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    answer:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    status: 'COMPLETED',
    createdAt: '2024-07-23T10:40:00',
    updatedAt: '2024-07-23T10:40:00',
  },
  {
    inquiryId: 10,
    title: 'DummyText',
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    answer:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    status: 'COMPLETED',
    createdAt: '2024-07-23T10:40:00',
    updatedAt: '2024-07-23T10:40:00',
  },
  {
    inquiryId: 11,
    title: 'DummyText',
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    answer:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    status: 'COMPLETED',
    createdAt: '2024-07-23T10:40:00',
    updatedAt: '2024-07-23T10:40:00',
  },
  {
    inquiryId: 12,
    title: 'DummyText',
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    answer:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    status: 'COMPLETED',
    createdAt: '2024-07-23T10:40:00',
    updatedAt: '2024-07-23T10:40:00',
  },
  {
    inquiryId: 13,
    title: 'Dummy Text',
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    answer:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    status: 'COMPLETED',
    createdAt: '2024-07-23T10:40:00',
    updatedAt: '2024-07-23T10:40:00',
  },
];

const pageSize = 10;
const totalPages = Math.ceil(inquiries.length / pageSize);

export const paginatedInquiries: InquiryResponse[] = Array.from(
  { length: totalPages },
  (_, index) => {
    const start = index * pageSize;
    const end = start + pageSize;
    const content = inquiries.slice(start, end);
    const isLastPage = index === totalPages - 1;

    return {
      content,
      pageable: {
        offset: start,
        pageNumber: index,
        pageSize,
        sort: {
          empty: true,
          unsorted: true,
          sorted: false,
        },
        paged: true,
        unpaged: false,
      },
      last: isLastPage,
      totalPages,
      size: pageSize,
      first: index === 0,
      number: index,
      numberOfElements: content.length,
      sort: {
        empty: true,
        unsorted: true,
        sorted: false,
      },
      totalElements: inquiries.length,
      empty: content.length === 0,
    };
  },
);

export const inquiryImages: ImageType[] = [
  {
    imageId: 1,
    url: 'https://via.placeholder.com/100x100',
    sequence: 1,
  },
  {
    imageId: 2,
    url: 'https://via.placeholder.com/200x200',
    sequence: 2,
  },
  {
    imageId: 3,
    url: 'https://via.placeholder.com/150x150',
    sequence: 3,
  },
];
