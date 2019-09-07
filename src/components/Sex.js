import React from 'react';
import {connect} from 'react-redux';
import Restart from './Restart'
import {chooseSex} from '../actions/index';

class Sex extends React.Component {

    onSexSelect = sex => {
        this.props.chooseSex(this.props.userId , sex);
    }

    render(){
        if( !this.props.isSigned ){
            return <div><Restart/></div>
        }
        else{   
            return(
                <div>
                    <div>Lütfen cinsiyetinizi seçiniz</div>
                    <div>
                        <div><button onClick={() => this.onSexSelect("male")}> Erkek </button></div>
                        <div><button onClick={() => this.onSexSelect("female")}> Kadin </button></div>
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = state => {
    return { 
        isSigned : state.userStatus.isSigned,
        userId : state.userStatus.id }
}

export default connect(mapStateToProps,{chooseSex})(Sex);