import { Box } from "@mui/material";
import ButtonsMenu from "../../components/ButtonsMenu/ButtonsMenu";
import Footer from "../../components/Footer/Footer";
import ProfileMenu from "../../components/ProfileMenu/ProfileMenu";
import styles from './DashboardPage.module.css';
import StudentMarkTable from "../../components/StudentMarkTable/StudentMarkTable";
import { useEffect, useState } from "react";
import UserResponse from "../../api/models/response/UserResponse";
import User from "../../api/User";
import SubjectsCard from "../../components/SubjectsCard/SubjectsCard";
import DashboardInviteForm from "../../components/DashboardInviteForm/DashboardInviteForm";

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
          {
            user?.role.toLowerCase() === 'student' && (
              <StudentMarkTable/>
            )
          }
          {
            user?.role.toLowerCase() === 'teacher' && (
              <Box className={styles.teacherBox}>
                <DashboardInviteForm />
                <SubjectsCard />
              </Box>
            )
          }
        </Box>
        <ProfileMenu user={user}/>
      </Box>
      <Footer />
    </Box>
  );
};

export default DashboardPage;