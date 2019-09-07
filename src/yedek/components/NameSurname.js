import React from 'react';
import SimpleReactValidator from 'simple-react-validator';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

class NameSurname extends React.Component{

    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator();
        this.state = {
            name : this.props.name,
            surname : this.props.surname,
            customer_id : '',
            submitted : false,
        } 
      }
    
    
    componentDidMount(){
       console.log('Previous page:' , this.props.previouspage);
       console.log('Page:',this.props.page);
    }
    componentWillUnmount(){
    }

    onFormSubmit = async event => {
        event.preventDefault();
        if (this.validator.allValid()) {
            await axios.post('http://127.0.0.1:8000/api/customers/create', {
                name : this.state.name,
                surname: this.state.surname
              })
              .then(response => {
                //console.log('Customer created',response);
                //WE NEED TO TAKE THE ID OF THE RECENTLY CREATED CUSTOMER TO MATCH IT WITH RIGHT ID IN FUTURE!!
                this.setState({customer_id : response.data});
              })
              .catch(function (error) {
                console.log(error);
              });
            //Store user information in APP.JS before moving forward
            await this.props.updateNameSurname(this.state.name,this.state.surname,this.state.customer_id);
            this.props.history.push('/EmailPhone');
        }
        else {
            this.validator.showMessages();
            // rerender to show messages for the first time
            // you can use the autoForceUpdate option to do this automatically`
            this.forceUpdate();
        }
    }


    onFormChange = async event => {  //Handles form input changes
        const name = event.target.name;
        const value = event.target.value;
        await this.setState({
            [name] : value
        });
    }


    render(){
        if(this.state.submitted === false){
            return(
                <div>
                    <div>Merhaba, size en uygun saglik policesi bulmaniza yardimci olacagim, adiniz ogrenebilir miyim?</div>
                    <div>
                        <form onSubmit={this.onFormSubmit}>
                            <div>
                                <div><input type="text"  name = "name" value={this.state.name} onChange={this.onFormChange}  placeholder="İsim"/></div>
                                <div>{this.validator.message('name', this.state.name, 'required|alpha')}</div>
                            </div>
                            <div>
                                <div><input type="text"  name = "surname" value={this.state.surname} onChange={this.onFormChange} placeholder="Soyisim"/></div>
                                <div>{this.validator.message('surname', this.state.surname, 'required|alpha')}</div>
                            </div>
                            <div>
                                <button type="submit">Ilerle</button>
                            </div>
                        </form>
                    </div>

                </div>
            );
        }
        else{
            return <Redirect to="/EmailPhone"/>
        }
    }
}
export default NameSurname;