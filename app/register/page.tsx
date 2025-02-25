// app/register/page.tsx
"use client"; // クライアントコンポーネントとしてマーク .env.localの元で動いてるってこと
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import RegisterForm from "../../components/RegisterForm";
// TODO: 新規登録ページを実装し、RegisterFormコンポーネントを使用する
const RegisterPage: React.FC = () => {
  const router = useRouter();
  const handleSuccess = () => {
    // 登録成功後にユーザー一覧ページにリダイレクト
    router.push("/users");
  };
  const handleError = (error: any) => {
    // エラーログを外部サービスに送信するなどの処理
    console.error("登録エラー:", error);
  };
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        新規ユーザー登録
      </Typography>
      <RegisterForm onSuccess={handleSuccess} onError={handleError} />
    </Box>
  );
};
export default RegisterPage;