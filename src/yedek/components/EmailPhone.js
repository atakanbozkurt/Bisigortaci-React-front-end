import React from 'react';
import SimpleReactValidator from 'simple-react-validator';
import axios from 'axios';

class EmailPhone extends React.Component{
    
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator();
        this.state = {
            email : this.props.userInfo.email,
            phone : this.props.userInfo.phone,
            customer_id : this.props.userInfo.customer_id
            //customer_id : sessionStorage.getItem('customer_id')
        };
    }

    componentDidMount(){
        console.log('Previous page:' , this.props.userInfo.previouspage);
        console.log('Page:',this.props.userInfo.page);
    }

    onFormChange = async event => { //Handles form input changes
        const name = event.target.name;
        const value = event.target.value;

        await this.setState({
            [name] : value
        });
    };


    //Update Email and Phone on DataBase
    onFormSubmit =  async event => {
        event.preventDefault();
        if (this.validator.allValid()) {
            //axios post
            await axios.post(`http://127.0.0.1:8000/api/customers/updateEmailPhone/${this.state.customer_id}` ,{
                email : this.state.email,
                phone: this.state.phone
              })
              .then(response => {
                console.log('Email and phone updated' , response);
              })
              .catch(function (error) {
                console.log(error);
              });
            //Store User Infro in APP.JS before moving forward
            this.props.updateEmailPhone(this.state.email,this.state.phone);
            this.props.history.push('/SmsConfirm');
        }
        else {
            this.validator.showMessages();
            // rerender to show messages for the first time
            // you can use the autoForceUpdate option to do this automatically`
            this.forceUpdate();
        }   
    }

    //Go Back to Name Surname Component
    goBackToNameSurname = async event => {
        event.preventDefault();
        this.props.history.push('/NameSurname');
    }

    render(){
        return(
            <div>
                <div>Telefon Numaranizi ve Email </div>
                <div>
                    <form onSubmit={this.onFormSubmit}>
                        <div>
                            Email
                            <div><input type="text" name = "email" value={this.state.email} onChange={this.onFormChange} placeholder="email@bisigortaci.com"/></div>
                            <div>{this.validator.message('Mail', this.state.email, 'required|email')}</div>
                        </div>
                        <div>
                            Telefon
                            <div><input type="text" name = "phone" value={this.state.phone} onChange={this.onFormChange} placeholder="(555) 000 00 00"/></div>
                            <div>{this.validator.message('Phone', this.state.phone, 'required|phone')}</div>
                        </div>
                        <div>
                            <button>Ilerle</button>
                        </div>
                    </form>
                </div>
                <div>
                    <button onClick = {this.goBackToNameSurname} >Geri Dön</button>
                </div>
            </div>
        );
    }

}
export default EmailPhone;