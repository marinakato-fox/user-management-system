
// import { User } from "@/types/User";

// interface UserDetailsProps {
//     user: User;
// }

// const UserDetails :React.FC<UserDetailsProps>= () => {
//     const [users, setUsers] = useState<User[]>([]);
//       const [loading, setLoading] = useState<boolean>(true);
//       const [error, setError] = useState<string | null>(null);
    
//       useEffect(() => {
//         const getUsers = async () => {
//           try {
//             const data = await fetchUsers();
//             console.log(data);
//             setUsers(data);
//           } catch (err) {
//             setError('ユーザーの取得に失敗しました。' + err);
//           } finally {
//             setLoading(false);
//           }
//         };
    
//         getUsers();
//       }, []);
    
//       if (loading) {
//         return <CircularProgress />;
//       }
    
//       if (error) {
//         return <Alert severity="error">{error}</Alert>;
//       }
//     return()
// };

// export default UserDetails;