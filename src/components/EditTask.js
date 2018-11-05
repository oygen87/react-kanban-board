import React, { Component } from 'react';
import { context } from '../store/MyContext.js';

export class EditTask extends Component {

    state = {
        id: Date.now(),
        title: "",
        content: "",
        active: false,
        status: "todo",
        color: "green",
    };

    handleTitleChange = (e) => {
        if (this.context.edit) {
            this.context.dispatch({ type: "EDIT_TASK_PROPERTY", property: "title", value: e.target.value });
        } else {
            this.setState({ title: e.target.value });
        }
    }
    handleContentChange = (e) => {
        if (this.context.edit) {
            this.context.dispatch({ type: "EDIT_TASK_PROPERTY", property: "content", value: e.target.value });
        } else {
            this.setState({ content: e.target.value });
        }
    }
    handleColorChange = (e) => {
        if (this.context.edit) {
            this.context.dispatch({ type: "EDIT_TASK_PROPERTY", property: "color", value: e.target.value.toLowerCase() });
        } else {
        this.setState({ color: e.target.value.toLowerCase() });
    }
    }
    handleCreateTask = () => {
        this.context.dispatch({ type: "CREATE_TASK", newTask: this.state });
        this.resetForm();
    }
    handleEditSave = () => {
        this.context.dispatch({ type: "SAVE_EDIT_TASK", task: this.state });
    }
    handleEditCancel = () => {
        this.resetForm();
        this.context.dispatch({ type: "SET_EDIT_FALSE" });
    }
    resetForm = () => {
        this.setState({
            id: Date.now(),
            title: "",
            content: "",
            active: false,
            status: "todo",
            color: "green"
        });
    }

    render() {
        if (this.context.editTask && this.context.edit) {
            return (
                <div>
                <div className="form-group">
                <h2>EDIT</h2>
                </div>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input id="title" className="form-control" type="text" onChange={this.handleTitleChange} value={this.context.editTask.title} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Content</label>
                        <textarea id="content" className="form-control" onChange={this.handleContentChange} value={this.context.editTask.content} />
                    </div>
                    <div className="form-group">
                        <select className="form-control" onChange={this.handleColorChange}>
                            <option selected={this.context.editTask.color === "green"}>GREEN</option>
                            <option selected={this.context.editTask.color === "yellow"}>YELLOW</option>
                            <option selected={this.context.editTask.color === "red"}>RED</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-success float-right" onClick={this.handleEditSave}>SAVE</button>
                        <button className="btn btn-secondary flex" onClick={this.handleEditCancel}>CANCEL</button>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                <div className="form-group">
                <h2>NEW</h2>
                </div>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input id="title" className="form-control" type="text" onChange={this.handleTitleChange} value={this.state.title} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Content</label>
                        <textarea id="content" className="form-control" onChange={this.handleContentChange} value={this.state.content} />
                    </div>
                    <div className="form-group">
                        <select className="form-control" onChange={this.handleColorChange} value={this.state.color}>
                            <option>GREEN</option>
                            <option>YELLOW</option>
                            <option>RED</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary btn-block" onClick={this.handleCreateTask}>Create Task</button>
                    </div>
                </div>
            )
        }
    }
}
EditTask.contextType = context;
export default EditTask