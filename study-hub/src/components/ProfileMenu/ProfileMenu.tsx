import { Box, Typography, Card, Button, Avatar } from "@mui/material";
import courses from "../../img/courses.png";
import styles from './ProfileMenu.module.css';

const ProfileMenu = () => {
    return (
        <Box className={styles.profileBox}>
            <Typography sx={{
                fontSize: '20px',
                fontWeight: 'bold',
                alignSelf: 'flex-start',
            }}>Profile</Typography>
            <Card className={styles.profileCard} sx={{ borderRadius: '24px' }}>
                <Button
                    color="primary"
                    variant="contained"
                    className={styles.button}
                    sx={{ textTransform: 'none', borderRadius: '24px' }}>
                    Profile
                </Button>
                <Avatar sx={{ width: 90, height: 90 }}>M</Avatar>
                <Box className={styles.nameBox} sx={{ alignItems: 'center' }}>
                    <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>Владислав Федько</Typography>
                    <Typography sx={{ fontSize: '14px' }}>vladfedko35@gmail.com</Typography>
                </Box>
            </Card>
            <Card className={styles.nextExamCard}
                sx={{ borderRadius: '24px' }}>
                <img src={courses} alt="courses" className={styles.examImg} />
                <Box className={styles.nameBox}>
                    <Typography sx={{ fontWeight: 'bold', fontSize: '13px' }}>
                        World Economy Exam
                    </Typography>
                    <Typography sx={{ fontSize: '11px' }}>Monday, 15 May 2023<br />11AM</Typography>
                </Box>
            </Card>
        </Box>
    );
};

export default ProfileMenu;