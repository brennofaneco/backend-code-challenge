import { City } from '../../types';
import { haversineDistance } from '../../utils';
import * as cityData from '../data/cityData'

export { getAllCities, getCitiesByTag } from '../data/cityData'

export const getCitiesWithinDistance = async (fromGuid: string, distanceKm: number): Promise<City[]> => {
  const fromCity = cityData.getCityByGuid(fromGuid);
  if (!fromCity) return [];

  const cities = cityData.getAllCities()

  return cities.filter((city) => {
    if (city.guid === fromGuid) return false
    const distance = haversineDistance(
      fromCity.latitude,
      fromCity.longitude,
      city.latitude,
      city.longitude
    );
    return distance <= distanceKm;
  });
}


export const getDistanceBetweenCities = (fromGuid: string, toGuid: string): number | null => {
  const fromCity = cityData.getCityByGuid(fromGuid);
  const toCity = cityData.getCityByGuid(toGuid);

  if (!fromCity || !toCity) return null

  const distance = haversineDistance(
    fromCity.latitude,
    fromCity.longitude,
    toCity.latitude,
    toCity.longitude
  );

  return distance;
}