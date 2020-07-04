import React from 'react';

import { Message } from './styles';

interface MessageProps {
  type: 'success' | 'error';
  value: string;
}

const MessageComponent: React.FC<MessageProps> = ({
  type,
  value,
}: MessageProps) => {
  return (
    <Message type={type}>
      <div>
        <span>{value}</span>
      </div>
    </Message>
  );
};

export default MessageComponent;
