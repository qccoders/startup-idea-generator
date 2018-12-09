import React, { Component } from "react";
import { Container, Header, Icon, Button, Segment } from "semantic-ui-react";
import axios from 'axios';

const styles = {
    for: {
        color: '#808080', 
        fontWeight : 100, 
        fontSize: 24,
        marginLeft: 5,
        marginRight: 5,
    },
    info: {
        display: 'inline-block',
        fontSize: 15,
        top: -25,
        color: 'orangered',
        position: 'relative',
    }
}

class App extends Component {
    state = { startup: '', startupWiki: [], showStartupWiki: false, noun: '' }

    componentDidMount = () => {
        this.get();
    }

    get = () => {
        this.setState({ showStartupWiki: false }, () => {
            axios.get('http://localhost:3001/api/idea')
            .then(response => {
                this.setState({ startup: response.data.startup, noun: response.data.noun }, () => {
                    axios.get('https://en.wikipedia.org/w/api.php?action=opensearch&search=' + this.state.startup + '&format=json&origin=*')
                    .then(response => {
                        this.setState({ startupWiki: response.data });
                    });
                });
            });
        });
    }

    handleInfoClick = () => {
        this.setState({ showStartupWiki: !this.state.showStartupWiki });
    }

    render() {
        let { startup, startupWiki, showStartupWiki, noun} = this.state;

        return (
            <Container text textAlign='center' style={{ marginTop: 50}}>
                <Header as="h3" icon textAlign="center">
                    <Icon name='idea' circular/>
                    Startup Idea Generator
                </Header>

                <Header as='h1' style={{ marginTop: 50 }}>
                    <span>{startup}</span>
                    <Icon 
                        name='info circle' 
                        style={styles.info}
                        onClick={this.handleInfoClick}
                    />
                    <span style={styles.for}>for</span>
                    <span>{noun}</span> 
                </Header>

                {showStartupWiki && <Container text textAlign='left'>
                    <Segment raised>
                        {startupWiki && startupWiki[1] && 
                            startupWiki[1].map((s, i) => 
                                <Container key={i} style={{ marginBottom: 25 }}>
                                    <Header as='h4'>{s}</Header>
                                    <p>{startupWiki[2][i]}</p>
                                </Container>
                            )
                        }
                    </Segment>
                </Container>}

                <Button 
                    primary 
                    onClick={this.get}
                    style={{ marginTop: 50}}
                >
                    Roll for a New Idea
                </Button>
            </Container>
        );
    }
}

export default App;
