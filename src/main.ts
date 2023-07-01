import './style.css';
import { createCityCardHtml, createCityHtml } from './templates';
import { getCities, getCity } from './api';

const $ = <T extends Element>(
  q: string,
  parentElement: HTMLElement | Document = document
) => parentElement.querySelector<T>(q);

const $All = <T extends Element>(
  q: string,
  parentElement: HTMLElement | Document = document
) => parentElement.querySelectorAll<T>(q);

const search = $<HTMLInputElement>('#search');
const searchButton = $<HTMLButtonElement>('#searchButton');
const searchResultsContainer = $<HTMLElement>('#searchResultsContainer');

function loading(isLoading: boolean) {
  if (!searchResultsContainer) return;

  searchResultsContainer.innerHTML = isLoading ? 'Loading...' : '';
}

searchButton?.addEventListener('click', onSubmit);
search?.addEventListener('keydown', (event) => {
  if (event.code === 'Enter') {
    onSubmit();
  }
});

async function onSubmit() {
  if (!searchResultsContainer) return;

  const searchValue = search?.value ?? '';

  if (!searchValue) {
    alert('Enter your city');
    return;
  }

  try {
    loading(true);

    const cities = await getCities(searchValue);

    loading(false);

    if (!cities.length) {
      searchResultsContainer.innerHTML = 'Not found';
      return;
    }

    searchResultsContainer.innerHTML = `
        <h2 class="text-lg mb-2 font-bold">Choose a city:</h2>
        ${cities.map(createCityHtml).join(' ')}
      `;

    const cityItems = $All<HTMLElement>('.cityItem', searchResultsContainer);

    for (let cityItem of cityItems) {
      cityItem.addEventListener('click', onCityItemClick);
    }
  } catch (error) {
    loading(false);

    searchResultsContainer.innerHTML = (error as Error).message;
  }
}

async function onCityItemClick(event: Event) {
  if (!searchResultsContainer) return;
  if (!event.target) return;

  const cityUrl = (event.target as HTMLElement).dataset.url;

  if (!cityUrl) return;

  try {
    loading(true);

    const city = await getCity(cityUrl);

    loading(false);

    searchResultsContainer.innerHTML = createCityCardHtml(city);
  } catch (error) {
    loading(false);

    searchResultsContainer.innerHTML = (error as Error).message;
  }
}
