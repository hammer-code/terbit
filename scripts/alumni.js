const API_ENDPOINT_URL = 'https://sunrise-server.herokuapp.com';

let requestedPage = 1;
let requestedLimit = 6;
let requesting = false;
let hasNextPage = false;

const loader = document.querySelector('#loader');
const nextButton = document.querySelector('#next-button');

nextButton.addEventListener('click', function (event) {
  requestedPage = requestedPage + 1;

  getAlumnusAndInsertIntoHtml();
});

function getAlumnusAndInsertIntoHtml () {
  requesting = true;
  updateNextButtonAndLoaderVisibility();

  getAlumnus()
    .then(chunkAlumnus)
    .then(mapAlumnusIntoHtml)
    .then(insertAlumnusHtmlIntoDocument)
    .then(() => {
      requesting = false;
      updateNextButtonAndLoaderVisibility();
    });
}

function getAlumnus () {
  return fetch(`${API_ENDPOINT_URL}/alumnus?page=${requestedPage}`)
    .then(res => res.json())
    .then((res) => {
      hasNextPage = !!res.nextPage;

      return res;
    })
    .then(res => res.result);
}

function chunkAlumnus (alumnus) {
  const chunkIntoThree = makeChunk(3);

  return chunkIntoThree(alumnus);
}

function makeChunk (chunkCount) {
  return function (array) {
    const chunk = chunkCount;
    const result = [];

    for (let i=0; i < array.length; i += chunk) {
      result.push(array.slice(i, i + chunk));
    }

    return result;
  }
}

function mapAlumnusIntoHtml (alumnus) {
  return alumnus.map(createPeopleWrapperHtmlString).join('');
}

function createPeopleWrapperHtmlString (people) {
  const personCardsHtml = people.map(createPersonCardHtmlString).join('');

  return `
    <div class="people-wrapper">
      ${personCardsHtml}
    </div>
  `;
}

function createPersonCardHtmlString (person) {
  return `
    <div class="person-card">
      <img src="${person.photo}" class="person-card__photo" alt="">
      <h3 class="person-card__title">${person.name}</h3>
      <p>${person.excerpt}</p>
    </div>
  `;
}

function insertAlumnusHtmlIntoDocument (html) {
  const el = document.querySelector('#alumni .container .alumnus-wrapper');

  el.innerHTML = el.innerHTML + html;
}

function updateNextButtonAndLoaderVisibility () {
  if (requesting || !hasNextPage) {
    hideNextButton();
  } else {
    showNextButton();
  }

  if (requesting) {
    showLoader();
  } else {
    hideLoader();
  }
}

function hideNextButton () {
  nextButton.style = 'display: none';
}

function showNextButton () {
  nextButton.style = 'display: inline-block';
}

function hideLoader () {
  loader.style = 'display: none';
}

function showLoader () {
  loader.style = 'display: inline-block';
}

// get alumnus from server, and insert into document
getAlumnusAndInsertIntoHtml();
