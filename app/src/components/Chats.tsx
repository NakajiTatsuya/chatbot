import React from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import Chat from './Chat';

type ChatType = {
    text: string;
    type: string;
};

type ChatProps = {
    chats: ChatType[];
};

const CustomizedList = styled(List)({
  height: 400,
  padding: '0',
  overflow: 'auto', // <List>タグの子要素がheight:400を超えると、スクロールバーが表示される
});

function Chats(props: ChatProps) {
  const { chats } = props;
  return (
    <CustomizedList id="scroll-area">
      {chats.map((chat: ChatType) => <Chat text={chat.text} type={chat.type} key={chat.text} />)}
    </CustomizedList>
  );
}

export default Chats;
