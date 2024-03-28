import { Box } from "@mui/material";
import ButtonsMenu from "../../components/ButtonsMenu/ButtonsMenu";
import Footer from "../../components/Footer/Footer";
import ProfileMenu from "../../components/ProfileMenu/ProfileMenu";
import styles from './DashboardPage.module.css';
import MarkTable from "../../components/MarkTable/MarkTable";
import { useEffect, useState } from "react";
import UserResponse from "../../api/models/response/UserResponse";
import User from "../../api/User";

const DashboardPage = () => {
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
    <Box>
      <Box className={styles.pageBox}>
        <ButtonsMenu activeView="dashboard" user={user}/>
        <Box className={styles.contentBox}>
          <Box className={styles.line}/>
          <MarkTable/>
        </Box>
        <ProfileMenu user={user}/>
      </Box>
      <Footer />
    </Box>
  );
};

export default DashboardPage;