import React, { Component } from 'react';
import './App.scss';
import { context } from './store/MyContext.js';
import Task from './components/Task.js';
import EditTask from './components/EditTask.js';

class App extends Component {

  handleDrop = (e, newStatus) => {
    const id = e.dataTransfer.getData("id");
    this.context.dispatch({ type: "CHANGE_STATUS", id, newStatus });
    e.target.classList.remove("dragover");
  }
  handleDragOver = (e) => {
    e.preventDefault();
    if (e.target.classList.contains("taskcontainer")) {
      e.target.classList.add("dragover");
    }
  }
  handleDragExit = (e) => {
    e.preventDefault();
    if (e.target.classList.contains("taskcontainer")) {
      e.target.classList.remove("dragover");
    }
  }
  handleDragLeave = (e) => {
    e.preventDefault();
    if (e.target.classList.contains("taskcontainer")) {
      e.target.classList.remove("dragover");
    }
  }

  render() {
    let todolist = <div></div>;
    let doinglist = <div></div>;
    let donelist = <div></div>;
    if (this.context.tasks) {
      todolist = this.context.tasks
        .filter(t => t.status === "todo")
        .sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))
        .map(t => <Task key={t.id} id={t.id} title={t.title} content={t.content} status={t.status} color={t.color} active={t.active} />); 

      doinglist = this.context.tasks
        .filter(t => t.status === "doing")
        .map(t => <Task key={t.id} id={t.id} title={t.title} content={t.content} status={t.status} color={t.color} active={t.active} />);

      donelist = this.context.tasks
        .filter(t => t.status === "done")
        .map(t => <Task key={t.id} id={t.id} title={t.title} content={t.content} status={t.status} color={t.color} active={t.active} />);
    }
    return (
      <div className="App">
        <div className="container app-container">
          <div className="row navbar-header">
            <div className="col-3 dashboard-header text-center">
            </div>
            <div className="col-3 todo-header text-center">
              Todo
            </div>
            <div className="col-3 doing-header text-center">
              Doing
            </div>
            <div className="col-3 done-header text-center">
              Done
            </div>
          </div>
          <div className="row task-row">
            <div className="col-3 dashboard">
              <EditTask />
            </div>
            <div className="col-3 todo taskcontainer" droppable="true" onDrop={(e) => { this.handleDrop(e, "todo") }} onDragOver={this.handleDragOver} onDragExit={this.handleDragExit} onDragLeave={this.handleDragLeave}>
              {todolist}
            </div>
            <div className="col-3 doing taskcontainer" droppable="true" onDrop={(e) => { this.handleDrop(e, "doing") }} onDragOver={this.handleDragOver} onDragExit={this.handleDragExit} onDragLeave={this.handleDragLeave}>
              {doinglist}
            </div>
            <div className="col-3 done taskcontainer" droppable="true" onDrop={(e) => { this.handleDrop(e, "done") }} onDragOver={this.handleDragOver} onDragExit={this.handleDragExit} onDragLeave={this.handleDragLeave}>
              {donelist}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

App.contextType = context;
export default App
