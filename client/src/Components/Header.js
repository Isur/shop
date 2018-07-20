import React from 'react';
import { Input, Segment, Dropdown, Divider, Header } from 'semantic-ui-react';
const SearchBar = (props) =>{
    return(
<Segment inverted>
    <Input inverted placeholder='Szukaj...' onChange={props.onChange} value={props.value}/>
  </Segment>            
    );
}

const getOptions = (search) => {
    var Options = [];
    if(search.length < 1){
        Options = [
        {text: "Cena malejąco",value: "valueDESC"},
        {text: "Cena rosnąco",value: "value"},
        {text: "Nazwa malejąco",value: "nameDESC"},
        {text: "Nazwa rosnąco",value: "name"},
        {text: "Producent malejąco",value: "producerDESC"},
        {text: "Producent rosnąco",value: "producer"},
    ]}else {
        Options = [
            {text: "Cena malejąco",value: "valueDESC"},
        {text: "Cena rosnąco",value: "value"},
        ]
    }
    return Options;
}

const Sort = (props) => {
    
    return(
        <Dropdown placeholder='Sortowanie' selection options={getOptions(props.input)} onChange={props.onChange} />
    );
}

const MyHeader = (props) => {
    return(
            <Segment inverted textAlign='center'> 
                <Header as='h3' inverted>Strona: {props.page} </Header> 
                <Divider />
                <SearchBar onChange={props.search} value={props.input}/>
                <Sort onChange={props.sort} input={props.input}/>
            </Segment>
    );
}

export default MyHeader;