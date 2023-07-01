import { API_KEY, WEATHER_API } from './constants';
import { City, CityInfo } from './types';

async function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

export async function getCities(searchValue: string): Promise<City[]> {
  const url = `${WEATHER_API}/search.json?key=${API_KEY}&q=${searchValue}`;

  const response = await fetch(url, {
    method: 'GET',
  });

  await sleep(1000);

  return response.json();
}

export async function getCity(cityUrl: string): Promise<CityInfo> {
  const url = `${WEATHER_API}/current.json?key=${API_KEY}&q=${cityUrl}&aqi=yes`;

  const response = await fetch(url, {
    method: 'GET',
  });

  await sleep(1000);

  return response.json();
}
