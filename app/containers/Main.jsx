import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { searchLocation } from '../actions/yelp';
import DisplayBars from './DisplayBars';


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
    const { searchLocation, userId } = this.props;
    console.log(userId);
    searchLocation(this.state.value, userId);
  }
  render() {
    const {searching} = this.props;
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
                <button className="btn btn-primary" type="button" onClick={this.submit} disabled={searching}>
                  {searching ? <i className="fa fa-circle-o-notch fa-spin" /> : <i className="fa fa-glass" aria-hidden="true" />} &nbsp;&nbsp;Let's Go!
                </button>
              </span>
            </div>
          </div>
        </div>
        <DisplayBars />
      </div>
    );
  }
}

Main.propTypes = {
  searchLocation: PropTypes.func,
  userId: PropTypes.string,
  searching: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    userId: state.user.userId,
    searching: state.searching
  };
}
export default connect(mapStateToProps, { searchLocation })(Main);
