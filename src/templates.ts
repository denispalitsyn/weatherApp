import { City, CityInfo } from './types';

export const createCityHtml = (city: City) =>
  `<div class="cityItem cursor-pointer hover:opacity-70" data-url=${city.url}>
    ${city.name}, ${city.country}
  </div>`;

export const createCityCardHtml = (city: CityInfo) =>
  `<div class="rounded-lg shadow-xl w-64 min-w-max">
    <div class="flex flex-col items-start sm:flex-row sm:items-center px-2 sm:pr-4 mb-2">
      <img 
        class="self-center"
        width="64"
        height="64"
        src=${city.current.condition.icon}
        alt=${city.current.condition.text}
      />
      <div class="ml-0 sm:ml-2">
        <div class="text-md mr-2">${city.current.temp_c}°C</div>
        <h2 class="text-md">${city.location.name}, ${city.location.country}</h2>
      </div>
    </div>
    <div class="flex flex-col gap-2 px-2 sm:px-4 pb-2 text-sm">
      <div>Feels like: ${city.current.feelslike_c}°C</div>
      <div>Humidity: ${city.current.humidity}%</div>
      <div>Windy: ${city.current.wind_kph} km/h ${city.current.wind_dir}</div>
      <div>UV: ${city.current.uv}</div>
    </div>
  </div>`;
