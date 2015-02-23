/** @jsx React.DOM */

var React = require('react');
var Person = require('../Person/Person.jsx');

var AppActions = require('../../actions/AppActions');

require('./Book.css');

var Book = React.createClass({
  _onDestroy (event) {
    event.stopPropagation();
    AppActions.destroy(this.props.data.id);
  },

  
  render () {
  	var {
      id,
  		title,
  		author,
  		img,
  		status,
      owner,
      wishedBy
  	} = this.props.data;

    var wishItem = (status === "wish-list") ? <div className="Book-wishList">Wish List</div>:"";
    var deleteBtn = <div className="Book-deleteButton" onClick={this._onDestroy} >Delete</div>;
    
    var personItem = (status === "wish-list") ? <Person name={wishedBy} /> : <Person name={owner} />;
    
    return (
      <div className="Book"
           onClick={this.props.handleClick}>
        <input className="Book-check"
               type="checkbox"
               onClick={this.props.handleSelect}
               onChange={this.props.handleSelect}
               checked={this.props.selected} />

        {wishItem}
        
        <img className="Book-img" src={img} />
        <div className="Book-title">{title}</div>
        <div className="Book-author">{author}</div>

        {personItem}

      </div>
    );
  }
});

module.exports = Book;


