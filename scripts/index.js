const signUpModal = document.querySelector('#sign-up-modal');
const signUpButton = document.querySelector('.sign-up-button');
const modalCloseButton = document.querySelector('.modal .close-button');

let modalShow = false;

function toggleModal () {
  modalShow = !modalShow;
  document.body.classList.toggle('has-modal');
}

signUpButton.addEventListener('click', function (event) {
  toggleModal();
});

modalCloseButton.addEventListener('click', function (event) {
  toggleModal();
});

