import axios from 'axios';
import history from '../history';

export const createNameSurname = (formValues) => {
    return async (dispatch,getState) => {
        await axios.post('http://127.0.0.1:8000/api/customers/create', {
                name : formValues.name ,
                surname: formValues.surname
        })
        .then(response => {

        //Pass values to reducers
        dispatch({
            type: "NAME_SURNAME",
            payload: { 
                id : response.data,
                name: formValues.name,
                surname : formValues.surname
            }
        });

        //Navigate to next page
        history.push('/EmailPhone');

        })
        .catch(function (error) {
            console.log(error);
        });
    }
}


export const createEmailPhone = (formValues , userId) => {
    return async (dispatch,getState) => {
        await axios.post(`http://127.0.0.1:8000/api/customers/updateEmailPhone/${userId}` ,{
                email : formValues.email,
                phone: formValues.phone
        })
        .then(response => {

        //Pass values to reducers
        dispatch({
            type: "EMAIL_PHONE",
            payload: { 
                email: formValues.email,
                phone : formValues.phone
            }
        });

        })
        .catch(function (error) {
            console.log(error);
        });
    }
}



export const generateSms =  userId => {
    return async (dispatch,getState) => {
        await axios.get(`http://127.0.0.1:8000/api/customers/generateSms/${userId}`)
        .then(response => {
            if(response.status === 200) {
                //Let state know that sms has been generated successfully
                dispatch({
                    type: "GENERATE_SMS",
                    payload: { 
                        smsGenerated : true
                    }
                });
                history.push('/SmsConfirm');
            }
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(function () {
        // always executed
        });

    }
}

export const compareSms =  (smscode , userId) => {
    return async (dispatch,getState) => {
        await axios.post(`http://127.0.0.1:8000/api/customers/compareSms/${userId}` ,{
            smscode : smscode
        })
        .then(response => {
        if(response.status === 200 ){
            if(response.data === true){
                history.push('/Sex');
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
}


export const chooseSex = (userId,sex) => {
    return async (dispatch,getState) => {
        await axios.post(`http://127.0.0.1:8000/api/customers/updateSex/${userId}` ,{
                sex : sex,
        })
        .then(response => {
            dispatch({
                type: "CHOOSE_SEX",
                payload: { 
                    sex : sex
                }
            });
            history.push('./AgeCity');
        })
        .catch(function (error) {
            console.log(error);
        });
        
    }
}


export const chooseAgeCity = (userId,city,birthday) => {
    return async (dispatch,getState) => {
        await axios.post(`http://127.0.0.1:8000/api/customers/updateAgeCity/${userId}` ,{
                city : city ,
                birthday : birthday
            })
            .then(response => {
                //console.log(response);
                //Change Store values
                dispatch({
                    type: "CHOOSE_AGE_CITY",
                    payload: { 
                        city : city,
                        birthday : birthday
                    }
                });
                history.push('/BidList');

            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

export const fetchPrice = (userId,birthday,city,sex) => {
    return async (dispatch,getState) => {
        await axios.get(`http://127.0.0.1:8000/api/customers/showPrices/${userId}/${birthday}/${city}/${sex}`)
            .then(response => {
                var price_pairs = response.data; //Return data from api is json array of company-price pairs
                //Change store values
                
                dispatch({
                    type: "SHOW_PRICE",
                    payload: { 
                        company_price_pair : price_pairs
                    }
                });
                
              })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }
}