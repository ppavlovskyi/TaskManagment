import { UseScrollTriggerOptions } from "@mui/material/useScrollTrigger/useScrollTrigger";
import { User } from "../../utils/typed";
import { loadStateFromLocalStorage, saveLocalStorage } from "../../utils/constant";
import { createSlice } from "@reduxjs/toolkit";


const startState: User = {
  login:false,
  response:{
    name:"",
    token:"",
    userId:"",
  },
  error: null,
  users: []
}

const initialState: User= loadStateFromLocalStorage('userState') || startState;

const userSlice = createSlice({
  name:"user",
  initialState,
  reducers:{
    logIn: (state, action) => {
      state.login = true
      state.response = action.payload
      state.error =null
      saveLocalStorage('userState', state)
    },
    logInFailed: (state, action) => {
      state.login = false
      state.error =action.payload
    },
    logOut: (state) => {
      state.login = false
      state.response = startState.response
      localStorage.clear();
    },
    updateToken:(state, action) =>{
      state.response.token = action.payload
      saveLocalStorage('userState', state)
    },
    saveUsers:(state, action)=>{
      state.users = action.payload
    }
  }
})

export const {logIn,logOut, logInFailed, updateToken,saveUsers} = userSlice.actions;
export default userSlice.reducer