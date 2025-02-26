
import { Button } from "@mui/material";
import React, { useEffect, useId, useState } from "react";
import { softDeleteUser } from "../utils/api";

interface DeleteUserButtonProps{
    userId: number;
    onDelete: (userId: number) => void;///onDeleteがsuccessとerrorを兼任してる
}

const DeleteUserButton: React.FC<DeleteUserButtonProps> = ({userId, onDelete}) => {

    const handleDelete = async () => {///フォームで入力されたdataを渡す
        if (confirm('本当にこのユーザーを削除しますか？')) {
            try {
                await softDeleteUser(userId);
                onDelete(userId);
                } catch (err) {///処理でエラーが発生したら
                    alert("ユーザーが削除されました。")
                }
          };
    }
    return(
    
        <Button onClick={handleDelete} size="small" color="error">削除</Button>

    )
};

export default DeleteUserButton;
