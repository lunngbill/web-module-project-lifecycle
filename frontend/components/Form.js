import React from 'react'

export default class Form extends React.Component {
  render() {
    return (
      <>
        <form id='todoForm' onSubmit={this.props.todoSubmit}>
          <input value={this.props.todoNameInput} onChange={this.props.todoNameChange} type='text' placeholder='Type todo'></input>
          <input type='submit'></input>
        </form>
        <button onClick={this.props.toggleShowAll}>{this.props.showAll ? 'Hide Completed' : 'Show Completed'}</button>
      </>
    )
  }
}
