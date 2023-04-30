import {InputBase, styled} from "@mui/material";

export const SelectInput = styled(InputBase)(({ theme }) => ({
  width : '100%',
  '& .MuiInputBase-input': {
    borderRadius: '0.5rem',
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: 8,
    height : 24,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    "& :focus" : {
      borderRadius: '0.5rem'
    }
  },
  "& :focus" : {
    borderRadius: '0.5rem'
  }
}));