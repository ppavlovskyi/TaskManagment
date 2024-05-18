import { Box, Link, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { routes } from '../routes/routes';


const NotFound = () => {

  return (
    <Box sx={{display:'flex', justifyContent: 'center', alignItems:'center',flexDirection:"column", textAlign:'center'}}>
      <Typography >Oooops🙈 Page was NOT Found</Typography>
      <Link href="/">Go home</Link>
    </Box>
  )
}

export default NotFound