import { Location } from '../types';

const EARTH_RADIUS = 6371000;
const DEG_TO_RAD = Math.PI / 180.0;
const PI_3 = Math.PI * 3;
const PI_2 = Math.PI * 2;

export function generateFakeLatLng(
  initialLocation: Location,
  distance: number
): Location {
  const { latitude, longitude } = initialLocation;
  const distanceInMeters = distance * 1000;
  const latitudeInRadians = latitude * DEG_TO_RAD;
  const longitudeInRadians = longitude * DEG_TO_RAD;
  const sinLat = Math.sin(latitudeInRadians);
  const cosLat = Math.cos(latitudeInRadians);

  const direction = Math.random() * PI_2;
  const theta = distanceInMeters / EARTH_RADIUS;
  const sinDirection = Math.sin(direction);
  const cosDirection = Math.cos(direction);
  const sinTheta = Math.sin(theta);
  const cosTheta = Math.cos(theta);

  const randomLatitude = Math.asin(
    sinLat * cosTheta + cosLat * sinTheta * cosDirection
  );
  let randomLongitude =
    longitudeInRadians +
    Math.atan2(
      sinDirection * sinTheta * cosLat,
      cosTheta - sinLat * Math.sin(randomLatitude)
    );
  randomLongitude = ((randomLongitude + PI_3) % PI_2) - Math.PI;

  return {
    latitude: randomLatitude / DEG_TO_RAD,
    longitude: randomLongitude / DEG_TO_RAD
  };
}
