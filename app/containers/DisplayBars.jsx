import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { toggleGoing, addUser } from '../actions/yelp';

// helper function that takes array of userId's and determines if particular userId is present
const determineUserGoing = (addUser, bar, userId) => {
  if (bar.usersGoing.indexOf(userId) > -1) {
    addUser(bar, userId);
  }
};

// TODO: Fix super rough layout
const DisplayBars = ({ bars, userId, toggleGoing, addUser }) => {
  return (
    <div className="row top10">
      <div className="col-xs-12">
        <table className="table table-striped">
          <tbody>
            {bars.map((bar, index) =>
              <tr key={index}>
                <td><img role="presentation" src={bar.image_url} /></td>
                <td>{bar.name}</td>
                <td>
                  {determineUserGoing(addUser, bar, userId)}
                  <button
                    className={bar.userGoing ? 'btn btn-primary' : 'btn btn-default'}
                    type="button"
                    onClick={() => toggleGoing(userId, bar.userGoing, bar.id)}>
                    {`${bar.count} going`}
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

DisplayBars.propTypes = {
  bars: PropTypes.array,
  toggleGoing: PropTypes.func,
  addUser: PropTypes.func,
  userId: PropTypes.string
};

function mapStateToProps(state) {
  return {
    bars: state.bars,
    userId: state.user.userId
  };
}

export default connect(mapStateToProps, {toggleGoing, addUser})(DisplayBars);
