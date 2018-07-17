import React from 'react';
const MenuItem = (props) => {
    return(
        <button onClick={() => props.selectCategory(props.cat)}> 
            { props.CategoryName }
        </button>
    );
}

const ChangePage = (props) =>{
    return(
        <button onClick={props.changePage}>
            {props.symbol}
        </button>
    );
}

const Menu = (props) => {
    return(
        <div> 
            <MenuItem cat="" CategoryName="Wszystko" selectCategory={props.selectCategory}/>            
            <MenuItem cat="cameras" CategoryName="Kamery" selectCategory={props.selectCategory} />            
            <MenuItem cat="tvs" CategoryName="TV" selectCategory={props.selectCategory} />            
            <MenuItem cat="computers" CategoryName="Komputery" selectCategory={props.selectCategory} />            
            <MenuItem cat="phones" CategoryName="Telefony" selectCategory={props.selectCategory} /> 
            <br />
            <hr /> 
            <ChangePage changePage={props.previousPage} symbol="<--"/>
            &nbsp; {props.page} &nbsp;
            <ChangePage changePage={props.nextPage} symbol="-->"/>

        </div>
    )
}

export default Menu;