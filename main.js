function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.is_read = false;
}

Book.prototype.toggleStatus = function toggleStatus() {
  this.is_read = !this.is_read;
};

const bookList = [];

function changeStatus(e) {
  const index = e.path[3].getAttribute('data-attribute');
  bookList[index].toggleStatus();
  e.path[0].innerHTML = bookList[index].is_read ? 'Unread' : 'Read';
  e.path[1].children[1].children[2].innerHTML = bookList[index].is_read ? 'Read.' : 'Not read, yet.';
}

function removeBook(e) {
  // arr.splice(index, 1);
  const index = e.path[1].getAttribute('data-attribute');
  bookList.splice(index, 1);
  showBooks(bookList);
}

function assignListeners(toggleButton, removeButton) {
  toggleButton.addEventListener('click', changeStatus);
  removeButton.addEventListener('click', removeBook);
}

function showBooks(arr) {
  const section = document.getElementById('books_container');
  section.innerHTML = '';
  arr.forEach((book, index) => {
    const mainContainer = document.createElement('div');
    mainContainer.classList = 'card';
    mainContainer.style = 'margin-top: 1em';
    mainContainer.setAttribute('data-attribute', index);
    const cardContainer = document.createElement('div');
    const cardContent = document.createElement('div');
    cardContent.classList = 'card-content';
    cardContainer.classList = 'card';
    cardContainer.appendChild(cardContent);
    mainContainer.appendChild(cardContainer);
    const bookTitle = document.createElement('p');
    bookTitle.classList = 'title is-4';
    bookTitle.innerHTML = `${book.title}`;
    cardContent.appendChild(bookTitle);
    const additionalInfo = document.createElement('div');
    additionalInfo.classList = 'content';
    cardContent.appendChild(additionalInfo);
    additionalInfo.innerHTML = `<p>Author: ${book.author}</p><p>Pages: ${book.pages}</p><p>${book.is_read ? 'Read.' : 'Not read, yet.'}</p>`;
    const toggleButton = document.createElement('button');
    toggleButton.innerHTML = book.is_read ? 'Unread' : 'Read';
    toggleButton.classList = 'button';
    // toggleButton.addEventListener('click', changeStatus);
    toggleButton.style = 'margin-right: 1em;';
    cardContent.appendChild(toggleButton);
    const removeButton = document.createElement('button');
    removeButton.innerHTML = 'Remove book';
    removeButton.classList = 'button is-info';
    // removeButton.addEventListener('click', removeBook);
    cardContent.appendChild(removeButton);
    section.appendChild(mainContainer);
    assignListeners(toggleButton, removeButton);
  });
}

function addBook(title, author, pages, arr) {
  const book = new Book(title, author, pages);
  arr.push(book);
  showBooks(arr);
}

function resetValidationMessages() {
  const errors = document.getElementsByClassName('help');
  Array.from(errors).forEach(element => {
    element.style = 'display: none;';
  });
}

function validateInput(title, author, pages) {
  let valid = true;
  resetValidationMessages();
  if (title.length === 0) {
    document.getElementById('title_error_id').style = 'display: block;';
    valid = false;
  }
  if (author.length === 0) {
    document.getElementById('author_error_id').style = 'display: block;';
    valid = false;
  }
  if (!Number.isInteger(parseInt(pages, 10))) {
    document.getElementById('pages_error_id').style = 'display: block;';
    valid = false;
  }

  return valid;
}

document.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = document.getElementById('book_title_id').value;
  const author = document.getElementById('book_author_id').value;
  const pages = document.getElementById('book_pages_id').value;
  if (validateInput(title, author, pages)) {
    addBook(title, author, pages, bookList);
    resetValidationMessages();
    document.getElementById('book_title_id').value = '';
    document.getElementById('book_author_id').value = '';
    document.getElementById('book_pages_id').value = '';
  }
});
