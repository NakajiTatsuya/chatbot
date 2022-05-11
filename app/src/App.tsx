import React, { useState, useEffect, useCallback } from 'react';
import { styled } from '@mui/system';
import defaultDataset from './dataset.json';
import Chats from './components/Chats';
import AnswersList from './components/AnswersList';
import Loading from './components/Loading';
import FormDialog from './components/Forms/FormDialog';

const MySection = styled('div')({
  position: 'relative',
  height: '100vh',
  width: '100%',
});

const MyBox = styled('div')({
  background: '#fff',
  border: '1px solid rgba(0,0,0,0.3)',
  borderRadius: '4px',
  boxSizing: 'border-box',
  height: '592px',
  maxWidth: '432px',
  padding: '0 1rem',
  width: '100%',

  /* Vertical and horizontal center alignment */
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
});

function App() {
  type AnswerType = {
    content: string;
    nextId: string;
  };

  type Data = {
    question: string;
    answers: AnswerType[];
  }

  type Dataset = {
    [index: string]: Data;
  };

  type ChatType = {
    text: string;
    type: string;
  };

  const [answers, setAnswers] = useState<AnswerType[]>([]);
  const [dataset, setDataset] = useState<Dataset>(defaultDataset);
  const [chats, setChats] = useState<ChatType[]>([]);
  const [currentId, setCurrentId] = useState<string>('init');
  const [open, setOpen] = useState(false); // 問い合わせフォーム用モーダルの開閉を管理

  // 問い合わせフォーム用モーダルを開くCallback関数
  const handleClickOpen = () => setOpen(true);

  // 問い合わせフォームのモーダルを閉じる関数
  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  // 新しいチャットを追加するCallback関数
  const addChats = (chat: ChatType) => {
    // prevChatsで、更新前のchatsも取得できる
    setChats((prevChats) => [...prevChats, chat]);
  };

  const displayNextQuestion = (nextQuestionId: string, nextDataset: Data) => {
    // 選択された回答と次の質問をチャットに追加
    addChats({
      text: nextDataset.question,
      type: 'question',
    });

    // 次の回答一覧をセット
    setAnswers(nextDataset.answers);

    // 現在の質問IDをセット
    setCurrentId(nextQuestionId);
  };

  const selectAnswer = (selectedAnswer: string, nextQuestionId: string) => {
    switch (true) {
    // お問い合わせが選択された場合
      case (nextQuestionId === 'contact'):
        handleClickOpen();
        break;

      // リンクが選択された時
      case /^https:*/.test(nextQuestionId): {
        const a = document.createElement('a');
        a.href = nextQuestionId;
        a.target = '_blank';
        a.click();
        break;
      }

      // 選択された回答をchatsに追加
      default:
      // 現在のチャット一覧を取得
        addChats({
          text: selectedAnswer,
          type: 'answer',
        });
        setTimeout(() => displayNextQuestion(nextQuestionId, dataset[nextQuestionId]), 750);
        break;
    }
  };

  // 最初の質問をチャットエリアに表示する
  useEffect(() => {
    (async () => {
      const initDataset: Dataset = defaultDataset;
      setDataset(initDataset);

      // 最初の質問を表示
      displayNextQuestion(currentId, initDataset[currentId]);
    })();
  }, []);

  // 最新のチャットが見えるように、スクロール位置の頂点をスクロール領域の最下部に設定する
  useEffect(() => {
    const scrollArea = document.getElementById('scroll-area');
    if (scrollArea) {
      // scrollArea.scrollTopはスクローラーの最上部の高さ(動的)
      // scrollArea.scrollHeightはスクローラブルな領域の高さ(静的)
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  });

  return (
    <MySection>
      <MyBox>
        {(Object.keys(dataset).length === 0) ? (
          <Loading />
        ) : (
          <>
            <Chats chats={chats} />
            <AnswersList answers={answers} select={selectAnswer} />
          </>
        )}
        <FormDialog open={open} handleClose={handleClose} />
      </MyBox>
    </MySection>
  );
}

export default App;
