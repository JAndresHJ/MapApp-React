import { useContext, useState } from 'react';
import { LoadingPlaces } from '.';
import { MapContext, PlacesContext } from '../context';
import { Feature } from '../interfaces/places';

export const SearchResults = () => {
  const [activeId, setActiveId] = useState('');
  const { places, isLoadingPlaces } = useContext(PlacesContext);
  const { map } = useContext(MapContext);

  const onPlaceClicked = (place: Feature) => {
    const [lng, lat] = place.center;
    setActiveId(place.id);
    map?.flyTo({
      zoom: 14,
      center: [lng, lat],
    });
  };

  if (isLoadingPlaces) {
    return <LoadingPlaces />;
  }

  if (places.length === 0) {
    return <></>;
  }

  return (
    <ul className='list-group mt-3'>
      {places.map((place) => (
        <li
          key={place.id}
          className={`list-group-item listgroup-item-action ${
            activeId === place.id ? 'active' : ''
          }`}
          onClick={() => onPlaceClicked(place)}
        >
          <h6>{place.text_en}</h6>
          <p
            style={{
              fontSize: '12px',
            }}
          >
            {place.place_name}
          </p>
          <button 
            className={`btn btn-sm ${activeId === place.id ? 'btn-outline-light': 'btn-outline-primary'}`}
          >
            Directions
          </button>
        </li>
      ))}
    </ul>
  );
};