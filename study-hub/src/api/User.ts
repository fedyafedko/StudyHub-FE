import InviteUserRequest from "./models/request/User/InviteUserRequest";
import ResultResponse from "./models/response/ResultResponse";
import UserResponse from "./models/response/UserResponse";
import API from "./repository/Api";

const User = {
    me: async (): Promise<UserResponse | undefined> => {
        const response = await API.get<UserResponse>('/users/me');
        if (response.success) {
            return response.data;
        }

        return response.error;
    },
    inviteUser: async (request: InviteUserRequest): Promise<ResultResponse | undefined> => {
        const response = await API.post<InviteUserRequest, ResultResponse>('/users/invite', { emails: request.emails, role: request.role });
        if (response.success) {
            return response.data;   
        }
    },

}

export default User;