import React, { Component } from "react";
import { Container, Header } from "semantic-ui-react";
import axios from 'axios';

class App extends Component {
    state = { idea: { startup: '', noun: '' } }

    componentDidMount = () => {
        axios.get('http://localhost:3001/api/idea')
        .then(response => {
            this.setState({ idea: response.data });
        });
    }

    render() {
        return (
            <Container text>
                <Header as="h1" content="Startup Idea Generator" textAlign="center" />
                <span>{this.state.idea.startup}</span> for <span>{this.state.idea.noun}</span>
            </Container>
        );
    }
}

export default App;
