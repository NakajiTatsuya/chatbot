import React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

type AnswerProps = {
  answer: {
    content: string;
    nextId: string
  };
  // eslint-disable-next-line no-unused-vars
  select: (content: string, nextId: string) => void;
};

const CustomizedButton = styled(Button)({
  borderColor: '#FFB549',
  color: '#FFB549',
  fontWeight: 600,
  marginBottom: '8px',
  '&:hover': {
    backgroundColor: '#FFB549',
    color: '#fff',
  },
});

function Answer(props: AnswerProps) {
  const { select, answer } = props;

  return (
    <CustomizedButton
      variant="outlined"
      onClick={() => select(answer.content, answer.nextId)}
    >
      {answer.content}
    </CustomizedButton>
  );
}

export default Answer;
