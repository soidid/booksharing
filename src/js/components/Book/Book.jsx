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

  _imageNotFound (event){
      event.target.src = "images/default.jpg";
  },
  
  render () {
  	var {
      id,
  		title,
  		author,
  		img,
  		status,
      owner,
      current,
      wishedBy
  	} = this.props.data;

    var wishItem = (status === "wish-list") ? <div className="Book-wishList">Wish List</div>:"";
    var deleteBtn = <div className="Book-deleteButton" onClick={this._onDestroy} >Delete</div>;
    
    var personItem = (status === "wish-list") ? <Person name={wishedBy} /> : <Person name={owner} />;
    
    var currentPersonItem = (owner && owner !== current && status === "in-shelf") ? 
    <div className="Book-currentPersonSet">
       <div className="Book-currentPersonArrow" /><div className="Book-arrow" />
       <Person name={current} />
    </div> : "";

    return (
      <div className="Book"
           onClick={this.props.handleClick}>
        <input className="Book-check"
               type="checkbox"
               onClick={this.props.handleSelect}
               onChange={this.props.handleSelect}
               checked={this.props.selected} />

        {wishItem}
        
        <img className="Book-img" 
             src={img} 
             onError={this._imageNotFound }/>

        <div className="Book-main">
            <div className="Book-title">{title}</div>
            <div className="Book-author">{author}</div>
            
            <div className="Book-person">
              {personItem}
              {currentPersonItem}
            </div>

        </div>
      </div>
    );
  }
});

module.exports = Book;


