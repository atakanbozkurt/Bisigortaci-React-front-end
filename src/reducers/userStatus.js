
const INITIAL_STATE = {
    isSigned : false,
    id : '',
    name : '',
    surname : '',
    email : '',
    phone : '',
    smsGenerated : false,
    sex : '',
    birthday : '',
    city : '' ,
    dataFetch : false ,
    company_price_pair : []
}

export default (state = INITIAL_STATE , action) => {
    switch(action.type){
        case "NAME_SURNAME":
            return {...state , isSigned:true , id : action.payload.id , name:action.payload.name , surname:action.payload.surname } ;
        
        case "EMAIL_PHONE":
            return {...state , email:action.payload.email , phone:action.payload.phone };
        
        case "GENERATE_SMS":
            return {...state , smsGenerated:true}
        
        case "CHOOSE_SEX":
            return {...state , sex:action.payload.sex };

        case "CHOOSE_AGE_CITY":
            return {...state , city:action.payload.city , birthday:action.payload.birthday};

        case "SHOW_PRICE":
            return {...state , dataFetch:true , company_price_pair:action.payload.company_price_pair}
        default:
            return state;
    };
};
