 
 import { User } from"../types/User"
 import   UserCard  from './UserCard';/// ./ファイル名　→　おなじ階層のファイル　../→　一個上の階層のファイル
 
 interface UserListProps{
    users: User[];
 }

 const UserList: React.FC<UserListProps> = ({ users }) => {
    return(
        <>
            {users.map(user => (
                <UserCard key={user.id} user={user} />
            ))}
        </>
    )
 };

 export default UserList;

