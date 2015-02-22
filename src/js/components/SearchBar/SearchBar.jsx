/** @jsx React.DOM */

var React = require('react');
require('./SearchBar.css');

var SearchBar = React.createClass({
 
  render () {
  	
    return (
      <div className="SearchBar">
        <input className="SearchBar-input"
               placeholder="搜尋書名"
               onChange={this.props.handleChange}
               value={this.props.value} />
      </div>
    );
  }
});

module.exports = SearchBar;


