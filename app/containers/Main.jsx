import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { searchLocation } from '../actions/yelp';


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {value: 'seattle'};
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  submit() {
    this.props.searchLocation(this.state.value);
  }
  render() {
    return (
      <div>
        <h4 className="text-center">What area would you like to search?</h4>
        <div className="row">
          <div className="col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1">
            <div className="input-group">
              <label className="sr-only" htmlFor="locationInput">Search for locations</label>
              <input
              type="text" className="form-control" id="locationInput"
              value={this.state.value} onChange={this.handleChange} />
              <span className="input-group-btn">
                <button className="btn btn-primary" type="button" onClick={this.submit}>
                  <span className="glyphicon glyphicon-glass" aria-hidden="true" />&nbsp;&nbsp;Let's Go!
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  searchLocation: PropTypes.func
};

export default connect(null, { searchLocation })(Main);
