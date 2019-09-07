import React from 'react';


class Landing extends React.Component{

    takeOffer = async event => {
        //Callback to open surname page
        //await this.props.history.push({pathname: '/pathname', state: {message: "hello, im a passed message!"}});
        await this.props.openNameSurname();
        this.props.history.push('/NameSurname');
    }

    componentDidMount(){
        
    }
    componentWillUnmount(){
    
    }

    render(){
        return(
            <div>
                <div>Merhaba, sana en uygun fiyat ile tamamlayici saglik sigortasi bulacagim.</div>
                <div className="landingButton">
                    <button onClick={this.takeOffer}> Fiyat Al </button>
                </div>
            </div>
        );
    }

}
export default Landing;