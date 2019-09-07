import React from 'react';
import {connect} from 'react-redux';
import Restart from './Restart'
import {fetchPrice} from '../actions/index';
import CompanyPrice from './CompanyPrice';


class BidList extends React.Component{

    componentDidMount(){
        if(this.props.isSigned){
            this.props.fetchPrice(this.props.userId,this.props.birthday,this.props.city,this.props.sex);
        }
    }

    renderList(){
        if( this.props.dataFetch === false){
            return <div>Getting Prices</div>
        }
        else{
            return <CompanyPrice price_pairs={this.props.price_pairs}/>
        }
    }

    render(){
        if(!this.props.isSigned){
            return <Restart/>
        }
        else{
            return(
                <div>
                    {this.renderList()}
                </div>
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        isSigned : state.userStatus.isSigned,
        dataFetch : state.userStatus.dataFetch,
        userId :state.userStatus.id,
        birthday : state.userStatus.birthday,
        city : state.userStatus.city,
        sex : state.userStatus.sex,
        price_pairs : state.userStatus.company_price_pair
    }
}

export default connect(mapStateToProps,{fetchPrice})(BidList);