import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css"

import './css/styles.css';
import axios from 'axios';
// import { fetchCountries } from '../src/FindCountry';

const API_KEY = '32602005-90d975b9811b1acb6e8234db3';

const inputField = document.querySelector('input');
const inputButton = document.querySelector('button');
const galleryImage = document.querySelector('.gallery');

inputButton.addEventListener('click', e => {
  e.preventDefault();
  getCards({
    value: inputField.value,
  });
});

function getCards({ value }) {
  const urlAPI = `https://pixabay.com/api/?key=${API_KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true`;
if(value.length !== 0) {
  return (
    axios
      .get(urlAPI)
      .then(res => res.data)
      .then(({ hits }) => {
        render(hits);
      })

      .catch(function (error) {
          // handle error
           })
  )};
}

function render(hits) {
  galleryImage.innerHTML = '';
   if(hits.length === 0)
        // handle error
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');

 const hitsElements = hits.map(({
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  }) => {
return `
<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
</div>`
  });

  galleryImage.insertAdjacentHTML('beforeend', hitsElements.join(''));
}
























// const delay = 300;
// const timeOut = 5000;

// const ref = {
//   inputField: document.querySelector('#search-box'),
//   countryList: document.querySelector('.country-list'),
//   countryInfo: document.querySelector('.country-info'),
// };

// ref.inputField.addEventListener('input', debounce(searchCountry, delay));

// function searchCountry(e) {
//   const valueInput = e.target.value.trim();

//   if (valueInput.length === 0) {
//     Notiflix.Notify.warning('Remember the countries you studied at school!', {
//       timeout: timeOut,
//     });
//     return;
//   } else if (valueInput.length === 1) {
//     Notiflix.Notify.info('Too few letters, write more :)', {
//       timeout: timeOut,
//     });

//     ref.countryList.innerHTML = '';
//     ref.countryInfo.innerHTML = '';
//     ref.inputField.removeEventListener('input', e);

//     return;
//   }

//   fetchCountries(valueInput)
//     .then(chooseCountry)
//     .catch(error => {
//       Notiflix.Notify.failure('Oops, there is no country with that name', {
//         timeout: timeOut,
//       });
//       ref.countryList.innerHTML = '';
//       ref.countryInfo.innerHTML = '';
//     });
// }

// function chooseCountry(countries) {
//   const findCountriesNumber = countries.length;

//   const findCountriesGrid = countries
//     .map(
//       ({ name: { official }, flags: { svg } }) =>
//         `<li class="country"><img src="${svg}" alt="Flag of ${official}" />
//       <h1>${official}</h1></li>`
//     )
//     .join('');
//   ref.countryList.innerHTML = findCountriesGrid;

//   if (findCountriesNumber === 1) {
//     const bigRenderCountry = document.querySelector('.country');
//     bigRenderCountry.classList.add('big');

//     const findCountryInfo = countries
//       .map(
//         ({ capital, population, languages }) =>
//           `<p><img width="18px" src="https://cdn-icons-png.flaticon.com/128/2072/2072130.png"/><b>Capital: </b>${capital}</p>
//          <p><img width="18px" src="https://cdn-icons-png.flaticon.com/512/4596/4596328.png"/><b>Population: </b>${population}</p>
//          <p><img width="18px" src="https://cdn-icons-png.flaticon.com/512/7955/7955519.png"/><b>Languages: </b>${Object.values(
//            languages
//          )}</p>`
//       )
//       .join('');
//     ref.countryInfo.innerHTML = findCountryInfo;
//     return;
//   }

//   if (findCountriesNumber > 10) {
//     Notiflix.Notify.warning(
//       'Too many matches found. Please enter a more specific name.',
//       {
//         timeout: timeOut,
//       }
//     );
//   }

//   ref.countryInfo.innerHTML = '';
// }
