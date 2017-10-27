import FourOhFour from './pages/fourOhFour';
import React from 'react';
import {FeedbackForm, ReportBugForm} from './pages/embeddedPage';
import {MainFrameContainer} from './core/redux/containers/mainFrameContainer';
import {Playground} from './core/react/playground';
import {Switch, Route} from 'react-router-dom';
import {About, Tospp} from './pages/markdownPages';

export const Main = () => (
    <Switch>
        <Route exact path='/' component={MainFrameContainer}/>
        <Route exact path='/feedbackForm' component={FeedbackForm}/>
        <Route exact path='/reportBugForm' component={ReportBugForm}/>
        <Route exact path='/404' component={FourOhFour}/>
        <Route exact path='/playground' component={Playground}/>
        <Route exact path='/tospp' component={Tospp}/>
        <Route exact path='/about' component={About}/>
    </Switch>
);
