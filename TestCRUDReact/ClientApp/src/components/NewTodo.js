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

        this.test = this.test.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    test(event) {
        event.preventDefault();
        fetch('/api/todo', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.todo)
        });
        this.setState({ submitted: true, submitText: this.state.text });
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
                <form onSubmit={this.test}>
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
