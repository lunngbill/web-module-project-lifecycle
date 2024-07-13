import React from 'react'
import Form from './Form'
import TodoList from './TodoList'
import axios from 'axios'
import Todo from './Todo'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state = {
    todos: [],
    error: '',
    todoNameInput: '',
    showAll: true
  }

  resetForm = () => this.setState({
    ...this.state,
    todoNameInput: ''
  })

  setResponseError = err => this.setState({...this.state, error: err.response.data.message })

  fetchAllTodos = () => {
    axios.get(URL)
      .then(res => {
        this.setState({
          ...this.state,
          todos: res.data.data
        })
      })
      .catch(this.setResponseError)
  }

  componentDidMount() {
    this.fetchAllTodos()
  }

  todoNameChange = (evt) => {
    const {value} = evt.target
    this.setState({
      ...this.state,
      todoNameInput: value
    })
  }


  addTodo = () => {
    axios.post(URL, { name: this.state.todoNameInput})
      .then(res => {
        this.setState({
          ...this.state,
          todos: this.state.todos.concat(res.data.data)
        })
        this.resetForm()
      })
      .catch(this.setResponseError)
  }

  toggleCompleted = id => () => {
    axios.patch(`${URL}/${id}`)
      .then(res => {
        this.setState({
          ...this.state,
          todos: this.state.todos.map(td => {
            if (id !== td.id) return td
            return res.data.data
          })
        })
      })
      .catch(this.setResponseError)
  }

  todoSubmit = evt => {
    evt.preventDefault()
    this.addTodo()
  }

  toggleShowAll = () => {
    this.setState({
      ...this.state,
      showAll: !this.state.showAll
    })
  }

  render() {
    return (
      <div>
        <div id='error'>Error: {this.state.error}</div>
            <TodoList
              todos={this.state.todos}
              showAll={this.state.showAll}
              toggleCompleted={this.toggleCompleted}
            />
            <Form
              todoSubmit={this.todoSubmit}
              todoNameChange={this.todoNameChange}
              toggleShowAll={this.toggleShowAll}
              showAll={this.state.showAll}
              todoNameInput={this.state.todoNameInput}
            />
      </div>
    )
  }
}
