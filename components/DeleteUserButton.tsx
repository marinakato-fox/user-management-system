
import { Button } from "@mui/material";
import React, { useEffect, useId, useState } from "react";
import { softDeleteUser } from "../utils/api";

interface DeleteUserButtonProps{
    userId: number;
    onDelete: (userId: number) => void;
    onSuccess?: () => void;
    onError?: (error: any) => void;
}
const [error, setError] = useState<string | null>(null); ///エラーの状態管理
const [success, setSuccess] = useState<boolean>(false);///成功したかどうかの管理

const DeleteUserButton: React.FC<DeleteUserButtonProps> = ({userId, onDelete, onError, onSuccess}) => {

    const handleDelete = async () => {///フォームで入力されたdataを渡す
        if (confirm('本当にこのユーザーを削除しますか？')) {
            try {
                await softDeleteUser(userId);
                setSuccess(true);///データが取得出来たら
                setError(null);///エラー文はださない
                onDelete(userId);
                if (onSuccess) onSuccess();
                } catch (err) {///処理でエラーが発生したら
                setError("更新に失敗しました。");///エラー文をだす
                setSuccess(false);///成功したかどうかを偽にする
                if (onError) onError(err);///もし親コンポーネントでonErrorハンドルがあったら、onErrorを使う
                }
          };
    }
    return(
    
        <Button onClick={handleDelete} size="small" color="error">削除</Button>

    )
};

export default DeleteUserButton;
