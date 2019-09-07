import React from 'react';
import Restart from './Restart'
import {Field,reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {createEmailPhone,generateSms} from '../actions/index';
import history from '../history';



class EmailPhone extends React.Component {


    onSubmit = (formValues) => {
        this.props.createEmailPhone(formValues , this.props.userId); //update DB
        this.props.generateSms(this.props.userId); //generate sms
    }

    renderInput = ({input,label,meta,placeholder}) => { //Form values like Filed email, phone are passed as props
        return (
            <div>
                <label>{label}</label>
                <input {...input} placeholder={placeholder} autoComplete = "off"/>
                <div>{this.renderError(meta)}</div>
            </div>
        );
    }

    renderError({error,touched}) { //Take error and touched from meta input, Render error only if its touched and invalid
        if(touched && error){
            return (
                <div>
                    {error}
                </div>
            );
        }
    }

    goBack = event => {
        event.preventDefault();
        history.push('./NameSurname');
    }

    render(){
        if( !this.props.isSigned ){
            return <div><Restart/></div>
        }
        else{
            return(
                <div>
                    <div>
                        <form onSubmit={this.props.handleSubmit(this.onSubmit)}> 
                            <Field name="email" component={this.renderInput} label="Email" placeholder="örnek@gmail.com"/>
                            <Field name="phone" component={this.renderInput} label="Telefon Numarasi" placeholder="530 000 0000"/>
                            <button>Ileri</button>
                        </form>
                    </div>
                    <div><button onClick={this.goBack}>Geri</button></div>
                </div>

            );
        }
    }
    
}


const validate = (formValues) => {
    //If form is entered correct, return empty object
    const errors = {};
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    if(!formValues.email){
        errors.email = 'Lutfen email giriniz'
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email)) {
        errors.email = 'Lütfen dogru formatta giriniz'
    }

    if(!formValues.phone){
        errors.phone = 'Lütfen telefonunuzu giriniz'
    }
    
    else if( !(formValues.phone.match(phoneno))){
        errors.phone = 'Lütfen telefon numaranizi 530 000 0000 formatinda giriniz'
    }

    return errors;
}



const formWrapped = reduxForm({
    form : 'EmailPhone',
    validate : validate
})(EmailPhone);

const mapStateToProps = state => {
    return {
        isSigned: state.userStatus.isSigned,
        userId : state.userStatus.id,
        email : state.userStatus.email,
        phone : state.userStatus.phone
    }
}

export default connect(mapStateToProps,{createEmailPhone,generateSms})(formWrapped);
