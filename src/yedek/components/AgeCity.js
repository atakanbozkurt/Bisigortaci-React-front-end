import React from 'react';
import Select from 'react-select';
import axios from 'axios';

class AgeCity extends React.Component{

    constructor(props){
        super(props);
    
        var years = [ ];         //Initialize birth years to use in state
        for(var i=1944 ; i<=2019 ; i++){
            var element = {value : i , label : i};
            years[i] = element;
        }
        var cities = [          //Initialize cities to use in state
            { value: 'Adana', label: 'Adana' },
            { value: 'Adıyaman', label: 'Adıyaman' },
            { value: 'Afyonkarahisar', label: 'Afyonkarahisar' },
            { value: 'Ağrı', label: 'Ağrı' },
            { value: 'Aksaray', label: 'Aksaray' },
            { value: 'Amasya', label: 'Amasya' },
            { value: 'Ankara', label: 'Ankara' },
            { value: 'Antalya', label: 'Antalya' },
            { value: 'Ardahan', label: 'Ardahan' },
            { value: 'Artvin', label: 'Artvin' },
            { value: 'Aydın', label: 'Aydın' },
            { value: 'Balıkesir', label: 'Balıkesir' },
            { value: 'Bartın', label: 'Bartın' },
            { value: 'Batman', label: 'Batman' },
            { value: 'Bayburt', label: 'Bayburt' },
            { value: 'Bilecik', label: 'Bilecik' },
            { value: 'Bingol', label: 'Bingol' },
            { value: 'Bitlis', label: 'Bitlis' },
            { value: 'Bolu', label: 'Bolu' },
            { value: 'Burdur', label: 'Burdur' },
            { value: 'Bursa', label: 'Bursa' },
            { value: 'Çanakkale', label: 'Çanakkale' },
            { value: 'Çankırı', label: 'Çankırı' },
            { value: 'Çorum', label: 'Çorum' },
            { value: 'Denizli', label: 'Denizli' },
            { value: 'Diyarbakır', label: 'Diyarbakır' },
            { value: 'Düzce', label: 'Düzce' },
            { value: 'Edirne', label: 'Edirne' },
            { value: 'Elazığ', label: 'Elazığ' },
            { value: 'Erzincan', label: 'Erzincan' },
            { value: 'Erzurum', label: 'Erzurum' },
            { value: 'Eskişehir', label: 'Eskişehir' },
            { value: 'Gaziantep', label: 'Gaziantep' },
            { value: 'Giresun', label: 'Giresun' },
            { value: 'Gümüşhane', label: 'Gümüşhane' },
            { value: 'Hakkari', label: 'Hakkari' },
            { value: 'Hatay', label: 'Hatay' },
            { value: 'Iğdır', label: 'Iğdır' },
            { value: 'Isparta', label: 'Isparta' },
            { value: 'Mersin', label: 'Mersin' },
            { value: 'İstanbul', label: 'İstanbul' },
            { value: 'İzmir', label: 'İzmir' },
            { value: 'Karabük', label: 'Karabük' },
            { value: 'Karaman', label: 'Karaman' },
            { value: 'Kars', label: 'Kars' },
            { value: 'Kastamonu', label: 'Kastamonu' },
            { value: 'Kayseri', label: 'Kastamonu' },
            { value: 'Kilis', label: 'Kilis' },
            { value: 'Kırıkkale', label: 'Kırıkkale' },
            { value: 'Kırşehir', label: 'Kırşehir' },
            { value: 'Kocaeli', label: 'Kocaeli' },
            { value: 'Konya', label: 'Konya' },
            { value: 'Kütahya', label: 'Kütahya' },
            { value: 'Malatya', label: 'Malatya' },
            { value: 'Manisa', label: 'Manisa' },
            { value: 'Kahramanmaraş', label: 'Kahramanmaraş' },
            { value: 'Mardin', label: 'Mardin' },
            { value: 'Muğla', label: 'Muğla' },
            { value: 'Muş', label: 'Muş' },
            { value: 'Nevşehir', label: 'Nevşehir' },
            { value: 'Niğde', label: 'Niğde' },
            { value: 'Ordu', label: 'Ordu' },
            { value: 'Osmaniye', label: 'Osmaniye' },
            { value: 'Rize', label: 'Rize' },
            { value: 'Sakarya', label: 'Sakarya' },
            { value: 'Samsun', label: 'Samsun' },
            { value: 'Siirt', label: 'Siirt' },
            { value: 'Sinop', label: 'Sinop' },
            { value: 'Sivas', label: 'Sivas' },
            { value: 'Tekirdağ', label: 'Tekirdağ' },
            { value: 'Tokat', label: 'Tokat' },
            { value: 'Trabzon', label: 'Tokat' },
            { value: 'Tunceli', label: 'Tunceli' },
            { value: 'Şanlıurfa', label: 'Şanlıurfa' },
            { value: 'Şırnak', label: 'Şırnak' },
            { value: 'Uşak', label: 'Uşak' },
            { value: 'Van', label: 'Van' },
            { value: 'Yalova', label: 'Yalova' },
            { value: 'Yozgat', label: 'Yozgat' },
            { value: 'Zonguldak', label: 'Zonguldak' }
        ]

        this.state = {          //Initialize state
            city : {
                selected : false,
                selectedOption : 'Yasadiginiz Sehir',
                options : cities
            },
            year : {
                selected : false,
                selectedOption : 'Dogum Yiliniz',
                options : years
            },
            customer_id : this.props.customer_id
            //customer_id : sessionStorage.getItem('customer_id')
        };

    }

    
    handleCityChange = async selectedCity => {                //Selected city is an element of the array for ex: { value: 'ist' , label: 'atk'}
        var cityCopy = {...this.state.city};            //cityCopy variable is to create copy of state object's city
        cityCopy.selectedOption = selectedCity.value;   //Desired city is assigned to the copy of the state
        cityCopy.selected = true;
        await this.setState({city : cityCopy });               //setstate does not allow nested objects =>THUS=> change city object in state directly
    };

