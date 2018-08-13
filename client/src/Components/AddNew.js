import React from 'react';
import { Segment, Container, Button, Form, Input, Divider, TextArea, Dropdown, Message } from 'semantic-ui-react';
import axios from 'axios';
import Loading from './Loading';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import io from 'socket.io-client';
// language
import lang from './language/lang';

const socket = io('https://alm-shop.herokuapp.com');

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
        nameError: true,
        shortDescriptionError: true,
        longDescriptionError: true,
        valueError: true,
        producerError: true,
        typeError: true,
        errorMessage: lang.errors.fillEverything,
        error: false,
        sent: false,
        sentMessage: lang.messages.productAdded,
        sending: false,
    }
    this.submit = this.submit.bind(this);

    this.validateName = this.validateName.bind(this);
    this.validateImage = this.validateImage.bind(this);
    this.validateLongDescription = this.validateLongDescription.bind(this);
    this.validateProducer = this.validateProducer.bind(this);
    this.validateShortDescription = this.validateShortDescription.bind(this);
    this.validateType = this.validateType.bind(this);
    this.validateValue = this.validateValue.bind(this);
   }

   componentDidMount(){
    this.isError();

   }
    

   types = [
        {text: lang.productTypes.camera, value:"camera"},
        {text: lang.productTypes.phone, value:"phone"},
        {text: lang.productTypes.computer, value:"computer"},
        {text: lang.productTypes.tv, value:"tv"},
    ]
    
    isError = () =>{
        const {nameError, shortDescriptionError, longDescriptionError, valueError, producerError, typeError, imageError} = this.state;
        if(nameError||shortDescriptionError||longDescriptionError||valueError||producerError||typeError||imageError){
            this.setState({error: true});
            return true;
        } else {
            this.setState({error: false});
            return false;
        }
    }

    validateName = (e) =>{
        this.setState({name: e.target.value}, async () => {
            if(this.state.name === ''){
                this.setState({nameError: true, error: true});
            }else this.setState({nameError: false});
        });
        this.isError();
    }

    validateShortDescription = (e) => {
        this.setState({shortDescription: e.target.value}, async () => {
            if(this.state.shortDescription === ''){
                this.setState({shortDescriptionError: true, error: true});
            }else this.setState({shortDescriptionError: false});
        });
        this.isError();
    }

    validateLongDescription = (e) => {
        this.setState({longDescription: e.target.value}, async () => {
            if(this.state.longDescription === ''){
                this.setState({longDescriptionError: true, error: true});
            }else this.setState({longDescriptionError: false});
        });
        this.isError();
    }

    validateValue = (e) => {
        this.setState({value: e.target.value}, async () => {
            if(this.state.value === ''){
                this.setState({valueError: true, error: true});
            }else this.setState({valueError: false});
        });
        this.isError();
    }

    validateProducer = (e) => {
        this.setState({producer: e.target.value}, async () => {
            if(this.state.producer === ''){
                this.setState({producerError: true, error: true});
            }else this.setState({producerError: false});
        });
        this.isError();
    }

    validateType = (e, data) => {
        this.setState({type: data.value}, async () => {
            if(this.state.type === ''){
                this.setState({typeError: true, error: true});
            }else this.setState({typeError: false});
        });
        this.isError();
    }

    validateImage = (e) => {
        if(this.state.image === '')
            this.setState({image: ' '});
        this.isError();
    }

    clearForm = () => {
        this.setState({
            name: '',
            shortDescription: '',
            longDescription: '',
            value: '',
            producer: '',
            type: '',
            image: ' ',
            imageError: false,
            nameError: true,
            shortDescriptionError: true,
            longDescriptionError: true,
            valueError: true,
            producerError: true,
            typeError: true,
        })
    }

    submit(event){
        event.preventDefault();
        
        this.setState({sent:false}, async () => {
            if(this.isError() === false){
                this.setState({sending: true}, async () => {
                    axios({
                        method:'post',
                        url:'/api/addItem',
                        data:{
                            name: this.state.name,
                            description: this.state.shortDescription,
                            longDescription: this.state.longDescription,
                            value: this.state.value,
                            producer: this.state.producer,
                            imageLink: this.state.image,
                            itemType: this.state.type,
                            id: cookie.load('id')
                        },
                        headers: {'Authorization' : cookie.load('token')}
                    }).then(res => {
                        if(res.data.code === 403){
                            console.log(res.data.code)
                            this.setState({sent:false, sending: false, error: true, errorMessage:`${lang.errors.noPermission}` });
                        }else {
                            this.setState({sent:true, sending: false});
                            socket.emit('addProduct', {message:`Produkt ${this.state.name} został dodany`});
                        }
                        this.clearForm(); 
                    }).catch(err => {
                        this.setState({sending: false, errorMessage: lang.errors.logIn, error: true })
                    });
                });
            }
        });
    }

    render(){
        if(!cookie.load('token'))
            return <Redirect path to="/home" />
        
        return(
            <Segment inverted>
            <Container text textAlign="center">
                {this.state.sending && <Loading />}
            <Form >
                <Divider horizontal />
                 <Form.Field> 
                     <label style={style}> {lang.labels.name} {this.state.nameError && <span style={{color: 'red'}}> - {lang.errors.fillField} </span>}</label>
                     <Input 
                        error={this.state.nameError} 
                        fluid 
                        type="text" 
                        placeholder={lang.placeholders.name} 
                        onChange={this.validateName}
                        value={this.state.name}
                    /> 
                </Form.Field>
                <Form.Field>
                    <label style={style}> {lang.labels.shortDescription} {this.state.shortDescriptionError && <span style={{color: 'red'}}>- {lang.errors.fillField} </span>} </label>
                    <Input 
                        error={this.state.shortDescriptionError} 
                        fluid  
                        type="text" 
                        placeholder={lang.placeholders.shortDescription}
                        onChange={this.validateShortDescription}
                        value={this.state.shortDescription}
                    /> 
                </Form.Field>
                <Form.Field>
                    <label style={style}> {lang.labels.longDescription} {this.state.longDescriptionError && <span style={{color: 'red'}}>- {lang.errors.fillField} </span>}</label>
                    <TextArea 
                        error={this.state.longDescriptionError} 
                        fluid  
                        type="text" 
                        placeholder={this.state.shortDescriptionError}  
                        onChange={this.validateLongDescription}
                        value={this.state.longDescription}
                    /> 
                </Form.Field>
                <Form.Field>
                    <label style={style}> {lang.labels.value} {this.state.valueError && <span style={{color: 'red'}}>- {lang.errors.fillFieldNumber} </span>}</label>
                    <Input 
                        error={this.state.valueError} 
                        fluid  
                        type="number" 
                        placeholder={lang.placeholders.value}
                        onChange={this.validateValue}
                        value={this.state.value}    
                    /> 
                </Form.Field>
                <Form.Field>
                    <label style={style}> {lang.labels.producer} {this.state.producerError && <span style={{color: 'red'}}>- {lang.errors.fillField} </span>} </label>
                    <Input 
                        error={this.state.producerError} 
                        fluid  
                        type="text" 
                        placeholder={lang.placeholders.producer}
                        onChange={this.validateProducer}
                        value={this.state.producer}
                    /> 
                </Form.Field>
                <Form.Field>
                    <label style={style}> {lang.labels.imageURL}{this.state.imageError && <span style={{color: 'red'}}>- {lang.errors.fillField} </span>} </label>
                    <Input 
                        error={this.state.imageError} 
                        fluid  
                        type="text" 
                        placeholder={lang.placeholders.imageURL}
                        onChange={this.validateImage}
                        value={this.state.image}
                    /> 
                </Form.Field>
                <Form.Field>
                    <label style={style}> {lang.labels.type} {this.state.typeError && <span style={{color: 'red'}}>- {lang.errors.selectType} </span>} </label>
                    <Dropdown 
                        error={this.state.typeError} 
                        fluid 
                        selection 
                        options={this.types} 
                        placeholder={lang.placeholders.type} 
                        onChange={this.validateType}
                        value={this.state.type}    
                    /> 
                </Form.Field>
                <Divider horizontal/>
                {this.state.error && <Message negative> 
                    {this.state.errorMessage}
                </Message>}
                {this.state.sent && <Message positive> {this.state.sentMessage} </Message>}
                <Divider horizontal/>
                <Form.Field> 
                     <Button primary fluid onClick={this.submit}> {lang.buttons.add} </Button> 
                </Form.Field>
            </Form>
            </Container>
            </Segment>
        )
    }
}

export default AddNewItem;