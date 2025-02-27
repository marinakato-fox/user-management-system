
import { User } from "@/types/User";
import { Typography } from "@mui/material";

interface UserDetailsProps {
    user: User;
}

const UserDetails :React.FC<UserDetailsProps>= ({user}) => {
    return(
        <>
            <Typography>ID:{user.id}</Typography>
            <Typography>名前:{user.name}</Typography>
            <Typography>メールアドレス:{user.email}</Typography>
            <Typography>役職:{user.role}</Typography>
        </>
    )
};

export default UserDetails;