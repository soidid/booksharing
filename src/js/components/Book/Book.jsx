/** @jsx React.DOM */

var React = require('react');
var AppActions = require('../../actions/AppActions');

require('./Book.css');

var Book = React.createClass({
  _onDestroy (event) {
    event.stopPropagation();
    AppActions.destroy(this.props.data.id);
  },

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
        <div className="Book-deleteButton" 
             onClick={this._onDestroy} >Delete</div>
        <img className="Book-img" src={img} />
        <div className="Book-title">{title}</div>
        <div className="Book-author">{author}</div>
      </div>
    );
  }
});

module.exports = Book;


