import { Typography } from '@mui/material';
import AuthImg from '../../img/AuthImg.png';
import SignInForm from '../../components/Forms/SignInForm/SignInForm';
import styles from './SignInPage.module.css';

const SignInPage = () => {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.formContainer}>
                <div className={styles.welcomeText}>
                    <Typography variant="h4" sx={{}}>
                        StudyHub
                    </Typography>
                </div>
                <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                    Welcome back!
                </Typography>
                <SignInForm />
            </div>
            <div className={styles.imageContainer}>
                <img src={AuthImg} alt="AuthImg" className={styles.authImg} />
            </div>
        </div>
    );
}

export default SignInPage