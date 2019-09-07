import React from 'react';
import axios from 'axios';
import CompanyPrice from './CompanyPrice';

class BidList extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            page : this.props.userInfo.page,
            customer_id : this.props.userInfo.customer_id,
            //customer_id : sessionStorage.getItem('customer_id'),
            name : this.props.userInfo.name,
            surname : this.props.userInfo.surname,
            email : this.props.userInfo.email,
            phone : this.props.userInfo.phone,
            sex : this.props.userInfo.sex,
            //sex : sessionStorage.getItem('sex'),
            city : this.props.userInfo.city,
            //city : sessionStorage.getItem('city'),
            year : this.props.userInfo.year,
            //year : sessionStorage.getItem('year'),
            prices : this.props.userInfo.prices,
            dataFetch : false
        }
    }

    async componentDidMount(){

        if (this.state.dataFetch === false) {
            await axios.get(`http://127.0.0.1:8000/api/customers/showPrices/${this.state.customer_id}/${this.state.year}/${this.state.city}/${this.state.sex}`)
            .then(response => {
                console.log(response);
                //assign company-price pairs to state
                var price_pairs = response.data;
                console.log('returned data:', price_pairs);
                this.setState({ prices : price_pairs });     
              })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
            
            await this.setState({dataFetch:true});
            
        }

    }

    renderList ()  {
        if( this.state.dataFetch === false){
            return <div>Getting Prices</div>
        }
        else{
            return <CompanyPrice price_pairs={this.state.prices}/>
        }
    }
 
    render(){
        return  <div>{this.renderList()}</div>
    }

}
export default BidList;


//fetch yedek
/*
onButtonSubmit = async event => {
    await axios.get(`http://127.0.0.1:8000/api/customers/showPrices/${this.state.year}/${this.state.city}/${this.state.sex}`)
    .then(response => {
        console.log(response);
        //assign company-price pairs to state
        var price_pairs = response.data;
        this.setState({ prices : price_pairs });     
      })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .finally(function () {
        // always executed
    });
    
    //Post to the offers column to update 
    await axios.post(`http://127.0.0.1:8000/api/customers/updateOffers/${this.state.customer_id}` ,{
        offers : this.state.prices
    })
    .then(response => {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
}
*/