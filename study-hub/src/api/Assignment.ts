import exp from "constants";
import AssignmentResponse from "./models/response/AssignmentResponse";
import API from "./repository/Api";

const Assignment = {
    getNextAssignment: async (): Promise<AssignmentResponse | undefined> => {
        const response = await API.get<AssignmentResponse>(`/assignment/next-assignment`);
        if (response.success) {
            return response.data;
        }

        return response.error;
    },
};

export default Assignment;