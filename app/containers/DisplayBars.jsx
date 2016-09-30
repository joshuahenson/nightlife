import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// TODO: Fix super rough layout
const DisplayBars = ({ bars }) => {
  return (
    <div className="row top10">
      <div className="col-xs-12">
        <table className="table table-striped">
          <tbody>
            {bars.map((bar, index) =>
              <tr key={index}>
                <td><img role="presentation" src={bar.image_url} /></td>
                <td>{bar.name}</td>
                <td>{bar.count}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

DisplayBars.propTypes = {
  bars: PropTypes.array
};

function mapStateToProps(state) {
  return {
    bars: state.bars
  };
}

export default connect(mapStateToProps)(DisplayBars);
