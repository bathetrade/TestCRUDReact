import React, { Component } from 'react';

export class Todos extends Component {
    static displayName = Todos.name;

    constructor(props) {
        super(props);
        this.state = { todos: [] };

    }

    static renderTodosTable(todos) {
        return (
            <p>This is a todos table</p>
        );
    }
    
    render() {
        let contents = this.state.todos.length > 0
            ? Todos.renderTodosTable(this.state.todos)
            : "No todos.";

        return (
            <div>
                <h1>Todos</h1>
                {contents}
            </div>
        );
    }
}
