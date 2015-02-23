/** @jsx React.DOM */

var React = require('react');
var Book = require('../Book/Book.jsx');

require('./List.css');

var List = React.createClass({
  render () {
  	
  	switch(this.props.type){
  		case 'basic':
      
      var selection = [];
      console.log("selection:")
      console.log(this.props.selection);
      if(this.props.selection)
        selection = Object.keys(this.props.selection);

      var booksArray = [];
      for(var key in this.props.data){
        booksArray.push(this.props.data[key]);
      }
  		var bookItems = booksArray
  		
  		.filter((item) => {
        	return item.title.indexOf(this.props.searchText) != -1;
        })

        .map((item, index) => {
            var boundClick = this.props.handleClick.bind(null, item);
            var boundSelect = this.props.handleSelect.bind(null, item);
            var selected = selection.indexOf(item.id)!==-1;
            //console.log(selection);
  			    console.log(selected);

        return (
           		<Book key={index} 
           		      data={item}
           		      handleClick={boundClick}
                    handleSelect={boundSelect}
                    selected={selected} />
  			)
  		});

  		return (
            <div className="List">
            	
            	<div className="List-content">
            		{bookItems}
            	</div>
            </div>
        );
  		break;


  		case 'defaultHide':
  		
  		return (
            <div className="List--defaultHide">
            	<button onClick={this.props.handleClick}>回到列表</button>
            	<Book data={this.props.data} />
            </div>
        );
  		break;

  		case 'defaultHide-show':
  		
  		return (
            <div className="List--defaultHide is-show">
              <div>
                  <button className="List-button"
                          onClick={this.props.handleClick}>回到列表</button>
              </div>
            	<Book data={this.props.data} />
              <div>Some detail data here</div>
            </div>
        );
  		break;

  	}
  	
    
  }
});

module.exports = List;


