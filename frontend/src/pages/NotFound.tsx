import { Box, Link, Typography } from "@mui/material";
import { useAppDispatch } from "../app/hooks";
import { logOut } from "../features/slice/userSlice";

const NotFound = () => {
  const dispatch = useAppDispatch();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <Typography>Oooops🙈 Page was NOT Found</Typography>
      <div onClick={() => dispatch(logOut())}>
        <Link href="/">Go home</Link>
      </div>
    </Box>
  );
};

export default NotFound;
