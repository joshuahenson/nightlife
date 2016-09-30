import Yelp from 'yelp';
import {yelpSecret} from '../../../config/secrets';
import YelpS from '../models/yelp';

function findCount(business) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let count = 0;
  YelpS.findOne({created_on: {$gte: today}, yelpId: business.id}, (err, doc) => {
      if (err) {
        console.log(err);
      }
      if (doc) {
        count = doc.count;
      }
    });
  return count;
}

export function searchBars(req, res) {
  const yelp = new Yelp(yelpSecret);
  const location = req.query.location;
  yelp.search({ category_filter: 'bars', location })
  .then((data) => {
    const newData = data.businesses.map((business) => {
        return {
          name: business.name,
          image_url: business.image_url,
          id: business.id,
          count: findCount(business)
        };
      }
    );
    res.json(newData);
  })
  .catch((err) => {
    res.status(500).send(err);
    console.error(err);
  });
}

export default {
  searchBars
};
