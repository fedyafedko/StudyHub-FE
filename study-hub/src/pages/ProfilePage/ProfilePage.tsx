import { Box } from "@mui/material";
import ButtonsMenu from "../../components/ButtonsMenu/ButtonsMenu";
import { useEffect, useState } from "react";
import UserResponse from "../../api/models/response/UserResponse";
import User from "../../api/User";
import Profile from "../../components/Profile/Profile";
import Footer from "../../components/Footer/Footer";
import SubjectsCard from "../../components/SubjectsCard/SubjectsCard";
import styles from "./ProfilePage.module.css";

const ProfilePage = () => {
    const [user, setUser] = useState<UserResponse | undefined>(undefined);

    useEffect(() => {
        const me = async () => {
            const response = await User.me();
            setUser(response);
        };

        me();
    }, []);

    return (
        <>
            <Box className={styles.pageBox}>
                <ButtonsMenu activeView="" user={user} />
                <Profile user={user} />
                <SubjectsCard />
            </Box>
            <Footer />
        </>
    );
};

export default ProfilePage;