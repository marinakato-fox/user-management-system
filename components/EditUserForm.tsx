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
    onSuccess?: () => void;
    onError?: (error: any) => void;
    disabled?: boolean;
   }

// TODO: ユーザー編集フォームコンポーネントを実装する
const EditUserForm: React.FC<EditUserFormProps> = ({ ///分割代入
    userId,
    onSuccess,
    onError,
    disabled = false,
}) => {     
      const {
        register,
        handleSubmit,
        setValue,                   ///Nextの機能
        formState: { errors },
      } = useForm<EditUserFormInputs>();

      useEffect(() => {  ///データ取得処理
        const getUser = async () => {
          try {
            const userData:User | null = await fetchUserById(userId);
            if(userData){
            setValue("name", userData.name);
            setValue("email", userData.email);
            setValue("role", userData.role);
            }
            else{
            setError("ユーザーが見つかりませんでした。")
            }
          } catch (err) {
            setError("ユーザー情報の取得に失敗しました。");
          }
        };

        getUser();
      }, [userId, setValue]);

      const [error, setError] = useState<string | null>(null); ///データ更新処理
      const [success, setSuccess] = useState<boolean>(false);
      const onSubmit = async (data: EditUserFormInputs) => {
        try {
          await updateUser(userId, data);///順番がある　型だいじ
          setSuccess(true);
          setError(null);
          if (onSuccess) onSuccess();
        } catch (err) {
          setError("更新に失敗しました。");
          setSuccess(false);
          if (onError) onError(err);
        }
      };
             

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        ユーザー情報編集
      </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">更新が完了しました。</Alert>}
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* 名前フィールド */}
              <TextField
                label="名前"
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                {...register("name", { required: "名前は必須です。" })}
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
