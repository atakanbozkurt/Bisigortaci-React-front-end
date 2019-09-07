import React from 'react';
import axios from 'axios';

class SmsConfirm extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
            smscode : '', 
            customer_id : this.props.customer_id,
            //customer_id : sessionStorage.getItem('customer_id'),
            smsGeneration : false
        };
    }

    async componentDidMount (){
        //Generate Sms code to given user Id's phone
        await axios.get(`http://127.0.0.1:8000/api/customers/generateSms/${this.state.customer_id}`)
            .then(response => {
                console.log(response); //response.data should contain true or false regarding that sms is generated
                if(response.status === 200) {
                    console.log('Sms generated, backend works OK',response.status);
                    this.setState({smsGeneration:true});
                }
                else{
                    console.log('Something went wrong, sms could not sent');
                }
            })
            .catch(function (error) {
            // handle error
                console.log(error);
            })
            .finally(function () {
            // always executed
        });
    }

    onSmsChange = async event => { //Control smscode in state
        await this.setState({ smscode : event.target.value });
    }

    onFormSubmit = async event => { //Control form submission
        
        console.log( 'User state :' , this.state );
        event.preventDefault();
        if(this.state.smsGeneration === true){
            await axios.post(`http://127.0.0.1:8000/api/customers/compareSms/${this.state.customer_id}` ,{
                smscode : this.state.smscode
              })
              .then(response => {
                if(response.status === 200 ){
                    if(response.data === true){
                        console.log('Sms entered correct');
                        this.props.history.push('/Sex');
                    }
                    else{
                        console.log('Sms entered wrong');
                    }
                }
                else{
                    console.log('Server side error');
                }
              })
              .catch(function (error) {
                console.log(error);
              });
        }
        else{
            console.log('Sms Could not sent to given phone number');
        }
    }

    goBackToEmailPhone = event => { //Go back to previous page
        event.preventDefault();
        this.props.history.push('/EmailPhone');
    }

    render(){
        return(
            <div>
                <div>Lutfen Telefonunuza Gelen Onay Kodunu giriniz</div>
                <div>
                    <form onSubmit = {this.onFormSubmit} >
                        <input type="text"  value={this.state.smscode} onChange={this.onSmsChange}/>
                        <button>Onayla</button>
                    </form>
                </div>
                <div>
                    <button onClick = {this.goBackToEmailPhone} >Geri Dön</button>
                </div>
            </div>
        );
    }

}
export default SmsConfirm;