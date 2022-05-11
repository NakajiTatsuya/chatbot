import React from 'react';
import { ListItem, ListItemAvatar, Avatar } from '@mui/material';
import { styled } from '@mui/system';
import Torahack from '../assets/img/torahack.png';
import NoProfile from '../assets/img/no-profile.png';

const MyListItem = styled(ListItem)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'left',
});

const MyReversedListItem = styled(ListItem)({
  display: 'flex',
  flexDirection: 'row-reverse',
  justifyContent: 'right',
});

const MyChatText = styled('div')({
  background: '#41B6E6',
  borderRadius: '4px',
  color: '#fff',
  fontSize: '14px',
  fontWeight: '500',
  padding: '.5rem',
  marginRight: '1rem',
  maxWidth: '80%',
  width: 'auto',
});

type ChatProps = {
    text: string;
    type: string;
};

function Chat(props: ChatProps) {
  const { text, type } = props;
  const isQuestion: boolean = (type === 'question');

  return (
    <>
      {
        isQuestion
        && (
        <MyListItem>
          <ListItemAvatar>
            <Avatar alt="icon" src={Torahack} />
          </ListItemAvatar>
          <MyChatText>{text}</MyChatText>
        </MyListItem>
        )
      }
      {
        (!isQuestion)
        && (
        <MyReversedListItem>
          <ListItemAvatar>
            <Avatar alt="icon" src={NoProfile} />
          </ListItemAvatar>
          <MyChatText>{text}</MyChatText>
        </MyReversedListItem>
        )
      }
    </>
  );
}

export default Chat;
