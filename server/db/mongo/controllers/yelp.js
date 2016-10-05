import Yelp from 'yelp';
import {yelpSecret} from '../../../config/secrets';
import YelpS from '../models/yelp';

export function searchBars(req, res) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yelp = new Yelp(yelpSecret);
  const location = req.query.location;
  const userId = req.query.userId;
  yelp.search({ category_filter: 'bars', location })
  .then((yelpResults) => yelpResults.businesses)
  .then(yelpResults => {
    return YelpS.find({date: {$gte: today}}).exec()
      .then(dbResults => {
        const bars = yelpResults.map(bar => {
          const matchingBar = dbResults.find(y => y.yelpId === bar.id);
          if (matchingBar) {
            return {
              name: bar.name,
              image_url: bar.image_url,
              id: bar.id,
              userGoing: matchingBar.usersGoing.indexOf(userId) > -1,
              count: matchingBar.count
            };
          } // else
          return {
            name: bar.name,
            image_url: bar.image_url,
            id: bar.id,
            userGoing: false,
            count: 0
          };
        });
        return bars;
      });
  })
  .then(results => res.json(results));
}

export function addUser(req, res) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const locationId = req.body.locationId;
  const userId = req.body.userId;
  YelpS.findOneAndUpdate(
    {created_on: {$gte: today}, yelpId: locationId},
    {$push: {usersGoing: userId}, $inc: {count: 1}},
    {upsert: true, setDefaultsOnInsert: true},
    (err) => {
      if (err) {
        console.error(err);
        res.status(500).end();
      }
      res.status(200).end();
  });
}

export default {
  searchBars,
  addUser
};
