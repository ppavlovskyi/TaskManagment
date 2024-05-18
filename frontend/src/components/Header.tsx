import { Box, Button, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logOut } from "../features/slice/userSlice";
import { useNavigate } from "react-router-dom";
import NotificationsPanel from "./NotificationsPanel";

const Header = () => {
  const userName = useAppSelector((state) => state.user.response.name);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout =()=>{
dispatch(logOut())
navigate('/')
  }
  return (
    <>
      <Box
        sx={{
          padding: "10px 5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#1E212C",
          color: "#fff",
          height: "50px",
        }}
      >
        <Typography variant="h5" fontWeight={600}>
          {userName}
        </Typography>
        <Box display="flex">
          <NotificationsPanel/>
          <Button
            variant="contained"

            sx={{ marginX: "20px", borderRadius: "20px", backgroundColor:"#ff6333" }}
            onClick={handleLogout}
          >
            Log out
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Header;
