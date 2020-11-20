import React, {Component} from 'react';
import {BrowserRouter as Router , Route} from 'react-router-dom'
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import Header from './components/Layout/Header';
import Dashboard from './components/pages/Dashboard';
import Expenses from './components/pages/Expenses';
import Navibar from './components/Layout/MyNavbar';
import Transactions from './components/pages/Transactions';
import Login from './components/pages/Login';
import './App.css';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component{
  state = {
    todos: []
  }

  componentDidMount(){
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
    .then(res => this.setState({todos:res.data}))
  }
  markComplete = (id) => {
    this.setState({todos: this.state.todos.map(todo => {
      if(todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo;
    })});
  }
  delTodo = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then(res => this.setState({ todos: [...this.state.todos.filter
      (todo => todo.id !== id)]}));
  }

  addTodo= (title) => {
    axios.post('https://jsonplaceholder.typicode.com/todos',{
    title,
    completed: false
  })
  .then(res=> this.setState({todos: 
    [...this.state.todos , res.data]}));
  }

  render(){
  return (
    <Router>
    <div className="App" style={{background: '#d3d3d3', backgroundSize: 'cover',   width: '100%' , height: '100vh'}}>
      <Navibar />
      <div className="container">
      <Route exact path = "/" render={props => (
        <React.Fragment>
          <AddTodo addTodo={this.addTodo}/>
          <Todos todos = {this.state.todos} markComplete = {this.markComplete}
          delTodo={this.delTodo} />
        </React.Fragment>
      )} />
      <Route path="/home" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/transactions" component={Transactions} />
      <Route path="/expenses" component={Expenses} />
      <Route path="/profile" component={Login} />
      </div>
      </div>
      </Router>
      );
    }
  }

export default App;
