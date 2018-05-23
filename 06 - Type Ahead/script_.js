
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

// Put remote data into our app
fetch(endpoint)
          .then( blob => blob.json() )
          // Spread data into array's existing struture
          .then( data =>  cities.push(...data))


// Filter it
function findMatches(word, cities){
  return cities.filter( place => {

    // figure out if the city of state matches search

    // g = global; i = case insensitive
    const regex = new RegExp(word, 'gi'); // regex to match against
    return place.city.match(regex) || place.state.match(regex)
  })
}

// Treat pop with commas
const numberWithCommas = (x) => {
 return  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const results = document.querySelector('.suggestions');


function displayMatches() {  
  const matchArray = findMatches(this.value, cities);
  console.log(matchArray)
  console.log(matchArray.length);
  if ( matchArray.length ) { 
    const html = matchArray.map((place) => {
        const regX = new RegExp(this.value, 'gi');
        const cityName = place.city.replace(regX, `<span class="hl">${this.value}</span>`);
        const stateName = place.state.replace(regX, `<span class="hl">${this.value}</span>`);
        const population = numberWithCommas(place.population); 
          return `<li>
                    <span class="name">${cityName}, ${stateName}</span>
                    <span class="population">${population}</span>
                  </li>`;
      }).join('')
  } else {
    const html = 'no results'
  };

  // join turns the array into a string
  results.innerHTML = html
}

const input = document.querySelector('.search');
input.addEventListener('change', displayMatches);
input.addEventListener('keyup', displayMatches);


