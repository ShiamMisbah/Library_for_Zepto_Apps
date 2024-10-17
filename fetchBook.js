// Extract book ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const bookId = urlParams.get("id");

// Fetch book details
const fetchBookDetails = async () => {
  try {
    const response = await fetch(`https://gutendex.com/books/${bookId}`);
    const book = await response.json();
    displayBookDetails(book);
  } catch (error) {
    console.error("Error fetching book details:", error);
  }
};

// Display book details on the page
const displayBookDetails = (book) => {
  const bookDetailsDiv = document.getElementById("bookDetails");
  const bookDetailsHTML = `
    <img src="${book.formats["image/jpeg"]}" alt="${
    book.title
  }" class="book-cover"/>
    <h3>${book.title}</h3>
    <p>Author: ${book.authors.map((author) => author.name).join(", ")}</p>
    <p>Published: ${book.download_count}</p>
    <p>Language: ${book.languages.join(", ")}</p>
    <p>Subjects: ${book.subjects.join(", ")}</p>
    <p>Book ID: ${book.id}</p>
    <button onclick="toggleWishlist(event, ${book.id})" class="wishlistBtn" data-id="${book.id}">
      <i class="${isWishlisted(book.id) ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
    </button>
  `;
  bookDetailsDiv.innerHTML = bookDetailsHTML;
};

// Load book details on page load
window.onload = fetchBookDetails;

