import React from 'react';
import Restart from './Restart';
import {connect} from 'react-redux';
import {generateSms,compareSms} from '../actions/index';
import history from '../history';
import {Field,reduxForm} from 'redux-form';


class SmsConfirm extends React.Component {

    componentDidMount(){

    }

    onSubmit = (formValues) => {
        this.props.compareSms(formValues.smscode , this.props.userId);

    }

    renderInput = ({input,label}) => { //Form values like Filed name, surname are passed as props
        return (
            <div>
                <label>{label}</label>
                <input {...input} autoComplete = "off"/>
            </div>
        );
    }

    goBack = event => {
        event.preventDefault();
        history.push('./EmailPhone');
    }

    render(){
        if(!this.props.isSigned){  
            return <div> <Restart/> </div>
        }
        else{
            if( !(this.props.smsGenerated) ){
                return(
                    <div> 
                        Vermis Oldugunuz Telefon Numarasi Gecerli Degil, Lütfen SMS alabileceginiz bir telefon numarasi giriniz.
                        <div>
                            <button onClick={()=>history.push('/EmailPhone')}> Geri Dön</button>
                        </div>
                    </div>
                );
            }
            else{
                return(
                    <div>
                        <div>
                            <form onSubmit={this.props.handleSubmit(this.onSubmit)}> 
                                <Field name="smscode" component={this.renderInput} label="SMS Kodu"/>
                                <button>Ileri</button>
                            </form>
                        </div>
                        <div>
                            <button onClick={this.goBack}>Geri</button>
                        </div>
                    </div>
                );
            }
        }

    }
}

const mapStateToProps = state => {
    return { 
        isSigned : state.userStatus.isSigned,
        userId : state.userStatus.id,
        smsGenerated : state.userStatus.smsGenerated,
        smsCode : state.userStatus.smsCode,
    }
}


const formWrapped = reduxForm({
    form : 'SmsConfirm'
})(SmsConfirm);

export default connect(mapStateToProps,{generateSms,compareSms})(formWrapped);