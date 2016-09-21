import React, { Component } from 'react';
import '../css/App.css';
import '../css/react-data-grid.css';
import Header from './header';
import DocoDB from '../data/documentDB';
import Toolbar from './toolbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  constructor() {
    super();

    this.onClick = this.onClick.bind(this);
    this.handleToolBarMenuItemChange = this.handleToolBarMenuItemChange.bind(this);
    this.state = {
      categories: [
        {
          id:'1',
          name:'2016'
        },
        {
          id:'2',
            name:'2015'
        },
        {
          id:'3',
            name:'2014'
        }
      ],
      toolBarSelectedMenuItem: 0      
    };
  }

  onClick() {

  }

  handleToolBarMenuItemChange(event, index, value) {
    this.setState({ toolBarSelectedMenuItem: value });
    if(value == 0){
      // home page
      this.props.history.push('/');
    }
     else if(value == 3){
      // settigs page
      this.props.history.push('/valueseries');
     }
    else if(value == 2){
      // plan page
      this.props.history.push('/plan');
    }
    else if(value == 4){
      // settigs page
      this.props.history.push('/settings');
    }
    else if(value == 5){
      // settigs page
      this.props.history.push('/about');
    }
    else{
      this.props.history.push('/category');
    }
    //alert(this.state.toolBarSelectedMenuItem);
  }

  setNavigationRoute(value)
  {
    
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <Header />
          <Toolbar selectedMenuItem={this.state.toolBarSelectedMenuItem} handleChange={this.handleToolBarMenuItemChange} />
          <div className="MainBody">
            {this.props.children}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
