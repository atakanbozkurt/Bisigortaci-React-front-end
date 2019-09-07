import React from 'react';
import {BrowserRouter, Route } from 'react-router-dom';
import Landing from './Landing';
import NameSurname from './NameSurname';
import EmailPhone from './EmailPhone';
import SmsConfirm from './SmsConfirm';
import Sex from './Sex';
import AgeCity from './AgeCity';
import BidList from './BidList';
import Blank from './Blank';


class App extends React.Component{
    //State of this component will be updated at every user interaction.
    //Think this component as Redux library. We will update these values and use them till the end.
    state = {
        previouspage: '',
        page : 'Landing',
        customer_id : '',
        name : '',
        surname : '',
        email : '',
        phone : '',
        sex : 'nosex',
        city : 'nocity',
        year : 'noyear',
        prices : []
        
    };

    componentDidMount(){
        //console.log('app is in',this.state);
    }

    componentDidUpdate(){   //Observe changes through console
        //console.log('app is updated' , this.state);
    }

    componentWillUnmount(){
        //console.log('app is out');
    }

    //FUNCTIONS BELOW ARE USED TO UPDATE APP.JS COMPONENTS STATE VALUES AFTER USER INTERACTIONS

    openNameSurname = async event  => {
        await this.setState({
            previouspage: 'Landing',
            page: 'NameSurname'
        });
    }

    updateNameSurname = async (user_name , user_surname , customer_id) => { 
        //Get name , surname and ID  from NameSurname component's state and assign it to APP components state
        await this.setState({
            name : user_name, 
            surname : user_surname ,
            customer_id : customer_id ,
            previouspage : 'NameSurname',
            page : 'EmailPhone'});
        //sessionStorage.setItem('customer_id', customer_id);
    };

    updateEmailPhone = async (user_email , user_phone) => {
        //Get email and phone from EmailPhone component's state and assign it to APP components state
        await this.setState({ email : user_email , phone : user_phone , page : 'SmsConfirm' });
    };


    updateSex = async (user_sex) => {
        //Get sex from Sex component's state and assign it to APP components state
        await this.setState(
            {
                sex : user_sex,
                page : "AgeCity"
            }
        );
        //sessionStorage.setItem('sex', user_sex);
    }

    updateAgeCity = async (user_city , user_year) => {
        //Get age and city from EmailPhone component's state and assign it to APP components state
        await this.setState(
            {
                city : user_city,
                year : user_year,
                page : "BidList"
            }
        );
        //sessionStorage.setItem('year', user_year);
        //sessionStorage.setItem('city', user_city);
    }

    

    renderPages(){
        //Render page according to state
        switch(this.state.page){
            case 'Landing' : return <Landing openNameSurname={this.openNameSurname} />
            case 'NameSurname' : return <NameSurname name={this.state.name} surname={this.state.surname} updateEmailPhone={this.updateEmailPhone}/>
            case 'EmailPhone' : return <EmailPhone  userInfo={this.state} openSmsConfirm={this.openSmsConfirm} goBack = {this.goBackToNameSurname}/>
            case 'SmsConfirm' : return <SmsConfirm  name = {this.state.name} surname = {this.state.surname} openPage={this.openSex}  goBack = {this.openEmailPhone}/>
            case 'Sex' : return <Sex openPage = {this.openAgeCity} customer_id = {this.state.customer_id} />
            case 'AgeCity' : return <AgeCity openPage={this.openPageBidList} goBack = {this.openSex} customer_id={this.state.customer_id}/>
            case 'BidList' : return <BidList userInfo = {this.state}/>
            default: return <div>REFRESH PAGE</div>
        }
    }

    render(){
       return(
           <div>
               <BrowserRouter>
                    <div>APP JS</div>
                    <div>
                        <Route path="/" exact component={(props)=> <Landing {...props} openNameSurname={this.openNameSurname}/>} />
                        <Route path="/NameSurname" exact component={(props)=> <NameSurname {...props} name={this.state.name} surname={this.state.surname} previouspage={this.state.previouspage} page={this.state.page} updateNameSurname={this.updateNameSurname}  />} />
                        <Route path="/EmailPhone" exact component={(props)=> <EmailPhone {...props} userInfo={this.state} updateEmailPhone={this.updateEmailPhone} />} />
                        <Route path="/SmsConfirm" exact component={(props)=> <SmsConfirm {...props}  customer_id={this.state.customer_id}/>} />
                        <Route path="/Sex" exact component={(props)=> <Sex {...props} customer_id={this.state.customer_id} updateSex={this.updateSex}/>} />
                        <Route path="/AgeCity" exact component={(props)=> <AgeCity {...props} customer_id={this.state.customer_id} updateAgeCity={this.updateAgeCity}/>} />
                        <Route path="/BidList" exact component={(props)=> <BidList {...props} userInfo={this.state} />} />
                        <Route path="/Blank" exact component={Blank} />
                        
                    </div>
               </BrowserRouter>
           </div>
       )
    }

}
export default App;