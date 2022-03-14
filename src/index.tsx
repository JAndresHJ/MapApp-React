import React from 'react';
import ReactDOM from 'react-dom';
import { MapsApp } from './MapsApp';
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

mapboxgl.accessToken = 'pk.eyJ1IjoiamFuZHJlc2hqIiwiYSI6ImNsMDl3cXFxNDAyd3EzY3Bvbmh2cGZ1ZGwifQ.HqJzIMOXcV6YrsxBH7DITw';

if(!navigator.geolocation) {
  alert('Your browser does not have the geolocation enabled');
  throw new Error('Your browser does not have the geolocation enabled');
}

ReactDOM.render(
  <React.StrictMode>
    <MapsApp />
  </React.StrictMode>,
  document.getElementById('root')
);

