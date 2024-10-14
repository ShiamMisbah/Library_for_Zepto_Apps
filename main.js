var sidebarStatus = false;

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
    console.log(data);
  } catch (error) {
    console.error("Error fetching books:", error);
    document.getElementById("error-message").textContent =
      "Failed to fetch books. Please try again later.";
  }
};

// Display books in HTML
const displayBooks = (books) => {
    
    library.innerHTML = ''; // Clear previous books
    books.forEach(book => {
        const bookCard = `
        <div class="bookCard">
            <img src="${book.formats['image/jpeg']}" alt="${book.title}" class="book-cover" />
            <h5>${book.title}</h5>
            <p>Author: ${book.authors.map(author => author.name).join(', ')}</p>
            <p>Genre: ${book.subjects.length ? book.subjects[0] : 'N/A'}</p>
            <button onclick="toggleWishlist(${book.id})" class="wishlist-btn" data-id="${book.id}">
            <i class="fa ${isWishlisted(book.id) ? 'fa-heart' : 'fa-heart-o'}"></i>
            </button>
        </div>
        `;
        library.innerHTML += bookCard;
    });
};

const isWishlisted = (bookId) => {
//   const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
//   return wishlist.includes(bookId);
    return true
};

closeButton.addEventListener("click", () => {
    sidebarStatus = !sidebarStatus
    console.log('clicked');
    if (sidebarStatus){
        sidebar.style.width = "150px";
        closeButton.className = "fa-regular fa-circle-xmark"; // Modify class if needed
    }
    else {
        sidebar.style.width = "50px";
        closeButton.className = "fa-solid fa-angles-right";

    }

    const iconText = document.querySelectorAll(".iconGroupText");
    iconText.forEach((text) => {
        text.style.display = sidebarStatus ? "inline" : "none";
    });
    
})
