import { Box, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ButtonsMenu from "../../components/ButtonsMenu/ButtonsMenu";
import { useEffect, useState } from "react";
import User from "../../api/User";
import UserResponse from "../../api/models/response/UserResponse";
import Footer from "../../components/Footer/Footer";
import ProfileMenu from "../../components/ProfileMenu/ProfileMenu";
import styles from './SubjectPage.module.css';
import profile from '../../img/Profile.png';
import Subject from "../../api/Subject";
import AssignmentResponse from "../../api/models/response/AssignmentResponse";
import SubjectResponse from "../../api/models/response/SubjectResponse";

const SubjectPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState<UserResponse | undefined>(undefined);
  const [assignments, setAssignments] = useState<AssignmentResponse[] | undefined>([]);
  const [subject, setSubject] = useState<SubjectResponse | undefined>();
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await Subject.getSubjectWithAssignment(id);
        setAssignments(response);
      } catch (error) {
        console.error(error);
        setAssignments([]);
      }
    };

    fetchAssignments();
  }, [])

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const response = await Subject.getSubject(id);
        setSubject(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSubject();
  }, [])

  return (
    <Box>
      <Box className={styles.pageBox}>
        <ButtonsMenu activeView="subjects" user={user} />
        <Box className={styles.contentBox}>
          <Box className={styles.line} />
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{subject?.title}</Typography>
          <Box className={styles.teacherBox}>
            <Box component='img' sx={{ width: '90px', height: '90px' }} src={profile} />
            <Box sx={{ marginLeft: '20px' }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{subject?.teacher.fullName}</Typography>
              <Typography variant="h6">Contact: {subject?.teacher.email}</Typography>
            </Box>
          </Box>
          <Box className={styles.assignmentsBox}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Assignments</Typography>
            {assignments?.map((assignment) => (
            <Box className={styles.listAssignment} onClick={() => navigate(`assignment/${assignment.id}`)}>
              <Typography sx={{ fontWeight: 'bold' }}>{assignment.title}</Typography>
              <Typography>Duration: {assignment.duration.toString()}</Typography>
              <Typography>Opening Date: {new Date(assignment.openingDate).toLocaleString()}</Typography>
              <Typography>Closing Date: {new Date(assignment.closingDate).toLocaleString()}</Typography>
            </Box>
            ))}
          </Box>
        </Box>
        <ProfileMenu user={user} />
      </Box>
      <Footer />
    </Box>
  );
};

export default SubjectPage;