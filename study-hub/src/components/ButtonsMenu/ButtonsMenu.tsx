import { Avatar, Box, Button, Card, IconButton, Typography } from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import styles from './ButtonsMenu.module.css';
import { useNavigate } from "react-router-dom";
import UserResponse from "../../api/models/response/UserResponse";

const ButtonsMenu = (props: { activeView: string, user: UserResponse | undefined }) => {
    const navigate = useNavigate();

    const handleButtonClick = (buttonName: any) => {
        navigate(`/${props.user?.role.toLocaleLowerCase()}/${buttonName}`);
    };

    const handleSignOut = () => {
        localStorage.clear();
        navigate('/');
    };
    return (
        <Box className={styles.menuBox}>
            <Box className={styles.profileBox}>
                <IconButton size="medium"
                onClick={() => navigate('/profile')}>
                    <Avatar sx={{ width: 40, height: 40 }} src={`http://localhost:5209${props.user?.avatar}`}>M</Avatar>
                </IconButton>
                <Box>
                    <Typography
                        sx={{
                            fontWeight: 'bold',
                            fontSize: '14px',
                        }}>
                        {props.user?.fullName}
                    </Typography>
                    <Typography sx={{ fontSize: '11px' }}>{props.user?.email}</Typography>
                </Box>
            </Box>

            <Box className={styles.buttonBox} >
                <Box
                    className={styles.button}
                    sx={{ backgroundColor: props.activeView === 'dashboard' ? '#f0f0f0' : 'transparent' }}
                    onClick={() => handleButtonClick('dashboard')}>
                    <DashboardIcon sx={{ width: '30px', height: '30px' }} />
                    <Typography sx={{ fontSize: '20px' }}>Dashboard</Typography>
                </Box>
                <Box
                    className={styles.button}
                    sx={{ backgroundColor: props.activeView === 'courses' ? '#f0f0f0' : 'transparent' }}
                    onClick={() => handleButtonClick('courses')}
                >
                    <AssignmentIcon sx={{ width: '30px', height: '30px' }} />
                    <Typography sx={{ fontSize: '20px' }}>Courses</Typography>
                </Box>
                <Box
                    className={styles.button}
                    sx={{ backgroundColor: props.activeView === 'performance' ? '#f0f0f0' : 'transparent' }}
                    onClick={() => handleButtonClick('performance')}>
                    <AssessmentIcon sx={{ width: '30px', height: '30px' }} />
                    <Typography sx={{ fontSize: '20px' }}>Performence</Typography>
                </Box>
                <Box
                    className={styles.button}
                    sx={{ backgroundColor: props.activeView === 'teachers' ? '#f0f0f0' : 'transparent' }}
                    onClick={() => handleButtonClick('teachers')}
                >
                    <PeopleAltIcon sx={{ width: '30px', height: '30px' }} />
                    <Typography sx={{ fontSize: '20px' }}>Teachers</Typography>
                </Box>
            </Box>

            <Box className={styles.settingsBox}>
                <Box className={styles.line} />
                <Box
                    className={styles.button}
                    sx={{ backgroundColor: props.activeView === 'settings' ? '#f0f0f0' : 'transparent' }}
                    onClick={() => handleButtonClick('settings')}
                >
                    <SettingsIcon sx={{ width: '30px', height: '30px' }} />
                    <Typography sx={{ fontSize: '20px' }}>Settings</Typography>
                </Box>
                <Box
                    className={styles.button}
                    sx={{ backgroundColor: props.activeView === 'sign-out' ? '#f0f0f0' : 'transparent' }}
                    onClick={() => handleSignOut()}
                >
                    <ExitToAppIcon sx={{ width: '30px', height: '30px' }} />
                    <Typography sx={{ fontSize: '20px' }}>Sign out</Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default ButtonsMenu;