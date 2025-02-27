// app/users/[id]/edit/page.tsx

"use client"; // クライアントコンポーネントとしてマーク 全ページsupabaseつかってるから、このクライアントの配下で動くっていう指示

import React from "react";
import EditUserForm from "../../../../components/EditUserForm";
import { useParams, useRouter} from "next/navigation";
import { Typography, Box } from "@mui/material";


// TODO: URLパラメータからユーザーIDを取得し、EditUserFormコンポーネントに渡す
const EditUserPage: React.FC = () => {
  const id = useParams().id;///idを取得するためにuseParamsを使う url上にあるパラメータを全部取得できる
  const router = useRouter();

  // ユーザーIDが取得できていない場合はnullを返す
  if (!id || Array.isArray(id)) {
    return <Typography>ユーザーIDが無効です。</Typography>;
  }

  // 登録成功後にユーザー一覧ページにリダイレクト
  const handleSuccess = () => {
    router.push("/users");
  };
  const handleError = (error: any) => {
    console.error("登録エラー:", error);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        ユーザー編集
      </Typography>
      <EditUserForm userId={Number(id)} onSuccess={handleSuccess} onError={handleError}/>
    </Box>///型変換Number()でnumber型で受け取れる

  );
};

export default EditUserPage;
