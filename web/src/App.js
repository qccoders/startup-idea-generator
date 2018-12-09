import React, { Component } from "react";
import { Container, Header, Icon, Button, Segment } from "semantic-ui-react";
import axios from 'axios';

const styles = {
    for: {
        color: '#808080', 
        'font-weight' : '100', 
        'font-size': 24,
        'margin-left': 5,
        'margin-right': 5,
    }
}

class App extends Component {
    state = { startup: '', startupWiki: [], noun: '' }

    componentDidMount = () => {
        this.get();
    }

    get = () => {
        axios.get('http://localhost:3001/api/idea')
        .then(response => {
            this.setState({ startup: response.data.startup, noun: response.data.noun }, () => {
                axios.get('https://en.wikipedia.org/w/api.php?action=opensearch&search=' + this.state.startup + '&format=json&limit=5&origin=*')
                .then(response => {
                    this.setState({ startupWiki: response.data });
                });
            });
        });
    }

    render() {
        let { startup, startupWiki, noun} = this.state;

        return (
            <Container text textAlign='center' style={{'margin-top': 50}}>
                <Header as="h3" icon textAlign="center">
                    <Icon name='idea' circular/>
                    Startup Idea Generator
                </Header>

                <Header as='h1' style={{ 'margin-top': 50 }}>
                    {startup} <span style={styles.for}>for</span> {noun}
                </Header>

                <Container text textAlign='left'>
                    <Segment raised>
                        <ul>
                            {startupWiki && startupWiki[1] && startupWiki[1].map((s, i) => <li>{s}: {startupWiki[2][i]}</li>)}
                        </ul>
                    </Segment>
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
