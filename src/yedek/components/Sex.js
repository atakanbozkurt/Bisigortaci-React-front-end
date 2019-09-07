import React from 'react';
import axios from 'axios';

class Sex extends React.Component{

    //state = { sex : 'notselected'};

    constructor(props) {
        super(props);
        this.state = {
            sex : 'notselected',
            customer_id : this.props.customer_id
            //customer_id : sessionStorage.getItem('customer_id')
        };
    }

    onSexSelect = async (user_sex) => {
        await this.setState({ sex : user_sex });
        //update sex at db with id received from App.js
        await axios.post(`http://127.0.0.1:8000/api/customers/updateSex/${this.state.customer_id}` ,{
            sex : this.state.sex,
          })
          .then(response => {
            console.log('Sex is updated', response);
          })
          .catch(function (error) {
            console.log(error);
          });

        //Store user information in APP.JS before moving forward
        this.props.updateSex(this.state.sex);
        this.props.history.push('/AgeCity');
    }

    render(){ 
        return(
            <div>
                <div>Lutfen Cinsiyetinizi Seciniz</div>
                <div>
                    <div>
                        <button onClick = { () => this.onSexSelect("male")}>ERKEK</button>
                    </div>
                    <div>
                        <button onClick = { () => this.onSexSelect("female")}>KADIN</button>
                    </div>
                </div>
            </div>
        );
    }

}
export default Sex;

//UNDERSTAND HOW first syntax works !!!
//<button onClick = { () => this.onSexSelect("male")}>ERKEK</button>
//<button onClick = {this.onSexSelect}>ERKEK</button>