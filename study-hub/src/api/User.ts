import UserResponse from "./models/response/UserResponse";
import API from "./repository/Api";

const User = {
    me: async (): Promise<UserResponse | undefined> => {
        const response = await API.get<UserResponse>('/users/me');
        if (response.success) {
            return response.data;
        }

        return response.error;
    }
}

export default User;