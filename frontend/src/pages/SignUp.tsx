import React, { ChangeEvent, useState } from "react";
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
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import { ResponseError, UserRegisterBody } from "../utils/typed";
import LayoutForm from "../components/Layout/LayoutForm";
import { routes } from "../routes/routes";
import { registerUser } from "../features/api/user";

const SignUp = () => {
  const [formData, setFormData] = useState<UserRegisterBody>({
    email: "",
    name: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [validationError, setValidationError] = useState<ResponseError|null>(null);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValidationError(null);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(false);
    setValidationError(null)
    try {
      const data = await registerUser(formData, (e)=>setValidationError(e));
      navigate(routes.HOME);
    } catch (error: any) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LayoutForm>
      <Typography variant="h3" fontSize="24px">
        Registration
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexWrap: "wrap",
          marginTop: "20px",
        }}
      >
        <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
          <InputLabel htmlFor="name">Name</InputLabel>
          <OutlinedInput
            id="name"
            type={"text"}
            value={formData.name}
            name="name"
            onChange={handleInputChange}
            label="Name"
          />
        </FormControl>

        <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
          <InputLabel htmlFor="email">Email</InputLabel>
          <OutlinedInput
            id="email"
            type={"text"}
            value={formData.email}
            name="email"
            onChange={handleInputChange}
            label="Email"
          />
        </FormControl>

        <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            name="password"
            onChange={handleInputChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>

        {validationError && (
          <Typography color="error" variant="body2">
            {validationError.message}{" "}
            {validationError?.data&&validationError.data.reduce((acc, curr)=> `${acc} ${curr.msg}`,"")}
          </Typography>
        )}

        <Button
          sx={{ m: 1, height: "54px", width: "30ch" }}
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </Button>
      </Box>
      <Box sx={{ marginTop: "20px" }}>
        Have an account?
        <Link style={{ marginLeft: "10px" }} to={routes.LOG_IN}>
          Log in
        </Link>
      </Box>
    </LayoutForm>
  );
};

export default SignUp;
