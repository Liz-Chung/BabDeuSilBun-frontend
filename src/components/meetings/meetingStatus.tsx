import styled from 'styled-components';
import { Divider, Badge } from '@chakra-ui/react';
import GroupIcon from '@/components/svg/group';
import Image from 'next/image';

const StatusContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--spacing-md) var(--spacing-md) var(--spacing-md) 0;
  background-color: var(--background);
  gap: var(--spacing-xs);
  width: 100%;
`;

const Text = styled.span`
  font-size: var(--font-size-xs);
  font-weight: var(--font-regular);
  color: var(--text);
`;

const CountdownTimer = styled.span`
  font-size: var(--font-size-xs);
  font-weight: var(--font-regular);
  color: var(--text);
`;

const TimerIcon = styled(Image)`
  width: 18px;
  height: 18px;
`;

interface MeetingStatusProps {
  currentHeadCount: number;
  participantMax: number;
  participantMin: number;
  purchaseType: string;
  remainingTime: string;
}

const MeetingStatus: React.FC<MeetingStatusProps> = ({
  currentHeadCount,
  participantMax,
  participantMin,
  purchaseType,
  remainingTime,
}) => (
  <StatusContainer>
    <GroupIcon color="var(--primary)" width={18} height={18} aria-hidden="true" />
    <Text>
      {`${currentHeadCount}/${participantMax} (최소 ${participantMin}명)`}
    </Text>
    <Divider orientation="vertical" sx={{ height: '1.3125rem', backgroundColor: 'var(--gray300)' }} />
    <Badge
      sx={{
        backgroundColor: 'var(--primary)',
        color: '#fff',
        padding: '0.3rem var(--spacing-sm)',
        borderRadius: 'var(--border-radius-lg)',
        fontWeight: 'var(--font-semi-bold)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      aria-label={`Purchase type: ${purchaseType}`}
    >
      {purchaseType}
    </Badge>
    <Divider orientation="vertical" sx={{ height: '1.3125rem', backgroundColor: 'var(--gray300)' }} />
    <TimerIcon src="/timer.svg" alt="Timer Icon" width={18} height={18} />
    <CountdownTimer aria-label={`Time remaining: ${remainingTime}`}>
      {remainingTime}
    </CountdownTimer>
  </StatusContainer>
);

export default MeetingStatus;