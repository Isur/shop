import React from 'react';
import { Segment, Divider, Header, Form } from 'semantic-ui-react';
const SearchBar = (props) =>{
    return(
        <Form.Input inverted placeholder='Szukaj...' onChange={props.onChange} value={props.value} width={props.width}/>
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
            <Form.Dropdown placeholder='Sortowanie' selection options={getOptions(props.input)} onChange={props.onChange} width={props.width}/>
    );
}

const category = (cat) =>{
    switch(cat){
        case 'all':
            return 'Wszystko';
        case 'phones':
            return 'Telefony';
        case 'computers':
            return 'Kopmutery';
        case 'cameras':
            return 'Kamery';
        case 'tvs':
            return 'Telewizory';
        default:
            return 'none';
    }
}

const MyHeader = (props) => {
    const cat = category(props.category);
    return(
            <Segment inverted textAlign='center'> 
                <Header as='h3' inverted>Kategoria: {cat !== 'none' && cat} <br /> Strona: {props.page}  </Header> 
                <Divider />
                <Form><Form.Group widths="equal">
                    <SearchBar onChange={props.search} value={props.input} />
                    <Sort onChange={props.sort} input={props.input} />
                </Form.Group></Form>
            </Segment>
    );
}

export default MyHeader;