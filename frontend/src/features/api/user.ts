import { AppDispatch, store } from "../../app/store";
import { UserLoginBody, UserRegisterBody } from "../../utils/typed";
import { logIn, logInFailed, logOut, saveUsers } from "../slice/userSlice";

export const registerUser = (userData: UserRegisterBody) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_USER_URL}/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        if (response.status === 422) {
          throw new Error(`data.message`);
        }
        throw new Error(`Register failed`);
      }
      const data = await response.json();
      return data;
    } catch (error: any) {
      throw error;
    }
  };
};

export const login = (userData: UserLoginBody) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_USER_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        dispatch(logInFailed(errorData));
        return;
      }

      const data = await response.json();
      dispatch(logIn(data));
    } catch (error: any) {
      console.log(error);
    }
  };
};

export const refreshToken = (token: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_USER_URL}/auth/refreshToken`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Updating token failed`);
      } else {
        const data = await response.json();
        dispatch(refreshToken(data.token));
      }
    } catch (error: any) {
      dispatch(logOut());
      dispatch(logInFailed(error));
    }
  };
};

export const getAllUsers = () => {
  return async (dispatch: AppDispatch, getState: typeof store.getState) => {
    try {
      const state = getState();
      const response = await fetch(
        `${process.env.REACT_APP_USER_URL}/auth/users`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${state.user.response.token}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);

        return;
      }

      const data = await response.json();
      dispatch(saveUsers(data));
    } catch (error: any) {
      console.log(error);
    }
  };
};
