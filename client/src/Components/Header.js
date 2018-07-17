import React from 'react';

const SearchBar = (props) =>{
    return(
        <form>
            <input type="text" placeholder="Szukaj..." onChange={props.onChange}/>
        </form>
    );
}

const Header = (props) =>{
    return(
        <SearchBar onChange={props.search.bind(this)}/>
    );
    
}

export default Header;