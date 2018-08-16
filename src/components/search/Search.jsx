import React, { Component } from 'react';

class Search extends Component {

  componentDidMount() {
    if (this.input) {
      this.input.focus();
    }
  }

  render () {
    const {value, onChange, onSubmit, children} = this.props;
    return (
      <React.Fragment>
        <form onSubmit={onSubmit}>
          <input type="text" value={value} onChange={onChange} ref={(node) => { this.input = node}} />
          <button type="submit">{children}</button>
        </form> 
      </React.Fragment>
    )
  }
}

export default Search
