import { Box } from "@mui/material";
import ButtonsMenu from "../../components/ButtonsMenu/ButtonsMenu";
import Footer from "../../components/Footer/Footer";
import ProfileMenu from "../../components/ProfileMenu/ProfileMenu";
import styles from './DashboardPage.module.css';
import MarkTable from "../../components/MarkTable/MarkTable";

const DashboardPage = () => {
  return (
    <Box>
      <Box className={styles.pageBox}>
        <ButtonsMenu activeView="dashboard" />
        <Box className={styles.contentBox}>
          <Box className={styles.line}>
          </Box>
          <MarkTable/>
        </Box>
        <ProfileMenu />
      </Box>
      <Footer />
    </Box>
  );
};

export default DashboardPage;