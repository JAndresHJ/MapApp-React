import { useContext, useEffect, useReducer } from 'react';
import { Map, Marker, Popup } from 'mapbox-gl';
import { MapContext } from './MapContext';
import { mapReducer } from './mapReducer';
import { PlacesContext } from '..';

export interface MapState {
  isMapReady: boolean;
  map?: Map;
  markers: Marker[];
}

const INITIAL_STATE: MapState = {
  isMapReady: false,
  map: undefined,
  markers: [],
};

interface MapProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const MapProvider = ({ children }: MapProviderProps) => {
  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);
  const { places } = useContext(PlacesContext);

  useEffect(() => {
    state.markers.forEach((marker) => marker.remove());
    const newMarkers: Marker[] = [];

    for (const place of places) {
      const [ lng, lat ] = place.center;

      const popup = new Popup().setHTML(`
        <h6>${place.text_en}</h6>
        <p>${place.place_name_en}</p>
      `);

      const newMarker = new Marker()
        .setPopup(popup)
        .setLngLat([ lng, lat ])
        .addTo(state.map!);

      newMarkers.push(newMarker);
    }

    dispatch({ type: 'setMarkers', payload: newMarkers })

    // Todo: clean polyline
  }, [places]);

  const myLocationPopup = new Popup().setHTML(`
    <h4>Here I'm</h4>
    <p>Somewhere in the world</p>
  `);

  const setMap = (map: Map) => {
    new Marker()
      .setLngLat(map.getCenter())
      .addTo(map)
      .setPopup(myLocationPopup);
    dispatch({ type: 'setMap', payload: map });
  };

  return (
    <MapContext.Provider
      value={{
        ...state,
        setMap,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
