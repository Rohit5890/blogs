import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import './App.css';
import BlogListView from './components/BlogListView';
import BlogDetailsView from './components/BlogDetailsView';

class App extends Component{

  clearData(){
    localStorage.removeItem('blogArrayList');
  }

  componentDidMount(){
    window.addEventListener('beforeunload', this.clearData);
  }
  componentWillUnmount(){
    this.clearData();
    window.removeEventListener('beforeunload', this.clearData);
  }

  renderView(){
    return(
      <Switch>
        <Route exact path="/" component={BlogListView} />
        <Route exact path="/details/:title/:id" component={BlogDetailsView} />
      </Switch>
    )
  }
  render(){
    return (
      <div className="app">
        <BrowserRouter>
          {this.renderView()}
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
