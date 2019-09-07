import React from 'react';
import {Router,Route} from 'react-router-dom';
import history from '../history'
import Header from './Header';
import Landing from './Landing';
import NameSurname from './NameSurname';
import EmailPhone from './EmailPhone';
import SmsConfirm from './SmsConfirm';
import Sex from './Sex';
import AgeCity from './AgeCity';
import BidList from './BidList';


const App = () => {
    return(
        <div>
            <Router history={history}>
                <Header/>
                <Route path="/" exact component={Landing}/>
                <Route path="/NameSurname" exact component={NameSurname}/>
                <Route path="/EmailPhone" exact component={EmailPhone}/>
                <Route path="/SmsConfirm" exact component={SmsConfirm}/>
                <Route path="/Sex" exact component={Sex}/>
                <Route path="/AgeCity" exact component={AgeCity}/>
                <Route path="/BidList" exact component={BidList}/>
            </Router>
        </div>
    );
}

export default App;