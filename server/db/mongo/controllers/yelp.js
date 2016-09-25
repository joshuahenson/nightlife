// import YelpS from '../models/yelp';
import Yelp from 'yelp';
import {yelpSecret} from '../../../config/secrets';

const yelp = new Yelp(yelpSecret);

export function searchBars(req, res) { // eslint-disable-line
  console.log('req.query', req.query);
  const location = req.query.location;
  yelp.search({ category_filter: 'bars', location })
  .then((data) => {
    res.json(data);
  })
  .catch((err) => {
    res.status(500).send(err);
    console.error(err);
  });
}

export default {
  searchBars
};
