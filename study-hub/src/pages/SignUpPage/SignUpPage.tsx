import { Box, Typography } from "@mui/material";
import AuthImg from "../../img/AuthImg.png";
import SignUpForm from "../../components/Forms/SignUpForm/SignUpForm";
import styles from "./SignUpPage.module.css";

const SignUpPage = () => {
    return (
        <Box className={styles.pageContainer}>
            <Box className={styles.imageContainer}>
                <img src={AuthImg} alt="AuthImg" className={styles.authImg} />
            </Box>
            <Box className={styles.formContainer}>
                <Typography variant="h3"
                    sx={{
                        fontWeight: 'bold',
                        color: '#D41A6D',
                        textShadow: '2px 2px 4px #000000',
                        fontFamily: '"Source Sans 3", sans-serif',
                    }}>Study Hub</Typography>
                <SignUpForm />
            </Box>
        </Box>
    );
};

export default SignUpPage;