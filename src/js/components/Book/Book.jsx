/** @jsx React.DOM */

var React = require('react');
require('./Book.css');

var Book = React.createClass({
  render () {
  	var {
  		title,
  		author,
  		img,
  		status
  	} = this.props.data;

    var wishItem = (status === "wish-list") ? <div className="Book-wishList">Wish List</div>:"";
    
    return (
      <div className="Book"
           onClick={this.props.handleClick}>
        {wishItem}
        <img className="Book-img" src={img} />
        <div className="Book-title">{title}</div>
        <div className="Book-author">{author}</div>
      </div>
    );
  }
});

module.exports = Book;


