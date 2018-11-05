import React, { Component } from 'react';

export const context = React.createContext();

export const reducer = (state, action) => {
    switch (action.type) {
        case "CHANGE_STATUS":
            const taskList1 = [...state.tasks];
            taskList1.forEach(t => {
                if (t.id === +action.id){
                    t.status = action.newStatus;
                }
            });
            saveStateToLocalStorage(taskList1, state.edit, state.editTask);
            return { ...state, tasks: taskList1 };
        case "CREATE_TASK":
            const taskList2 = [...state.tasks];
            taskList2.push(action.newTask);
            saveStateToLocalStorage(taskList2, state.edit, state.editTask);
            return { ...state, tasks: taskList2 };
        case "DELETE_TASK":
            const taskList4 = [...state.tasks].filter(t => t.id !== +action.id);
            saveStateToLocalStorage(taskList4, state.edit, state.editTask);
            return { ...state, tasks: taskList4 };
        case "SET_EDIT_TRUE":
            saveStateToLocalStorage(state.tasks, true, action.task);
            return { ...state, edit: true, editTask: action.task };
        case "SET_EDIT_FALSE":
            saveStateToLocalStorage(state.tasks, false, {});
            return { ...state, edit: false, editTask: {} };
        case "SAVE_EDIT_TASK":
            const taskList3 = [...state.tasks].filter(t => t.id !== +state.editTask.id);
            taskList3.push(state.editTask);
            saveStateToLocalStorage(taskList3, false, state.editTask);
            return { ...state, tasks: taskList3, edit: false, editTask: {} };
        case "EDIT_TASK_PROPERTY":
            const newEditTask = {...state.editTask};
            newEditTask[action.property] = action.value;
            saveStateToLocalStorage(state.tasks, state.edit, newEditTask);
            return {...state, editTask: newEditTask};
        case "TOGGLE_ACTIVE":
            const taskList5 = [...state.tasks];
            taskList5.forEach(t => {
                if (t.id === +action.task.id){
                    t.active = !t.active;
                }
            });
            saveStateToLocalStorage(taskList5, state.edit, state.editTask);
            return { ...state, tasks: taskList5 };
        default:
            break;
    }
};

const saveStateToLocalStorage = (tasks, edit, taskEdit) => {
    window.localStorage.setItem("tasks",  JSON.stringify(tasks));
    window.localStorage.setItem("edit",  edit);
    window.localStorage.setItem("editTask",  JSON.stringify(taskEdit));
}

export class MyProvider extends Component {

    componentDidMount = () => {
        const initState = {
            edit: false,
            editTask: {
                id: Date.now(),
                title: "",
                content: "",
                active: false,
                status: "todo",
                color: "green",
            },
            tasks: [],
            dispatch: action => {
                this.setState(state => reducer(state, action));
            }
        }
        const localStorageTasks = window.localStorage.getItem("tasks");
        const localStorageEdit = window.localStorage.getItem("edit");
        const localStorageEditTask = window.localStorage.getItem("editTask");
        if (localStorageTasks && localStorageEdit && localStorageEditTask) {
            this.setState({tasks: JSON.parse(localStorageTasks), edit: JSON.parse(localStorageEdit), editTask: JSON.parse(localStorageEditTask)});
        } else {
            this.setState(initState);
        }
    }

    state = {
        dispatch: action => {this.setState(state => reducer(state, action));
    }}

    render() {
        return (
            <context.Provider value={this.state}>
                {this.props.children}
            </context.Provider>
        )
    }
}
