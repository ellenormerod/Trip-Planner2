const mapboxgl = require("mapbox-gl");
const buildMarker = require("./marker.js");

mapboxgl.accessToken = "pk.eyJ1IjoiemFjaGFyeWR1ZGxleSIsImEiOiJjajhkNWt6dncwbDZoMzNwNzYxaGdxMmtiIn0.x_NgOhqEwuRAakcm1knjBQ";

// const fullstackCoords = [-74.009, 40.705] // NY
const fullstackCoords = [-87.6320523, 41.8881084] // CHI

const hotelDomEl = document.getElementById('hotels-choices');
const restaurantDomEl = document.getElementById('restaurants-choices');
const activitiesDomEl = document.getElementById('activities-choices');

const arrayHotels = [];
const arrayRestaurants = [];
const arrayActivities = [];

fetch('/api')
  .then(result => result.json())
  .then(data => {
    data.hotels.forEach(eachHotel => {
      arrayHotels.push(eachHotel);
      var option = document.createElement('option');
      option.append(eachHotel.name);
      hotelDomEl.append(option);
    })
  });

fetch('/api')
  .then(result => result.json())
  .then(data => {
    data.restaurants.forEach(eachRestaurant => {
      arrayRestaurants.push(eachRestaurant);
      var option = document.createElement('option');
      option.append(eachRestaurant.name);
      restaurantDomEl.append(option);
    })
  });

fetch('/api')
  .then(result => result.json())
  .then(data => {
    data.activities.forEach(eachActivity => {
      arrayActivities.push(eachActivity);
      var option = document.createElement('option');
      option.append(eachActivity.name);
      activitiesDomEl.append(option);
    })
  });

const map = new mapboxgl.Map({
  container: "map",
  center: fullstackCoords, // FullStack coordinates
  zoom: 12, // starting zoom
  style: "mapbox://styles/mapbox/streets-v10" // mapbox has lots of different map styles available.
});

const marker = buildMarker("activities", fullstackCoords);
marker.addTo(map);

const addButton = document.getElementsByClassName('options-btn');
const buttonsArray = Array.prototype.slice.call(addButton);
const itineraryHotelList = document.getElementById('hotels-list');
const itineraryRestaurantList = document.getElementById('restaurants-list');
const itineraryActivitiesList = document.getElementById('activities-list');

let selectedId;

buttonsArray.forEach(eachButton => {
  eachButton.addEventListener('click', () => {
    let selectedHotel = document.getElementById('hotels-choices');
    let selectedRestaurant = document.getElementById('restaurants-choices');
    let selectedActivity = document.getElementById('activities-choices');

    if (eachButton.id === 'hotels-add') {
      selectedId = selectedHotel.value;
      let itineraryItem = document.createElement('li');
      let itineraryX = document.createElement('button');
      itineraryItem.append(selectedId);
      itineraryHotelList.append(itineraryItem);

      arrayHotels.forEach(oneHotel => {
        if (oneHotel.name === selectedId) {
          buildMarker('hotels', oneHotel.place.location).addTo(map);
        }
      })
    } else if (eachButton.id === 'restaurants-add') {
      selectedId = selectedRestaurant.value;
      let itineraryItem = document.createElement('li');
      let itineraryX = document.createElement('button');
      itineraryItem.append(selectedId);
      itineraryRestaurantList.append(itineraryItem);

      arrayRestaurants.forEach(oneRestaurant => {
        if (oneRestaurant.name === selectedId) {
          buildMarker('restaurants', oneRestaurant.place.location).addTo(map);
        }
      })
    } else if (eachButton.id === 'activities-add') {
      selectedId = selectedActivity.value;
      let itineraryItem = document.createElement('li');
      let itineraryX = document.createElement('button');
      itineraryItem.append(selectedId);
      itineraryItem.append(itineraryX);
      itineraryActivitiesList.append(itineraryItem);

      arrayActivities.forEach(oneActivity => {
        if (oneActivity.name === selectedId) {
          buildMarker('activities', oneActivity.place.location).addTo(map);
        }
      })
    }
  })
})
