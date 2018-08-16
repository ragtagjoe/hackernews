import React from 'react';
import PropTypes from 'prop-types'

import Button from '../../elements/button/Button';

const Table = ({items, onDismiss}) => {
  return (
    <React.Fragment>
      {items.map(item =>
        <div key={item.objectID} className="table-row">
          <span style={{width: '40%'}}><a href={item.url}>{ item.title }</a> </span>
          <span style={{width: '30%'}}>{ item.author }</span>
          <span style={{width: '10%'}}>{ item.num_comments }</span>
          <span style={{width: '10%'}}>{ item.points }</span>
          <span style={{width: '10%'}}>
            <Button className="button-inline" onClick={() => onDismiss(item.objectID)}>Dismiss</Button>
          </span>
        </div>
      )}
    </React.Fragment>
  )
}

Table.propTypes = {
  items: PropTypes.array.isRequired,
  onDismiss: PropTypes.func.isRequired
}

export default Table
