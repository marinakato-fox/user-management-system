
import { useState } from "react";
import { User } from "../types/User"
import UserCard from './UserCard';/// ./ファイル名　→　おなじ階層のファイル　../→　一個上の階層のファイル
import { log } from "console";

interface UserListProps {
    initialUsers: User[];
}


const UserList: React.FC<UserListProps> = ({ initialUsers }) => {
    const [users, setUsers] = useState<User[]>(initialUsers);

    const handleUserDelete = (deletedUserId: number) => {///削除ボタン実行時に受け取る削除したいユーザーのid(userId)と全ユーザーid(user.id)が一致しないものを残して新しい配列にする
        setUsers((initialUsers) => initialUsers.filter((user:User) => { user.id !== deletedUserId }))
        
    }
    return (
        <>
            {users.map(user => (
                <UserCard key={user.id} user={user} onUserDeleted={handleUserDelete} />
            ))}
        </>
    )
};

export default UserList;

