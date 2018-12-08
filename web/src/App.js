import React, { Component } from "react";
import { Container, Header, Icon, Button } from "semantic-ui-react";
import axios from 'axios';

class App extends Component {
    state = { idea: { startup: '', noun: '' } }

    componentDidMount = () => {
        this.get();
    }

    get = () => {
        axios.get('http://localhost:3001/api/idea')
        .then(response => {
            this.setState({ idea: response.data });
        });
    }

    render() {
        return (
            <Container text textAlign='center' style={{'margin-top': 50}}>
                <Header as="h1" icon textAlign="center">
                    <Icon name='idea' circular/>
                    Startup Idea Generator
                </Header>

                <Container text>
                    <span>{this.state.idea.startup}</span> for <span>{this.state.idea.noun}</span>
                </Container>
                
                <Button 
                    primary 
                    onClick={this.get}
                    style={{'margin-top': 50}}
                >
                    Roll for a New Idea
                </Button>
            </Container>
        );
    }
}

export default App;
