import React from 'react';
import { styled } from '@mui/system';
import Answer from './Answer';

type AnswerProps = {
  content: string;
  nextId: string;
};

type AnswersProps = {
  answers: AnswerProps[];
  // eslint-disable-next-line no-unused-vars
  select: (content: string, nextId: string) => void;
};

const AnswersWrapper = styled('div')({
  display: 'flex',
  flexFlow: 'column',
  justifyContent: 'flex-end',
  height: '192px',
});

function AnswersList(props: AnswersProps) {
  const { answers, select } = props;
  return (
    <AnswersWrapper>
      {/* eslint-disable-next-line max-len */}
      {answers.map((answer: AnswerProps) => <Answer answer={answer} key={answer.content} select={select} />)}
    </AnswersWrapper>
  );
}

export default AnswersList;
