import React from 'react';
import { Observable } from 'rxjs';
import { render } from 'react-dom';
import countryList from 'country-list';

import model from './model';

const COUNTRIES = countryList().getNames();

class App extends React.PureComponent {

  constructor() {
    super();

    this.state = {};
  }

  componentDidMount() {
    if (this.textInput) {
      const query$ = Observable
        .fromEvent(this.textInput, 'keyup')
        .debounceTime(300)
        .map(e => e.target.value);

      this.state$ = model(
        query$,
        COUNTRIES,
      );

      this.state$.subscribe(this.setState.bind(this));
    }
  }

  componentWillUnmount() {
    if (this.state$) {
      this.state$.unsubscribe();
    }
  }

  render() {
    const { countries = [] } = this.state;

    return (
      <div>
        <h1>Countries of the World</h1>
        <input
          ref={(input) => { this.textInput = input; }}
          placeholder="Find a country"
        />
        <ul>
          {countries.map(country => <li key={country}>{country}</li>)}
        </ul>
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));
