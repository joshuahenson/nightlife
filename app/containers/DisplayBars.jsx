import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { userIsGoing, userNotGoing } from '../actions/yelp';

// TODO: CHECK IF AUTH FIRST
const toggleGoing = (userId, userGoing, barId, userIsGoing, userNotGoing) => {
  if (userGoing) {
    userNotGoing(barId, userId);
  } else {
    userIsGoing(barId, userId);
  }
};

const DisplayBars = ({ bars, userId, userIsGoing, userNotGoing }) => {
  return (
    <div className="row top10">
      <div className="col-md-10 col-md-offset-1 col-lg-8 col-lg-offset-2">
        <table className="table table-striped table-responsive">
          <tbody>
            {bars.map((bar, index) =>
              <tr key={index}>
                <td><img role="presentation" src={bar.image_url} /></td>
                <td>{bar.name}</td>
                <td className="text-right">
                  <button
                    className={bar.userGoing ? 'btn btn-primary' : 'btn btn-default'}
                    type="button"
                    onClick={() => toggleGoing(userId, bar.userGoing, bar.id, userIsGoing, userNotGoing)}>
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
  userIsGoing: PropTypes.func,
  userNotGoing: PropTypes.func,
  userId: PropTypes.string
};

function mapStateToProps(state) {
  return {
    bars: state.bars,
    userId: state.user.userId
  };
}

export default connect(mapStateToProps, {userIsGoing, userNotGoing})(DisplayBars);
