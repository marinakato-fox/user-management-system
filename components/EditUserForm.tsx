// components/EditUserForm.tsx

"use client"; // クライアントコンポーネントとしてマーク

import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import { fetchUserById, updateUser } from "../utils/api";
import { User } from "../types/User";
import { useRouter } from "next/navigation";

// 必要に応じて利用する
interface EditUserFormInputs {
  name: string;
  email: string;
  role: string;
}
// 成功後のリダイレクトなどを行う場合
interface EditUserFormProps {
    userId: number;
    onSuccess?: () => void;///成功時何かをしたいときに呼び出す処理、成功したかどうかは別、引数なしで実行
    onError?: (error: any) => void;///errorという引数を受け取って何かを処理する
    disabled?: boolean;///HTMLの属性で、「無効化する」役割がある　true：使えなくする、false：使える 更新ボタンで使う
   }

// TODO: ユーザー編集フォームコンポーネントを実装する
const EditUserForm: React.FC<EditUserFormProps> = ({ //RegisterFormは<RegisterFormProps>をもってて、
    userId,                                         ///これらを引数に持つ
    onSuccess,
    onError,
    disabled = false,//最初更新ボタン使えないようにする
}) => {     
      const {
        register,///入力フィールドを管理対象にする
        handleSubmit,//バリデーションの管理　　入力規則(全部かなにするとか)
        setValue,///特定フィールドの値をプログラミング的に更新する
        formState: { errors },///フォームの状態を管理
      } = useForm<EditUserFormInputs>();///上のやつはuseForm(フォームの管理)の機能でこの形で書く。続く型は入力データの型を定義

const [error, setError] = useState<string | null>(null); ///エラーの状態管理
const [success, setSuccess] = useState<boolean>(false);///成功したかどうかの管理

      useEffect(() => {  ///データ取得処理
        const getUser = async () => {///async:非同期処理(データ取得とかの時間がかかる処理)をする→バックグラウンドで実行してほかの処理を並行して進める
          try {///
            const userData:User | null = await fetchUserById(userId);///fetchUserByIdで取得したデータはUser型かなしか。fetchUserByIdはUserIdを引数に持つ
            if(userData){///もし、取得したデータが存在したら
            setValue("name", userData.name);///setValue(更新するフィールド名, 設定する値,　以降オプション)の順で引数をうけとる onChangeの役割も持つ
            setValue("email", userData.email);
            setValue("role", userData.role);
            }
            else{///存在しなかったら
            setError("ユーザーが見つかりませんでした。")///状態管理でエラーを出す
            }
          } catch (err) {///tryでなにかエラーが見つかった時にする(err)はエラーを受け取る引数APIから帰ってきたエラーが格納されてる
            setError("ユーザー情報の取得に失敗しました。"+ err);///
          }
        };///最後に一覧に飛ぶ処理を書くとstorybook

        getUser();///関数を実行
      }, [userId, setValue]);///useEffectは最初と、userId, setValueに変更があった際にレンダリングする

      
      const onSubmit = async (data: EditUserFormInputs) => {///フォームで入力されたdataを渡す
        try {
          await updateUser(userId, data);///順番がある　関数を定義したときの順番 取得が完了するまで待ってくれる
          setSuccess(true);///データが取得出来たら
          setError(null);///エラー文はださない
          if (onSuccess) onSuccess();
        } catch (err) {///処理でエラーが発生したら
          setError("更新に失敗しました。");///エラー文をだす
          setSuccess(false);///成功したかどうかを偽にする
          if (onError) onError(err);///もし親コンポーネントでonErrorハンドルがあったら、onErrorを使う
        }
      };
             

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        ユーザー情報編集
      </Typography>
      {/* javaをJSXに変換する書き方 */}
        {error && <Alert severity="error">{error}</Alert>}　
        {success && <Alert severity="success">更新が完了しました。</Alert>}
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* 名前フィールド */}
              <TextField
                label="名前"
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                {...register("name", { required: "名前は必須です。" })}///useFormのregisterの書き方　スプレッド構文(あらかじめ与えられてる機能を格納)
                                                                  ///("フィールド名", バリデーションルール)と定義する
                error={!!errors.name}
                helperText={errors.name?.message}
              />
              {/* メールフィールド */}
              <TextField
                label="メール"
                type="email"
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                {...register("email", {
                  required: "メールは必須です。",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "有効なメールアドレスを入力してください。",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              {/* ロールフィールド */}
              <TextField
                label="役職"
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                {...register("role", { required: "ロール設定は必須です。" })}
                error={!!errors.role}
                helperText={errors.role?.message}
              />
              {/* 更新ボタン */}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                disabled={disabled}
              >
                更新
              </Button>
            </form>
    </Box>
  );
};

export default EditUserForm;
