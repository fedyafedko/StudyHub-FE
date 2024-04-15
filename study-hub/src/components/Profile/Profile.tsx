import { Box, Button, Card, Grid, Typography } from "@mui/material";
import UserResponse from "../../api/models/response/UserResponse";
import Field from "../Field/Field";
import styles from "./Profile.module.css";
import profile from '../../img/Profile.png';

const Profile = (props: { user: UserResponse | undefined }) => {
    return (
        <Card className={styles.profileCard} sx={{ borderRadius: '24px'}}>
            <Box
              component="img" className={styles.avatar}
              alt="The house from the offer."
              src={props.user?.avatar ? `http://localhost:5209${props.user?.avatar}` : profile}/>
            <Grid
                container
                rowSpacing={2}
                spacing={2}
                padding='30px'
            >
                <Grid item xs={6}>
                    <Field label="Full Name" content={props.user?.fullName || ''} />
                </Grid>
                <Grid item xs={6}>
                    <Field label="Email" content={props.user?.email || ''} />
                </Grid>
                <Grid item xs={6}>
                    <Field label="Group" content={props.user?.group || ''} />
                </Grid>
                <Grid item xs={6}>
                    <Field label="Course" content={props.user?.course || ''} />
                </Grid>
                <Grid item xs={6}>
                    <Field label="Faculty" content={props.user?.faculty || ''} />
                </Grid>
                <Grid item xs={6}>
                    <Field label="Telegram" content={props.user?.telegram || ''} />
                </Grid>
            </Grid>

        </Card>
    );
};

export default Profile;