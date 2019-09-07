import React from 'react';
import history from '../history';


class Landing extends React.Component{

    render(){
        return(
            <div>
                <div>Merhaba, sana en uygun fiyat ile tamamlayici saglik sigortasi bulacagim.</div>
                <div>
                    <button onClick={(e)=> history.push('/NameSurname')}> Fiyat Al </button>
                </div>
            </div>
        );
    }

}
export default Landing;