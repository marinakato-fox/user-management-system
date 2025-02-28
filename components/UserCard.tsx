// components/UserCard.tsx
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import { User } from "../types/User";
import DeleteUserButton from "./DeleteUserButton";
import CustomCard from "./parts/CustomCard";
interface UserCardProps {
  user: User;
  onUserDeleted: (userId: number) => void;
}
const UserCard: React.FC<UserCardProps> = ({ user, onUserDeleted }) => {
  return (
    <CustomCard
      title={user.name}
      description={`メールアドレス:${user.email} 役割:${user.role}`}
      actions={
        <>
          <Button
          variant="outlined"
          component={Link}
          href={`/users/${user.id}/details`}
        >
          詳細
        </Button>
        <Button
          variant="outlined"
          component={Link}
          href={`/users/${user.id}/edit`}
        >
          編集
        </Button>
        <DeleteUserButton userId={user.id} onDelete={onUserDeleted} />
        </>
      }/>

    // <Card sx={{ minWidth: 275, mb: 2 }}>
    //   <CardContent>
    //     <Typography variant="h5" component="div">
    //       {user.name}
    //     </Typography>
    //     <Typography color="text.secondary">{user.email}</Typography>
    //     <Typography variant="body2">役割: {user.role}</Typography>
    //   </CardContent>
    //   <CardActions>
    //     <Button
    //       variant="outlined"
    //       component={Link}
    //       href={`/users/${user.id}/details`}
    //     >
    //       詳細
    //     </Button>
    //     <Button
    //       variant="outlined"
    //       component={Link}
    //       href={`/users/${user.id}/edit`}
    //     >
    //       編集
    //     </Button>
    //     <DeleteUserButton userId={user.id} onDelete={onUserDeleted} />
    //   </CardActions>
    // </Card>
  );
};
export default UserCard;






// import React from 'react';
// import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
// import { User } from '../types/User';
// import Link from 'next/link';
// import DeleteUserButton from './DeleteUserButton';

// interface UserCardProps {
//   user: User;
//   onUserDelete: (userId: number) => void;
// }

// const UserCard: React.FC<UserCardProps> = ({ user, onUserDelete }) => {
//   return (
//     <Card sx={{ minWidth: 275, mb: 2 }}>
//       <CardContent>
//         <Typography variant="h5" component="div">
//           {user.name}
//         </Typography>
//         <Typography color="text.secondary">
//           {user.email}
//         </Typography>
//         <Typography variant="body2">
//           役割: {user.role}
//         </Typography>
//       </CardContent>
//       <CardActions>
//         <Button size="small" component={Link} href={`/users/${user.id}/details`}>詳細</Button>
//         <Button size="small" component={Link} href={`/users/${user.id}/edit`}>編集</Button>
//         <DeleteUserButton userId={user.id} onDelete={onUserDelete}/>
//       </CardActions>
//     </Card>
//   );
// }

// export default UserCard;