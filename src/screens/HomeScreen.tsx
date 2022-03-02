import { ButtonLocation, MapView, ReactLogo, SearchBar } from '../components';

export const HomeScreen = () => {
  return (
    <div>
      <MapView />
      <ButtonLocation />
      <ReactLogo />
      <SearchBar />
    </div>
  );
};