    handleYearChange = async selectedYear => {                //Selected year is an element of the array
        var yearCopy = {...this.state.year};            //yearCopy varaible is to create copy of state object's year
        yearCopy.selectedOption = selectedYear.value;          //Desited year is assigned to the copy of the state
        yearCopy.selected = true;
        await this.setState({year : yearCopy });               //setState does not allow nested object . this changes year in state 
    }

    onButtonSubmit = async event => {
        //Proceed if inputs are OK
        if(this.state.city.selected === true && this.state.year.selected === true){

            //update age city at db with id received from APP .js
            await axios.post(`http://127.0.0.1:8000/api/customers/updateAgeCity/${this.state.customer_id}` ,{
                city : this.state.city.selectedOption,
                birthday : this.state.year.selectedOption
            })
            .then(response => {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

            //Update APP.JS variables before moving forward
            this.props.updateAgeCity(this.state.city.selectedOption,this.state.year.selectedOption);
            this.props.history.push('/BidList');
        }

        //Error messages if inputs are NOT OK                   //TODO PUT ERROR MESSAGE TO SCREEN INSTEAD OF CONSOLE LOG
        if(this.state.city.selected === false){
            console.log('select a city');
        }
        if(this.state.year.selected === false){
            console.log('select a year');
        }
    }

    onPreviousButtonSubmit = event => { //Go Back To Previous Page
        this.props.history.push('/Sex');
    }
    

    render(){
        return(
            <div>
                <div>
                    <div>Fiyat almaniz icin gerekli son bilgiler</div>
                    <div>
                        <div>Sehir Seciniz</div>
                        <Select 
                            placeholder={this.state.city.selectedOption}
                            value={this.state.city.selectedOption}
                            onChange={this.handleCityChange}
                            options={this.state.city.options}
                        />
                    </div>
                    <div>
                        <div>Dogum Yiliniz</div>
                        <Select 
                            placeholder={this.state.year.selectedOption}
                            value = {this.state.year.selectedOption}
                            onChange={this.handleYearChange}
                            options={this.state.year.options}                           
                        />
                    </div>
                    <div>
                        <button onClick={this.onButtonSubmit}>Ilerle</button>
                    </div>
                    <div>
                        <button onClick={this.onPreviousButtonSubmit}>Geri Dön</button>
                    </div>
                </div>
            </div>
        );
    }

}
export default AgeCity;