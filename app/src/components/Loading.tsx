import React from 'react';
import { styled } from '@mui/system';
import { CircularProgress } from '@mui/material';

const CustomizedDiv = styled('div')({
  alignItems: 'center',
  display: 'flex',
  height: '100%',
  justifyContent: 'center',
  width: '100%',
  '& > * + *': {
    margin: 0,
  },
});

function Loading() {
  return (
    <CustomizedDiv>
      <CircularProgress />
    </CustomizedDiv>
  );
}

export default Loading;
