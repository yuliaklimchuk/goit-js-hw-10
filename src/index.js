import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './js/fetchCountries';
import createCountriesListTmp from './template/createCountriesList.hbs';
import createCountryCardTmp from './template/createCountryCardTmp.hbs';
const DEBOUNCE_DELAY = 300;
const inputCountry = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputCountry.addEventListener('input', debounce(entryCountryName, DEBOUNCE_DELAY));

function entryCountryName() {
    const countryName = inputCountry.value.trim();
    if (countryName) {
        fetchCountries(countryName)
            .then(renderCountryesList)       
            .catch(onFetchError)
    }
}

function renderCountryesList(countries)
{
    if (countries.length > 10) { 
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        return;
    }
    if (countries.length >= 2 && countries.length <= 10) {
        countryList.insertAdjacentHTML('beforeend', createCountriesListTmp(countries));
    }
    if (countries.length === 1) { 
        countryInfo.innerHTML = createCountryCardTmp(countries);
        countryList.innerHTML = '';
    }
}

function onFetchError() { 
    Notiflix.Notify.failure('Oops, there is no country with that name');
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
}