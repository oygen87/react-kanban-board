import React, { Component } from 'react';
import { context } from '../store/MyContext.js';

export class Task extends Component {

    state = {};

    componentWillMount() {
        const initState = {
            id: this.props.id,
            //active: this.props.active,
        }
        this.setState(initState);
    }
    
    handleDragStart = (e) => {
        e.dataTransfer.setData("id", this.state.id);
    }
    toggleActive = (e) => {
        //this.setState({active: !this.state.active});
        const task = this.context.tasks.filter(t => t.id === this.state.id)[0];
        this.context.dispatch({type: "TOGGLE_ACTIVE", task: task});
    }
    handleDelete = (e) => {
        this.context.dispatch({type: "DELETE_TASK", id: this.state.id});
    }
    handleEdit = (e) => {
        e.stopPropagation();
        const task = this.context.tasks.filter(t => t.id === this.state.id)[0];
        this.context.dispatch({type: "SET_EDIT_TRUE", task: task});
    }

  render() {
    const task = this.context.tasks.filter(t => t.id === this.state.id)[0];
    const classString = "task " + task.color;
    return (
      <div className={classString} draggable onDragStart={this.handleDragStart} onClick={this.toggleActive}>
        <h2>{task.title}</h2>
        <p className="content" hidden={this.props.active}>{task.content}</p>
        <span onClick={this.handleDelete} hidden={this.state.active} className="tool-btn float-right"><i className="fas fa-trash"></i></span>
        <span onClick={this.handleEdit} hidden={this.state.active} className="tool-btn float-right"><i className="fas fa-edit"></i></span>
      </div>
    )
  }
}

Task.contextType = context;
export default Task

