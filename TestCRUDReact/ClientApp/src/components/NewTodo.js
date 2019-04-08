import React, { Component } from 'react';
import '../css/NewTodo.css';

export class NewTodo extends Component {
    static displayName = NewTodo.name;

    constructor(props) {
        super(props);
        this.state = {
            todo: {
                text: "",
                isDone: false
            },
            submitted: false,
            submitText: ""
            };

        this.handleAdd = this.handleAdd.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    static getIdFromUrl(urlString) {
        var url = new URL(urlString);
        var path = url.pathname;
        var lastSegmentIndex = path.lastIndexOf('/');
        if (lastSegmentIndex !== -1 && lastSegmentIndex !== path.length - 1) {
            return path.slice(lastSegmentIndex + 1);
        }
        return null;
    }

    handleAdd(event) {
        event.preventDefault();
        fetch('/api/todo', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.todo)
        })
            .then(response => {
                if (response.status === 201) {
                    let id = NewTodo.getIdFromUrl(response.headers.get("location"));
                    let todo = { ...this.state.todo };
                    todo.id = id;
                    this.props.onAdd(todo);
                    this.setState({ submitted: true, submitText: this.state.text });
                }
            })
    }

    handleNameChange(e) {
        let todo = Object.assign({}, this.state.todo);
        todo.text = e.target.value;
        this.setState({ todo: todo });
    }

    render() {
        let added = this.state.submitted === false
            ? <p></p>
            : <p>Added new todo: {this.state.submitText}</p>;

        return (
            <div className="add-todo-container">
                <h3>Add To-do</h3>
                <form onSubmit={this.handleAdd}>
                    <div className="form-group">
                        <input className="form-control" type="text" value={this.state.text} placeholder="Name" onChange={this.handleNameChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Create</button>
                </form>
                {added}
            </div>
        );
    }
}
