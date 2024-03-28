import { Box, Typography, Card, Button, Avatar } from "@mui/material";
import courses from "../../img/courses.png";
import styles from './ProfileMenu.module.css';
import UserResponse from "../../api/models/response/UserResponse";
import { useNavigate } from "react-router-dom";

const ProfileMenu = (props: {user: UserResponse | undefined}) => {
    const navigate = useNavigate();
    return (
        <Box className={styles.profileBox}>
            <Typography sx={{
                fontSize: '20px',
                fontWeight: 'bold',
                alignSelf: 'flex-start',
            }}>Profile</Typography>
            <Card className={styles.profileCard} sx={{ borderRadius: '24px' }}>
                <Box className={styles.nameBox} sx={{ alignItems: 'center' }}>
                    <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>{props.user?.fullName}</Typography>
                    <Typography sx={{ fontSize: '14px' }}>{props.user?.email}</Typography>
                </Box>
                <Avatar sx={{ width: 90, height: 90 }} src={`http://localhost:5209${props.user?.avatar}`}>M</Avatar>
                <Button
                    color="primary"
                    variant="contained"
                    className={styles.button}
                    onClick={() => { navigate('/profile') }}
                    sx={{ textTransform: 'none', borderRadius: '24px' }}>
                    Profile
                </Button>
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