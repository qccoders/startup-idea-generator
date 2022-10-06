import React, { Component } from 'react';
import { Container, Header, Icon, Button, Segment } from 'semantic-ui-react';
import axios from 'axios';
import { getIdeaPair } from './idea';

const styles = {
  for: {
    color: '#808080',
    fontWeight: 100,
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
  },
  unlock: {
    display: 'inline-block',
    fontSize: 15,
    top: -25,
    color: 'cyan',
    position: 'relative',
  },
  lock: {
    display: 'inline-block',
    fontSize: 15,
    top: -25,
    color: 'red',
    position: 'relative',
  },
  link: {
    marginLeft: 5,
  },
  button: {
    marginTop: 50,
    marginRight: 0,
    marginLeft: 0,
  },
};

const initialState = {
  startup: '',
  startupLock: false,
  noun: '',
  nounLock: false,
  wiki: {
    entries: [],
    position: 0,
    show: false,
  },
};

class App extends Component {
  state = initialState;

  componentDidMount = () => {
    this.get();
  };

  get = () => {
    let idea = getIdeaPair();
    this.setState({
      startup: this.state.startupLock ? this.state.startup : idea.startup,
      noun: this.state.nounLock ? this.state.noun : idea.noun,
      wiki: initialState.wiki,
    });
  };

  handleInfoClick = () => {
    if (this.state.wiki.show) {
      this.setState({ wiki: initialState.wiki });
    } else {
      axios
        .get(
          'https://en.wikipedia.org/w/api.php?action=opensearch&search=' +
            this.state.startup +
            '&format=json&origin=*'
        )
        .then((response) => {
          this.setState({
            wiki: {
              entries: response.data,
              position: 0,
              show: true,
            },
          });
        });
    }
  };

  handleLockClick = () => {
    this.setState({ startupLock: !this.state.startupLock });
  };

  handlenounClick = () => {
    this.setState({ nounLock: !this.state.nounLock });
  };

  handleStartupWikiPage = (page) => {
    let wiki = this.state.wiki;
    let next = wiki.position + page;

    if (next >= wiki.entries[1].length) {
      next = 0;
    } else if (next < 0) {
      next = wiki.entries[1].length - 1;
    }

    this.setState({ wiki: { ...this.state.wiki, position: next } });
  };

  render() {
    let { startup, startupLock, noun, nounLock, wiki } = this.state;

    let wikiTitle =
      wiki.entries && wiki.entries[1] && wiki.entries[1][wiki.position];
    let wikiText =
      wiki.entries && wiki.entries[2] && wiki.entries[2][wiki.position];

    return (
      <Container text textAlign="center" style={{ marginTop: 50 }}>
        <Header as="h3" icon textAlign="center">
          <Icon name="idea" circular />
          Startup Idea Generator
        </Header>

        <Header as="h1" style={{ marginTop: 50 }}>
          <span>{startup}</span>
          <Icon
            name={startupLock ? 'lock' : 'lock open'}
            style={startupLock ? styles.lock : styles.unlock}
            onClick={this.handleLockClick}
          />
          <Icon
            name="info circle"
            style={styles.info}
            onClick={this.handleInfoClick}
          />
          <span style={styles.for}>for</span>
          <span>{noun}</span>
          <Icon
            name={nounLock ? 'lock' : 'lock open'}
            style={nounLock ? styles.lock : styles.unlock}
            onClick={this.handlenounClick}
          />
        </Header>

        {wiki.show && (
          <Container text textAlign="left">
            <Segment raised>
              <Container>
                <Header as="h4">
                  <a href={'https://en.wikipedia.org/wiki/' + wikiTitle}>
                    {wikiTitle}
                    <Icon style={styles.link} name="external alternate" />
                  </a>
                </Header>
                <p>{wikiText}</p>
                {wiki.entries[1].length > 1 && (
                  <Container textAlign="right">
                    <Button.Group>
                      <Button size="mini" compact icon>
                        <Icon
                          name="chevron left"
                          onClick={() => this.handleStartupWikiPage(-1)}
                        />
                      </Button>
                      <Button size="mini" compact>
                        {wiki.position + 1}/{wiki.entries[1].length}
                      </Button>
                      <Button size="mini" compact icon>
                        <Icon
                          name="chevron right"
                          onClick={() => this.handleStartupWikiPage(1)}
                        />
                      </Button>
                    </Button.Group>
                  </Container>
                )}
              </Container>
            </Segment>
          </Container>
        )}

        <Button primary onClick={this.get} style={styles.button}>
          New Idea
        </Button>
      </Container>
    );
  }
}

export default App;
