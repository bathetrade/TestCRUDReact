import React, { Component } from 'react';

export class FetchData extends Component {
    static displayName = FetchData.name;

    constructor(props) {
        super(props);
        this.state = { forecasts: [], loading: true, buttonClicks: 0 };
        this.fetchData = this.fetchData.bind(this);
        this.buttonClick = this.buttonClick.bind(this);
        this.renderForecastsTable = this.renderForecastsTable.bind(this);

       this.fetchData();
    }

    fetchData(clicks = 0) {
        fetch('api/SampleData/WeatherForecasts')
            .then(response => response.json())
            .then(data => {
                this.setState({ forecasts: data, loading: false, buttonClicks: clicks });
            });
    }

    buttonClick() {
        this.fetchData(this.state.buttonClicks + 1);
    }

    renderForecastsTable(forecasts) {
        return (
            <div>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Temp. (C)</th>
                            <th>Temp. (F)</th>
                            <th>Summary</th>
                        </tr>
                    </thead>
                    <tbody>
                        {forecasts.map(forecast =>
                            <tr key={forecast.dateFormatted}>
                                <td>{forecast.dateFormatted}</td>
                                <td>{forecast.temperatureC}</td>
                                <td>{forecast.temperatureF}</td>
                                <td>{forecast.summary}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <button className="btn btn-primary" onClick={this.buttonClick}>Refresh</button>
                <p>Number of button clicks: {this.state.buttonClicks}</p>
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderForecastsTable(this.state.forecasts);

        return (
            <div>
                <h1>Weather forecast</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
            </div>
        );
    }
}
