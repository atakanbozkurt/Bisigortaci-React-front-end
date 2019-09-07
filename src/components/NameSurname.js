import React from 'react';
import {Field,reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {createNameSurname} from '../actions/index';

class  NameSurname extends React.Component{

    componentDidMount(){
        //console.log(this.props);
    }

    onSubmit = (formValues) => {
        this.props.createNameSurname(formValues); //update db
    }

    renderInput = ({input,label,meta}) => { //Form values like Filed name, surname are passed as props
        return (
            <div>
                <label>{label}</label>
                <input {...input} autoComplete = "off"/>
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

    render(){
        return(
            <div>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)}> 
                    <Field name="name" component={this.renderInput} label="Adiniz"/>
                    <Field name="surname" component={this.renderInput} label="Soyadiniz"/>
                    <button>Ileri</button>
               </form>
            </div>
        );
    }
}

//Form field Validation logic is written here
const validate = (formValues) => {
    //If form is entered correct, return empty object
    var letters = /^[A-Za-z]+$/;
    const errors = {};

    if(!formValues.name){
        errors.name = 'Lutfen adinizi giriniz'
    }
    else if( !(formValues.name.match(letters)) ){
        errors.name = 'Lütfen dogru formatta bosluk olmayacak sekilde giriniz'
    }
    if(!formValues.surname){
        errors.surname = 'Lütfen soyadinizi giriniz'
    }
    else if( !(formValues.surname.match(letters)) ){
        errors.name = 'Lütfen dogru formatta bosluk olmayacak sekilde giriniz'
    }
    return errors;
}

const formWrapped = reduxForm({
    form : 'NameSurname',
    validate : validate
})(NameSurname);


const mapStateToProps = (state) => {
    return {
        name : state.userStatus.name,
        surname : state.userStatus.surname
    }
}

export default connect(mapStateToProps,{createNameSurname})(formWrapped);

