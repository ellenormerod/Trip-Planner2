const Sequelize = require('Sequelize');
const db = new Sequelize('postgres://localhost:5432/trip-planner', {logging: false});


let Place = db.define('place', {
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phone: {
    type: Sequelize.STRING,
  },
  location: {
    type: Sequelize.ARRAY(Sequelize.FLOAT),
  }
})

let Hotel = db.define('hotel', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  num_stars: {
    type: Sequelize.FLOAT(1, 5),
  },
  amenities: {
    type: Sequelize.STRING,
  }
})

let Activity = db.define('activity', {
  name: {
    type: Sequelize.STRING,
  },
  age_range: {
    type: Sequelize.STRING,
  }
})

let Restaurant = db.define('restaurant', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cuisine: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.INTEGER(1, 5),
  }
})

Hotel.belongsTo(Place);
Activity.belongsTo(Place);
Restaurant.belongsTo(Place);

module.exports = {
  db,
  Place,
  Hotel,
  Activity,
  Restaurant
}
