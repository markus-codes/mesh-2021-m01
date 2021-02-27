import { MuiThemeProvider } from '@material-ui/core'
import { HashRouter, Route } from 'react-router-dom'

import { theme } from './config';

import { NavBar } from './components/bars/NavBar'
import { Index } from './pages/Index'
import { PageOne } from './pages/PageOne'
import { PageTwo } from './pages/PageTwo'
 
function App() {
  document.body.style.marginTop = '80px'

  return (
    <MuiThemeProvider theme={theme} >
      <HashRouter basename="/">
        <NavBar />
        <Route path="/" component={Index} exact />
        <Route path="/pageone" component={PageOne} exact />
        <Route path="/pagetwo" component={PageTwo} exact />
      </HashRouter>
    </MuiThemeProvider>
  );
}

export default App;
