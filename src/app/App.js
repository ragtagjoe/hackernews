import React, { Component } from 'react';
import axios from 'axios';
// Classes
import Search from '../components/search/Search';
import Table from '../components/table/Table';
// Components
import Button from '../elements/button/Button';
// Hoc's
import WithLoading from '../hoc/withLoading/WithLoading';
// Variables
import { DEFAULT_QUERY, PATH_BASE, PATH_SEARCH, PARAM_SEARCH, PARAM_PAGE } from '../variables';
// CSS
import './App.css';

class App extends Component {

  _isMounted = false;
  
  state = {
    results: null,
    searchKey: '',
    searchTerm: DEFAULT_QUERY,
    error: null,
    isLoading: false
  }

  componentDidMount() {
    this._isMounted = true;

    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm});
    this.fetchSearchTopStories(searchTerm);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  fetchSearchTopStories(searchTerm, page = 0) {
    this.setState({ isLoading: true })
    axios(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`)
      .then(result => this._isMounted && this.setSearchTopStories(result.data))
      .catch(error => this._isMounted && this.setState({error: error}));
  }

  setSearchTopStories = result => {
    const { hits, page } = result;
    
    this.setState(prevState => {
      const { searchKey, results } = prevState;
      const oldHits = results && results[searchKey] ? results[searchKey].hits : [];
      const updatedHits = [...oldHits, ...hits];

      return {
        results: {
          ...results,
          [searchKey]: {
            hits: updatedHits,
            page: page
          }
        },
        isLoading: false
      }
    })
  }

  onSearchChange = event => {
    this.setState({
      searchTerm: event.target.value
    })
  }

  onSearchSubmit = e => {
    e.preventDefault();
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm});

    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm);
    }
  }

  needsToSearchTopStories = (searchTerm) => {
    return !this.state.results[searchTerm];
  }

  onDismiss = id => {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];

    const updateItems = hits.filter(item => item.objectID !== id);
    this.setState({
      results: {
        ...results,
        [searchKey]: { 
          hits: updateItems,
          page: page
        }
      }
    })
  }

  isSearched = term => item => 
    item.title.toLowerCase().includes(term.toLowerCase());

  render() {
    const { results, searchTerm, searchKey, error, isLoading } = this.state;
    const page = (results && results[searchKey] && results[searchKey].page) || 0;
    const list = (results && results[searchKey] && results[searchKey].hits) || [];

    return (
      <div className="page">
        <div className="interactions">
          <Search value={searchTerm} onChange={this.onSearchChange} onSubmit={this.onSearchSubmit}>Search</Search>
        </div>
        {
          error
          ? <p>Oops, something went wrong.</p>
          : <React.Fragment>
              <Table items={list} onDismiss={this.onDismiss} />
              <div className="interactions">
                <ButtonWithLoading isLoading={isLoading} onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>More</ButtonWithLoading>
              </div>
            </React.Fragment>
        }
      </div>
    );
  }
}

const ButtonWithLoading = WithLoading(Button);

export default App;
