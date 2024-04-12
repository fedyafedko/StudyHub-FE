import { Box } from "@mui/material";
import ButtonsMenu from "../../components/ButtonsMenu/ButtonsMenu";
import MarkTable from "../../components/StudentMarkTable/StudentMarkTable";
import ProfileMenu from "../../components/ProfileMenu/ProfileMenu";
import Footer from "../../components/Footer/Footer";
import styles from './ListSubjectsPage.module.css';
import { useEffect, useState } from "react";
import UserResponse from "../../api/models/response/UserResponse";
import User from "../../api/User";
import ListSubjects from "../../components/ListSubjects/ListSubjects";

const ListSubjectsPage = () => {
  const [user, setUser] = useState<UserResponse | undefined>(undefined);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await User.me();
        setUser(response);
      } catch (error) {
        console.error(error);
        setUser(undefined);
      }
    };

    fetchUser();
  }, []);
  return (
    <>
      <Box className={styles.pageBox}>
        <ButtonsMenu activeView="subjects" user={user} />
        <Box className={styles.contentBox}>
          <Box className={styles.line} sx={{
            fontSize: '24px',
            padding: '20px',
            fontWeight: 'bold',
          }}>
            Subjects
          </Box>
          <ListSubjects />
        </Box>
        <ProfileMenu user={user} />
      </Box>
      <Footer />
    </>
  );
};

export default ListSubjectsPage;