import React from 'react';
import { Segment, Divider, Header, Form } from 'semantic-ui-react';
import { DebounceInput } from 'react-debounce-input';

// language
import lang from './language/lang';

const SearchBar = (props) =>{
    return(
        <DebounceInput minLength={2}
          debounceTimeout={500}
          element={Form.Input}
          placeholder={lang.placeholders.search}
          onChange={props.onChange} 
          value={props.value}
          />
    );
}

const getOptions = (search) => {
    var Options = [];
    if(search.length < 1){
        Options = [
        {text: lang.sortingOptions.valueDESC, value: "valueDESC"},
        {text: lang.sortingOptions.valueASC,value: "value"},
        {text: lang.sortingOptions.nameDESC,value: "nameDESC"},
        {text: lang.sortingOptions.nameASC,value: "name"},
        {text: lang.sortingOptions.producerDESC,value: "producerDESC"},
        {text: lang.sortingOptions.producerASC,value: "producer"},
    ]}else {
        Options = [
            {text: lang.sortingOptions.valueDESC,value: "valueDESC"},
            {text: lang.sortingOptions.valueASC,value: "value"},
        ]
    }
    return Options;
}

const Sort = (props) => {
    return(
            <Form.Dropdown placeholder={lang.placeholders.sorting} selection options={getOptions(props.input)} onChange={props.onChange} width={props.width}/>
    );
}

const category = (cat) =>{
    switch(cat){
        case 'all':
            return lang.productTypes.all;
        case 'phones':
            return lang.productTypes.phones;
        case 'computers':
            return lang.productTypes.computers;
        case 'cameras':
            return lang.productTypes.cameras;
        case 'tvs':
            return lang.productTypes.tvs;
        default:
            return 'none';
    }
}

const MyHeader = (props) => {
    const cat = category(props.category);
    return(
            <Segment inverted textAlign='center'> 
                <Header as='h3' inverted>{lang.labels.category}: {cat !== 'none' && cat} <br /> {lang.labels.page}: {props.page}  </Header> 
                <Divider />
                <Form><Form.Group widths="equal">
                    <SearchBar onChange={props.search} value={props.input} />
                    <Sort onChange={props.sort} input={props.input} />
                </Form.Group></Form>
            </Segment>
    );
}

export default MyHeader;