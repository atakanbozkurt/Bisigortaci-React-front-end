import {combineReducers} from 'redux';
import userStatus from './userStatus';
import {reducer as formReducer} from 'redux-form';

export default combineReducers({
    userStatus : userStatus,
    form : formReducer
});