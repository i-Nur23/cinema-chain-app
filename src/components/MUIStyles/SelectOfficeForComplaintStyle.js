import {InputBase, styled} from "@mui/material";

export const SelectOfficeForComplaintStyle = styled(InputBase)(({ theme }) => ({
  width : '100%',
  '& .MuiInputBase-input': {
    borderTopLeftRadius: '0.5rem',
    borderTopRightRadius: '0.5rem',
    borderBottomLeftRadius: '0',
    borderBottomRightRadius: '0',
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #9ca3af',
    fontSize: 16,
    padding: '8px 12px 8px 12px',
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
      borderTopLeftRadius: '0.5rem',
      borderTopRightRadius: '0.5rem',
      borderBottomLeftRadius: '0',
      borderBottomRightRadius: '0',
    }
  },
  "& :focus" : {
    borderTopLeftRadius: '0.5rem',
    borderTopRightRadius: '0.5rem',
    borderBottomLeftRadius: '0',
    borderBottomRightRadius: '0',
  }
}));