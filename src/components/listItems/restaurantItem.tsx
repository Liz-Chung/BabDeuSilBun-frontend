'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import styled from 'styled-components';

import { RestaurantType } from '@/types/coreTypes';
import { formatCurrency } from '@/utils/currencyFormatter';

const CardContainer = styled.div`
  display: flex;
  padding: 1rem;
  cursor: pointer;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: var(--border-radius-default);
  width: 92px;
  height: 92px;
  background: var(--gray200);
  position: relative;
`;

// 주 정보 영역
const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 10px;
  flex: 1;
  overflow: hidden;
`;

const RestaurantName = styled.h4`
  font-weight: var(--font-semi-bold);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const InfoItem = styled.p`
  font-size: var(--font-size-xs);
  display: flex;
  gap: 0.3rem;
`;

const InfoTitle = styled.span`
  color: var(--gray400);
  margin-right: 0.3rem;
`;

const RestaurantItem: React.FC<{ item: RestaurantType }> = ({ item }) => {
  const router = useRouter();

  const deliveryPrice = formatCurrency(item.deliveryPrice);
  const minPurchasePrice = formatCurrency(item.minPurchasePrice);

  const handleClick = () => {
    router.push(`/restaurants/${item.storeId}?context=leaderBefore`);
  };

  return (
    <CardContainer onClick={handleClick}>
      <ImageContainer>
        {item.image && item.image.length > 0 && item.image[0].url && (
          <Image
            src={item.image[0].url}
            alt="Restaurant Image"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        )}
      </ImageContainer>
      <InfoSection>
        <RestaurantName>{item.name}</RestaurantName>
        <InfoItem>
          <Image
            src="/timer.svg"
            alt="Delivery Time"
            width="18"
            height="18"
            priority
          />
          <span>{item.deliveryTimeRange}</span>
        </InfoItem>
        <InfoItem>
          <Image
            src="/fee.svg"
            alt="Delivery Fee"
            width="18"
            height="18"
            priority
          />
          <span>{deliveryPrice}</span>
        </InfoItem>
        <InfoItem>
          <InfoTitle>최소주문</InfoTitle>
          <span>{minPurchasePrice}</span>
        </InfoItem>
      </InfoSection>
    </CardContainer>
  );
};

export default RestaurantItem;
