import React from 'react';


const Item = (props) => {
    const addInfo = props.diagonal || props.resolution || props.rom || props.ram;
    return(
        <div>
            <p> {props.name} - {addInfo} - {props.producer} - {props.description} - {props.value} </p>
            <hr />
        </div>
    )
}

const Items = (props) => {
    console.log(props.items);
return(
            <div>
                {props.items.length > 0 && props.items.map(({name,producer,value,description, _id, diagonal, resolution,ram,rom,type}) => (
                    <Item 
                        name={name} 
                        producer={producer} 
                        value={value} 
                        description={description} 
                        key={_id} 
                        rom={rom} 
                        ram={ram} 
                        diagonal={diagonal} 
                        resolution={resolution}
                        type={type}
                        />
                ))}
                {props.items.length === 0 && <p> Na tej stronie nie ma produktów.</p>}
            </div>
        );
    }

export default Items;