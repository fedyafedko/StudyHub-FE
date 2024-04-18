import { Box, Typography, Card, Button, Avatar } from "@mui/material";
import courses from "../../img/courses.png";
import styles from './ProfileMenu.module.css';
import UserResponse from "../../api/models/response/UserResponse";
import { useNavigate } from "react-router-dom";
import profile from '../../img/Profile.png';
import { useEffect, useState } from "react";
import AssignmentResponse from "../../api/models/response/AssignmentResponse";
import Assignment from "../../api/Assignment";

function splitDateTime(dateTime: Date) {
    // Extract date components
    const dateString = dateTime.toLocaleDateString("en", {
        year: "numeric",
        day: "2-digit",
        month: "long",
      });

    // Extract time components
    const timeString = dateTime.toLocaleTimeString();

    return (
        <div>
            <div>{dateString}</div>
            <div>{timeString}</div>
        </div>
    );
}

const ProfileMenu = (props: { user: UserResponse | undefined }) => {
    const navigate = useNavigate();
    const [assignments, setAssignments] = useState<AssignmentResponse | undefined>();

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const response = await Assignment.getNextAssignment();
                setAssignments(response);
            } catch (error) {
                console.error(error);
            }
        };

        fetchAssignments();
    }, []);
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
                <Avatar sx={{ width: 90, height: 90 }} src={props.user?.avatar ? `http://localhost:5209${props.user?.avatar}` : profile}>M</Avatar>
                <Button
                    color="primary"
                    variant="contained"
                    className={styles.button}
                    onClick={() => { navigate('/profile') }}
                    sx={{ textTransform: 'none', borderRadius: '24px' }}>
                    Profile
                </Button>
            </Card>
            {props.user?.role === 'Student' ? (
                <Card className={styles.nextExamCard} sx={{ borderRadius: '24px' }} onClick={() => navigate(`/assignment/${assignments?.id}`)}>
                    <img src={courses} alt="courses" className={styles.examImg} />
                    <Box className={styles.nameBox}>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                            {assignments?.title}
                        </Typography>
                        <Typography sx={{ fontSize: '14px' }}>
                            {assignments?.openingDate ? splitDateTime(new Date(assignments.openingDate)) : ''}
                        </Typography>
                    </Box>
                </Card>
            ) : null}

        </Box>
    );
};

export default ProfileMenu;