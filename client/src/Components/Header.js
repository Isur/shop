import React from 'react';
import { Input, Segment, Dropdown, Divider, Header } from 'semantic-ui-react';
const SearchBar = (props) =>{
    return(
<Segment inverted>
    <Input inverted placeholder='Szukaj...' onChange={props.onChange} value={props.value}/>
  </Segment>            
    );
}

const Sort = (props) => {
    const Options = [
        {text: "Cena malejąco",value: "value"},
        {text: "Cena rosnąco",value: "valueDESC"},
        {text: "Nazwa malejąco",value: "name"},
        {text: "Nazwa rosnąco",value: "nameDESC"},
        {text: "Producent malejąco",value: "producer"},
        {text: "Producent rosnąco",value: "producerDESC"},
    ]
    return(
        <Dropdown placeholder='Sortowanie' selection options={Options} onChange={props.onChange.bind(this)} />
    );
}

const MyHeader = (props) => {
    return(
            <Segment inverted textAlign='center'> 
                <Header as='h3' inverted>Strona: {props.page} </Header> 
                <Divider />
                <SearchBar onChange={props.search} value={props.input}/>
                <Sort onChange={props.sort} />
            </Segment>
    );
}

export default MyHeader;