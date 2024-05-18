import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { UserLoginBody } from "../utils/typed";
import LayoutForm from "../components/Layout/LayoutForm";
import { routes } from "../routes/routes";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { login } from "../features/api/user";




const LogIn = () => {
  const loginStatus = useAppSelector((state) => state.user.login);
  const error = useAppSelector((state) => state.user.error);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UserLoginBody>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = React.useState(false);

  const handleSubmit = () => {
    dispatch(login(formData));
  };

  useEffect(() => {
    if (loginStatus) {
      navigate(routes.TASKS);
    }
  }, [loginStatus]);

  return (
    <LayoutForm>
      <Typography variant="h3" fontSize="24px">Log in</Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor="email">Email</InputLabel>
          <OutlinedInput
            id="email"
            type="text"
            value={formData.email}
            name="email"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            label="Email"
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            name="password"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword((prev) => !prev)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <Button
          sx={{ m: 1, height: "54px", width: "20ch" }}
          variant="contained"
          onClick={handleSubmit}
        >
          Log in
        </Button>
      </Box>
      {error && (
        <Typography sx={{ color: "red" }}>
          {error.message}
        </Typography>
      )}
      <Box sx={{ marginTop: "20px" }}>
        No account? <Link style={{ marginLeft: "10px" }} to={routes.SIGN_UP}>Registration</Link>
      </Box>
    </LayoutForm>
  );
};

export default LogIn;
