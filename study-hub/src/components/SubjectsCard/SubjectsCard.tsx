import { Box, Button, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import SubjectResponse from "../../api/models/response/SubjectResponse";
import Subject from "../../api/Subject";
import { useNavigate } from "react-router-dom";

const SubjectCard = () => {
    const navigate = useNavigate();
    const [subjects, setSubjects] = useState<SubjectResponse[] | undefined>(undefined);

    useEffect(() => {
        const getSubjects = async () => {
            const response = await Subject.getSubjectsForUser();
            setSubjects(response);
        };

        getSubjects();
    }, []);

    return (
        <Card sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '400px',
            height: '500px',
            borderRadius: '24px',
            overflowY: 'auto',
        }}>
            {subjects ? (
                <>
                    <Typography sx={{ fontSize: '20px', fontWeight: 'bold', mt: '20px', margin: '30px' }}>My Subjects</Typography>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                    }}>
                        {subjects.map((subject, index) => (
                            <Card
                                key={index}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    width: '330px',
                                    height: '60px',
                                    borderRadius: '12px',
                                    backgroundColor: '#d9d9d9',
                                }}
                            >
                                <Box>
                                    <Typography sx={{ fontSize: '16px', fontWeight: 'bold', ml: '10px', mt: '10px' }}>
                                        {subject.title}
                                    </Typography>
                                    <Typography sx={{ fontSize: '12px', ml: '10px' }}>{subject.teacher.fullName}</Typography>
                                </Box>
                                <Button
                                    variant="contained"
                                    onClick={() => { navigate(`/subject/${subject.id}`) }}
                                    sx={{
                                        backgroundColor: '#D41A6D',
                                        margin: '15px',
                                        color: 'white',
                                        borderRadius: '24px',
                                        width: '100px',
                                        height: '30px',
                                    }}
                                >
                                    View
                                </Button>
                            </Card>
                        ))}
                    </Box>
                </>
            ) : (
                <Typography variant="h5" sx={{
                    fontWeight: 'bold',
                    padding: '20px',
                }}>No subjects</Typography>
            )}
        </Card>
    );
};

export default SubjectCard;
