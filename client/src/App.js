import React, {Component} from 'react';
import logo from './logo.svg';
import './assets/css/App.css';
import {BrowserRouter, HashRouter} from 'react-router-dom';
import routes from './routes';

import {
    blue400, blue800,
    indigo500,
    grey100, grey300, grey400, grey500,
    white, fullBlack,
} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
const muiTheme = getMuiTheme({
    fontFamily: 'Roboto',
    palette: {
        primary1Color: blue400,
        primary2Color: blue800,
        primary3Color: grey400,
        accent1Color: indigo500,
        accent2Color: grey100,
        accent3Color: grey500,
        textColor: fullBlack,
        alternateTextColor: white,
        canvasColor: white,
        borderColor: grey300,
        pickerHeaderColor: blue400,
        shadowColor: fullBlack,
    },
});

const Router = history.pushState ? BrowserRouter : HashRouter;


class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <Router>
                    {routes}
                </Router>
            </MuiThemeProvider>
        );
    }
}

export default App;
