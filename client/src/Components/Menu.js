import React from 'react';
import _ from 'lodash';
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

const PageButton = (props) =>{
    if((props.page > 1 && props.page < props.pages) || props.list === 'false'){
        return(
            <button onClick={() => props.selectPage(props.page)}> {props.page} </button>
        );
    }
    else{
        return(null);
    }

}

const PageButtons = (props) =>{
     return(
    <div> 
    <ChangePage changePage={props.previousPage} symbol="<--"/>
        <PageButton selectPage={props.selectPage}  list='false' page={1} />...
        {_.range(props.page-2,props.page+3).map(i => <PageButton selectPage={props.selectPage} list='true' key={i} page={i} pages={props.pages} /> )}
        ...<PageButton selectPage={props.selectPage}  list='false' page={props.pages} />
        <ChangePage changePage={props.nextPage} symbol="-->"/>
    </div> 
    
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
            
            &nbsp; {props.page} &nbsp;
                <PageButtons 
                    previousPage={props.previousPage} 
                    nextPage={props.nextPage} 
                    pages={props.maxPages} 
                    page={props.page} 
                    selectPage={props.selectPage}
                />
            
            <hr /><hr />
        </div>
    )
}

export default Menu;