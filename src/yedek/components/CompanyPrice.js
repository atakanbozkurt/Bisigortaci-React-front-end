import React from 'react';

const CompanyPrice = ({price_pairs}) => {

    //We need a convertion from JSON Object to Array to map and render
    const price_list = price_pairs.map((element)=>{
        return (
                <div key={element.company}>
                    {element.company} -> {element.price}
                </div>
            )
    });


    return(
        <div>
            {price_list}
        </div>
    );
};
export default CompanyPrice;