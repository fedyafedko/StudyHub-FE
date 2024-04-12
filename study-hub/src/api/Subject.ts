import Auth from "./Auth";
import { MarksResponse } from "./models/response/MarksResponse";
import SubjectResponse from "./models/response/SubjectResponse";
import API from "./repository/Api";

const Subject = {
    getSubjectsForUser: async (): Promise<SubjectResponse[] | undefined> => {
        const response = await API.get<SubjectResponse[]>(`/subject/get-subject-for-user`);
        if (response.success) {
            return response.data;
        }

        return response.error;
    },

    getMarksForStudent: async (): Promise<MarksResponse[] | undefined> => {
        const response = await API.get<MarksResponse[]>(`/subject/get-marks-for-student`);
        if (response.success) {
            return response.data;
        }

        return response.error;
    }
}

export default Subject;