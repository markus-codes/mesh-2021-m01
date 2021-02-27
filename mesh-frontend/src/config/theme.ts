import { createMuiTheme } from "@material-ui/core";


export const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#03a9f4',
            contrastText: 'FFFFFF'
        },
        secondary: {
            main: '#2979ff',
            contrastText: 'FFFFFF'
        }   
    },
    typography: {
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
      }
})
