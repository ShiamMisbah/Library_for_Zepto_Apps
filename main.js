var sidebarStatus = false;
var genreList = []

window.onload = () => {
    
  fetchBooks();
};


const fetchBooks = async (page = 1) => {
  try {
    const response = await fetch(`https://gutendex.com/books?page=${page}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    displayBooks(data.results);
    setupPagination(data.results, page);
    console.log(data);
  } catch (error) {
    console.error("Error fetching books:", error);
    document.getElementById("error-message").textContent =
      "Failed to fetch books. Please try again later.";
  }
};

const displayBooks = (books) => {
    
  library.innerHTML = '';
  books.forEach(book => {
      const genres = book.bookshelves;
      const filteredCategories = genres
        .filter((category) => category.startsWith("Browsing:"))
        .map((category) => category.replace("Browsing: ", ""))
      createGenreList(filteredCategories);
      const bookCard = `
      <div class="bookCard">
          <img src="${book.formats['image/jpeg']}" alt="${book.title}" class="book-cover" />
          <h5>${book.title}</h5>
          <p>Author: ${book.authors.map(author => author.name).join(', ')}</p>
          <p class="genre">Genre: ${filteredCategories.length ? filteredCategories.join(', ') : 'N/A'}</p>
          <button onclick="toggleWishlist(${book.id})" class="wishlist-btn" data-id="${book.id}">
          <i class="fa ${isWishlisted(book.id) ? 'fa-heart' : 'fa-heart-o'}"></i>
          </button>
      </div>
      `;
      library.innerHTML += bookCard;
  });

  console.log(bookGenre);
  genreList.forEach(genre => {
    bookGenre.innerHTML += `<option value="${genre}">${genre}</option>`;
  })
  
    
};

const createGenreList = (filteredCategories) => {
  const uniqueGenres = new Set([...genreList, ...filteredCategories]);
  genreList.length = 0
  genreList.push(...uniqueGenres);
};

// Setup pagination buttons dynamically based on total pages
const setupPagination = (data, page) => {
  const paginationControls = document.getElementById('pagination-controls');
  paginationControls.innerHTML = ''

  // const totalPages = Math.ceil(data.length / booksPerPage)

  // Create Previous button
  if (page > 1) {
    const prevButton = document.createElement('button');
    prevButton.innerText = 'Previous';
    prevButton.onclick = () => fetchBooks(page - 1)
    paginationControls.appendChild(prevButton);
  }

  // // Create page number buttons
  // for (let i = 1; i <= totalPages; i++) {
  //   const pageButton = document.createElement('button');
  //   pageButton.innerText = i;
    
  //   pageButton.classList.toggle("active", i === page);
  //   pageButton.onclick = () => fetchBooks(i); // Fetch books for selected page
  //   paginationControls.appendChild(pageButton);
  // }

  // Create Next button
  if (page) {
    const nextButton = document.createElement("button");
    nextButton.innerText = "Next";
    nextButton.onclick = () => fetchBooks(page + 1); // Go to next page
    paginationControls.appendChild(nextButton);
  }
};

const isWishlisted = (bookId) => {
    return true
};

const filterBooks = () => {
  const query = document.getElementById("search-bar").value.toLowerCase();
  const books = document.querySelectorAll(".bookCard");
  
  books.forEach((book) => {
    const title = book.querySelector("h5").innerText.toLowerCase();
    book.style.display = title.includes(query) ? "block" : "none";
  });
};

function filterBooksByGenre() {
  const query = document.getElementById("bookGenre").value.toLowerCase();
  const books = document.querySelectorAll(".bookCard");
  console.log(query);
  

  books.forEach((book) => {
    const genreTitle = book.querySelector(".genre").innerText.toLowerCase();
    book.style.display = genreTitle.includes(query) ? "block" : "none";
  });
}
