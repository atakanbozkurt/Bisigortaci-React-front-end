import React from 'react';
import history from '../history';

class Restart extends React.Component{

    onClick = (event) => {
        history.push('/');
    }

    render(){
        return(
            <div>
                <div>Lütfen sayfa yenilemeden ilerleyiniz ..</div>
                <div><button onClick={this.onClick}>Tekrar Basla</button></div>
            </div>
        );
    }
}

export default Restart;