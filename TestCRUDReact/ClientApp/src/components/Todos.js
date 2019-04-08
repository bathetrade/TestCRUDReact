import React, { Component } from 'react';
import { NewTodo } from './NewTodo.js';

export class Todos extends Component {
    static displayName = Todos.name;

    constructor(props) {
        super(props);
        this.state = { todos: [] };
        this.renderTodosTable = this.renderTodosTable.bind(this);
        this.handleAdd = this.handleAdd.bind(this);

        fetch('/api/todo')
            .then(response => response.json())
            .then(data => this.setState({ todos: data }));
    }

    static createCheckbox(value) {
        if (value === true) {
            return (
                <input type="checkbox" disabled checked />
            );
        }
        else {
            return (
                <input type="checkbox" disabled />
            );
        }
    }

    onDelete(id) {
        fetch('/api/todo/' + id, {
            method: "DELETE"
        })
            .then(response => {
                if (response.ok === true) {
                    const todos = this.state.todos.slice();
                    var newTodos = todos.filter(todo => todo.id !== id);
                    this.setState({ todos: newTodos });
                }
            });
    }

    handleAdd(todo) {
        let todos = this.state.todos.slice();
        todos = todos.concat(todo);
        this.setState({ todos: todos });
    }

    renderTodosTable(todos) {
        return (
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Completed</th>
                        <th>Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.todos.map(todo =>
                        <tr key={todo.id}>
                            <td>{Todos.createCheckbox(todo.isDone)}</td>
                            <td>{todo.text}</td>
                            <td>
                                <div className="btn-group">
                                    <button onClick={this.props.onEdit} className="btn btn-outline-primary">Edit</button>
                                    <button onClick={() => this.onDelete(todo.id)} className="btn btn-outline-danger">Delete</button>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.todos.length > 0
            ? this.renderTodosTable(this.state.todos)
            : "No todos.";

        return (
            <div>
                <h1>Todos</h1>
                <NewTodo onAdd={(todo) => this.handleAdd(todo)} />
                {contents}
            </div>
        );
    }
}
