import L from 'leaflet';

export default function getMap(map, longitude, latitude) {
  let myMap = map;
  myMap = L.map('map').setView([latitude, longitude], 18);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(myMap);
  L.marker([latitude, longitude]).addTo(myMap);
}
