import { Button } from "@mui/material";
import React, { useState } from "react";
import { softDeleteUser } from "../utils/api";
import CustomButton from "./parts/CustomButton";
import CustomModal from "./parts/CustomModal";

interface DeleteUserButtonProps {
  userId: number;
  onDelete: (userId: number) => void;
}

const DeleteUserButton: React.FC<DeleteUserButtonProps> = ({
  userId,
  onDelete,
}) => {
  const [open, setOpen] = useState(false); // モーダルの開閉状態
  const [isConfirm, setIsConfirm] = useState(false); // 確認ボタンが押されたかどうか

  // モーダルを開くための関数
  const handleModal = () => {
    setOpen(true);
  };

  // 削除処理
  const handleDelete = async () => {
    if (isConfirm) {
      try {
        await softDeleteUser(userId); // ユーザー削除
        onDelete(userId); // 親コンポーネントに削除通知
        setOpen(false); // モーダルを閉じる
      } catch (error) {
        alert("削除に失敗しました。" + error);
        setOpen(false); // エラー時もモーダルを閉じる
      }
    }
  };

  return (
    <>
      <CustomButton
        variantType="secondary"
        color="error"
        sx={{ ml: 1 }}
        onClick={handleModal} // モーダルを開く
        children="削除"
      />
      <CustomModal
        title="削除ボタンが押されました"
        content="本当に削除しますか？"
        open={open}
        onClose={() => setOpen(false)} // モーダルを閉じる
        onConfirm={() => { 
          setIsConfirm(true); // 確認ボタンが押されたことを記録
          handleDelete(); // 削除処理を実行
        }}
      />
    </>
  );
};

export default DeleteUserButton;



// import { Button } from "@mui/material";
// import React, { useEffect, useId, useState } from "react";
// import { softDeleteUser } from "../utils/api";

// interface DeleteUserButtonProps{
//     userId: number;
//     onDelete: (userId: number) => void;///onDeleteがsuccessとerrorを兼任してる
// }

// const DeleteUserButton: React.FC<DeleteUserButtonProps> = ({userId, onDelete}) => {

//     const handleDelete = async () => {///フォームで入力されたdataを渡す
//         if (confirm('本当にこのユーザーを削除しますか？')) {
//             try {
//                 await softDeleteUser(userId);
//                 onDelete(userId);
//                 } catch (err) {///処理でエラーが発生したら
//                 alert("ユーザーが削除できませんでした。")
//                 }
//           };
//     }
//     return(
    
//         <Button onClick={handleDelete} size="small" color="error">削除</Button>

//     )
// };

// export default DeleteUserButton;
