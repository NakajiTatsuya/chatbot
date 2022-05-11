import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
  TextField,
} from '@mui/material';
import { styled } from '@mui/system';
import WEBHOOK_URL from '../../webhookConfig';

type Inputs = {
    name: string,
    email: string,
    description: string,
};

type DialogProps = {
    open: boolean;
    handleClose: () => void;
};

const FormError = styled('p')({
  color: 'red',
});

function FormDialog(props: DialogProps) {
  const { open, handleClose } = props;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    mode: 'onSubmit',
  });

  const Name = watch('name');
  const Email = watch('email');
  const Description = watch('description');

  const onSubmit: SubmitHandler<Inputs> = () => {
    const payload = {
      text: 'お問い合わせがありました\n'
                + `お名前: ${Name}\n`
                + `メールアドレス: ${Email}\n`
                + `【問い合わせ内容】\n${Description}`,
    };

    // fetchメソッドでフォームの内容をSlackのIncoming Webhook URL に送信する
    fetch(WEBHOOK_URL, {
      method: 'POST',
      body: JSON.stringify(payload),
    }).then(() => {
      alert('送信が完了しました。追ってご連絡いたします🙌');
      return handleClose();
    });

    // reset after form submit
    reset({ name: '', email: '', description: '' });
  };

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">問い合わせフォーム</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="名前(必須)"
          margin="dense"
          multiline={false}
          rows={1}
          type="text"
          {...register('name', {
            required: true,
          })}
        />
        {errors.name && errors.name.type === 'required' && <FormError>氏名を入力してください</FormError>}
        <TextField
          fullWidth
          label="メールアドレス(必須)"
          margin="dense"
          multiline={false}
          rows={1}
          type="text"
          {...register('email', {
            required: true,
            pattern: {
              value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: 'メールアドレスの形式が不正です',
            },
          })}
        />
        {errors.email && errors.email.type === 'required' && <FormError>メールアドレスを入力してください</FormError>}
        {errors.email && errors.email.type === 'pattern' && <FormError>{errors.email.message}</FormError>}
        <TextField
          fullWidth
          label="お問い合わせ内容(必須)"
          margin="dense"
          multiline
          rows={5}
          type="text"
          {...register('description', {
            required: true,
          })}
        />
        {errors.description && errors.description.type === 'required' && <FormError>お問い合わせ内容を入力してください</FormError>}
      </DialogContent>
      <DialogActions>
        <Button type="submit" onClick={handleClose} color="primary">
          キャンセル
        </Button>
        <Button type="submit" onClick={handleSubmit(onSubmit)} color="primary">
          送信する
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default FormDialog;
