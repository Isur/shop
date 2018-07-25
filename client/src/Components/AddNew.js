import React from 'react';
import { Segment, Container, Button, Form, Input, Divider, TextArea, Dropdown, Message } from 'semantic-ui-react';
import axios from 'axios';
const style = {
    color: 'silver',
    fontWeight: 'bolder',
    fontSize: 'larger'
}
class AddNewItem extends React.Component{
   constructor(props){
       super(props);
       this.state = {
        name: '',
        shortDescription: '',
        longDescription: '',
        value: '',
        producer: '',
        type: '',
        image: ' ',
        imageError: false,
        nameError: false,
        shortDescriptionError: false,
        longDescriptionError: false,
        valueError: false,
        producerError: false,
        typeError: false,
        errorMessage: 'Wypełnij poprawnie wszystkie pola.',
        error: false,
        sent: false,
        sentMessage: 'Dodano produkt',
    }
    this.submit = this.submit.bind(this);
   }
    types = [
        {text: "Kamera", value:"camera"},
        {text: "Telefon", value:"phone"},
        {text: "Komputer", value:"computer"},
        {text: "TV", value:"tv"},
    ]

    submit(event){
        event.preventDefault();
        this.setState({error: false, sent:false});
        if(this.state.name === ''){
            this.setState({nameError: true, error: true});
        }else this.setState({nameError: false});
        if(this.state.shortDescription === ''){
            this.setState({shortDescriptionError: true, error: true});
        }else this.setState({shortDescriptionError: false});
        if(this.state.longDescription === ''){
            this.setState({longDescriptionError: true, error: true});
        }else this.setState({longDescriptionError: false});
        if(this.state.value === '' || isNaN(parseFloat(this.state.value)) || !isFinite(this.state.value) || this.state.value < 0){
            this.setState({valueError: true, error: true});
        }else this.setState({valueError: false});
        if(this.state.producer === ''){
            this.setState({producerError: true, error: true});
        }else this.setState({producerError: false});
        if(this.state.type === ''){
            this.setState({typeError: true, error: true});
        }else this.setState({typeError: false});
        if(this.state.image === '')
            this.setState({image: ' '});


        if(this.state.error === false){
            console.log(this.state);
            this.setState({sending: true}, async () => {
                axios.post('/api/addItem',{
                    name: this.state.name,
                    description: this.state.shortDescription,
                    longDescription: this.state.longDescription,
                    value: this.state.value,
                    producer: this.state.producer,
                    imageLink: this.state.image,
                    itemType: this.state.type
                }).then(res => this.setState({sent:true}));
            });
        }
    }

    render(){
        return(
            <Segment inverted>
            <Container text textAlign="center">
            <Form >
                <Divider horizontal />
                 <Form.Field> 
                     <label style={style}> Nazwa {this.state.nameError && <span style={{color: 'red'}}>- Wypełnij to pole! </span>}</label>
                     <Input error={this.state.nameError} fluid type="text" placeholder="Nazwa..." onChange={(e) => this.setState({name: e.target.value})}/> 
                </Form.Field>
                <Form.Field>
                    <label style={style}> Krótki opis {this.state.shortDescriptionError && <span style={{color: 'red'}}>- Wypełnij to pole! </span>} </label>
                    <Input error={this.state.shortDescriptionError} fluid  type="text" placeholder="Krótki opis..." onChange={(e) => this.setState({shortDescription: e.target.value})}/> 
                </Form.Field>
                <Form.Field>
                    <label style={style}> Pełny opis {this.state.longDescriptionError && <span style={{color: 'red'}}>- Wypełnij to pole! </span>}</label>
                    <TextArea error={this.state.longDescriptionError} fluid  type="text" placeholder="Pełny opis..." onChange={(e) => this.setState({longDescription: e.target.value})}/> 
                </Form.Field>
                <Form.Field>
                    <label style={style}> Cena {this.state.valueError && <span style={{color: 'red'}}>- Wypełnij to pole wartością liczbową! </span>}</label>
                    <Input error={this.state.valueError} fluid  type="number" placeholder="Cena..."onChange={(e) => this.setState({value: e.target.value})}/> 
                </Form.Field>
                <Form.Field>
                    <label style={style}> Producent {this.state.producerError && <span style={{color: 'red'}}>- Wypełnij to pole! </span>} </label>
                    <Input error={this.state.producerError} fluid  type="text" placeholder="Producent..."onChange={(e) => this.setState({producer: e.target.value})}/> 
                </Form.Field>
                <Form.Field>
                    <label style={style}> Link do obrazka {this.state.imageError && <span style={{color: 'red'}}>- Wypełnij poprawnie to pole! </span>} </label>
                    <Input error={this.state.imageError} fluid  type="text" placeholder="Link do obrazka, puste = obrazek domyślny..." onChange={(e) => this.setState({image: e.target.value})}/> 
                </Form.Field>
                <Form.Field>
                    <label style={style}> Typ {this.state.typeError && <span style={{color: 'red'}}>- Wybierz typ! </span>} </label>
                    <Dropdown error={this.state.typeError} fluid selection options={this.types} placeholder="Typ..." onChange={(e,data) => this.setState({type: data.value})}/> 
                </Form.Field>
                <Divider horizontal/>
                {this.state.error && <Message negative> 
                    {this.state.errorMessage}
                </Message>}
                {this.state.sent && <Message positive> {this.state.sentMessage} </Message>}
                <Divider horizontal/>
                <Form.Field> 
                     <Button primary fluid onClick={this.submit}> Dodaj </Button> 
                </Form.Field>
            </Form>
            </Container>
            </Segment>
        )
    }
}

export default AddNewItem;