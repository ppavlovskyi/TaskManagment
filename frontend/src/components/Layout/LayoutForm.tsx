import { Box, IconButton, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'


interface Props {
  children: React.ReactNode
}

const LayoutForm = ({ children }: Props) => {
  return (
    <Box width="99vw" sx={{ textAlign: 'center' }}>
     <Typography variant='h3' margin="20px">COMPANY</Typography>
    <Box
      sx={{
        marginTop: '100px',
        border: `1px solid gray`,
        borderRadius: '16px',
        padding: '40px',
        display: 'inline-block',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      <Link to={'/'}>
        <IconButton sx={{ position: 'absolute', top: '20px', right: '20px' }}>
      </IconButton></Link>

      {children}
    </Box>
  </Box>
  )
}

export default LayoutForm