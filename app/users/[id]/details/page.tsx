"use client";

import UserDetails from "@/components/UserDetails"
import { Box, Typography } from "@mui/material"
import { User } from "@/types/User";
import { useEffect, useState } from "react";
import { fetchUserById } from "@/utils/api";
import { useParams } from "next/navigation";


const UserDetailsPage : React.FC= () => {
    const[user, setUser] = useState<User | null>();
    const[error, setError] = useState<string>();
    const userId = useParams().id;

    useEffect(() => {  
            const getUser = async () => {
              try {
                const userData:User | null = await fetchUserById(Number(userId));
                if(userData){     
                    setUser(userData)  
                }
                else{
                setError("ユーザーが見つかりませんでした。")
                }
              } catch (err) {
                setError("ユーザー情報の取得に失敗しました。"+ err);
              }
            };   
            getUser();
    }, []);

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                ユーザー詳細
            </Typography>
            {user &&<UserDetails user={user} />}
        </Box>
    )
};

export default UserDetailsPage;