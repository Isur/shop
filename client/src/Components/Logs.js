import React from "react";
import { Segment, Button, Table } from 'semantic-ui-react';
import axios from "axios";
import cookie from 'react-cookies';
import lang from './language/lang';
const TableRow = (props) => {
    return(
        <Table.Row negative={(props.Type === 'error')}>
            <Table.Cell> {props.Type} </Table.Cell>
            <Table.Cell> {props.Message} </Table.Cell>
            <Table.Cell> {props.Date} </Table.Cell>
            <Table.Cell> {props.Time} </Table.Cell>
        </Table.Row>
    )
}

class Logs extends React.Component{
    constructor(){
        super();
        this.state = {
            logs: []
        }
        this.selectLogs = this.selectLogs.bind(this);
    }

    componentDidMount(){
        this.getLogs()
            .then(res =>  {
               this.logsToState(res);
            })
            .catch(err => console.log(err));
    }

    selectLogs = (event) => {
        this.getLogs(event.target.name).then(res => this.logsToState(res));
    }

    getLogs = (type) =>{
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url: `/logs/${type}`,
                headers: {'Authorization' : cookie.load('token')}
            }).then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err);
            })
        })
    }

    logsToState = (logsString) =>{
        var logs = logsString.split('\n');
        logs.length = logs.length - 1;
        logs = logs.map(item => JSON.parse(item));
        this.setState({logs: logs});
    }

    render(){
        console.log(this.state.logs)
        return(
            <Segment>
                <Button name="combined" onClick={this.selectLogs}> {lang.buttons.combined} </Button>
                <Button name="error" onClick={this.selectLogs}> {lang.buttons.error} </Button>
                <Table  celled  selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell> {lang.logs.level} </Table.HeaderCell>
                            <Table.HeaderCell> {lang.logs.message} </Table.HeaderCell>
                            <Table.HeaderCell> {lang.logs.date} </Table.HeaderCell>
                            <Table.HeaderCell> {lang.logs.time} </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                       {this.state.logs.map(item => (
                        <TableRow Type={item.level} Message={item.message} Date={item.date} Time={item.time}/>
                        ))}
                    </Table.Body>
                </Table>
            </Segment>
        );
    }
}

export default Logs;