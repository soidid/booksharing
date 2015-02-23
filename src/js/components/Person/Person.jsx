/** @jsx React.DOM */

var React = require('react/addons');

require('./Person.css');

var Person = React.createClass({
  
  getInitialState(){
    return {}
  },
  
  render () {
  	
  	var name = (this.props.name || "default");
    var imgUrl = require('./images/'+name+'.jpg');

    return (
    	<div className="Person">
    	    <img src={imgUrl}
    	         className="Person-img" />
    	    
    	</div>
    );
  }
});

module.exports = Person;


