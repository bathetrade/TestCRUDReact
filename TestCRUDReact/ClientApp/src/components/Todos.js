import React, { Component } from 'react';
import { NewTodo } from './NewTodo.js';

export class Todos extends Component {
    static displayName = Todos.name;

    constructor(props) {
        super(props);
        this.state = { todos: [] };

        fetch('/api/todo')
            .then(response => response.json())
            .then(data => this.setState({ todos: data }));
    }

    static test(value) {
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

    static renderTodosTable(todos) {
        return (
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Completed</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo =>
                        <tr key={todo.id}>
                            <td>{Todos.test(todo.isDone)}</td>
                            <td>{todo.text}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.todos.length > 0
            ? Todos.renderTodosTable(this.state.todos)
            : "No todos.";

        return (
            <div>
                <h1>Todos</h1>
                <NewTodo />
                {contents}
            </div>
        );
    }
}
