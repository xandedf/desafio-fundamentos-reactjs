import styled from 'styled-components';

interface MessageProps {
  type: 'success' | 'error';
}

export const Message = styled.div<MessageProps>`
  display: flex;
  flex: 1;

  span {
    font-size: 12px;
    color: ${({ type }) => (type === 'success' ? '#12a454' : '#E83F5B')};
    margin-top: 5px;
  }
`;
