import React from 'react';
import { Input, Segment } from 'semantic-ui-react';
const SearchBar = (props) =>{
    return(
<Segment inverted>
    <Input inverted placeholder='Szukaj...' onChange={props.onChange}/>
  </Segment>            
    );
}

const Header = (props) =>{
    return(
        <SearchBar onChange={props.search.bind(this)}/>
    );
    
}

export default Header;