// Import any required URLs or helper functions
const selectedApiUrl = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const involvementApiUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/';

// Function to show the popup with meal details and comments
const showPopup = async (mealId) => {
  try {
    // Fetch meal details from the selected API using the mealId
    const response = await fetch(`${selectedApiUrl}${mealId}`);
    const data = await response.json();
    const meal = data.meals[0];

    // Fetch comments from the Involvement API for the specific mealId
    const commentsResponse = await fetch(`${involvementApiUrl}/comments/${mealId}`);
    const commentsData = await commentsResponse.json();
    const comments = commentsData.comments;

    // Create and display the popup content
    const popupContent = document.createElement('div');
    popupContent.classList.add('popup-content');
    popupContent.innerHTML = `
      <img src=${meal.strMealThumb} alt='dish image' class='meal-image'>
      <h2>${meal.strMeal}</h2>
      <p>Category: ${meal.strCategory}</p>
      <p>Area: ${meal.strArea}</p>
      <h3>Comments:</h3>
      <ul class="comments-list">
        ${comments.map(comment => `<li>${comment.text}</li>`).join('')}
      </ul>
      <form id="comment-form">
        <label for="comment-input">Add your comment:</label>
        <input type="text" id="comment-input" required>
        <button type="submit">Submit</button>
      </form>
    `;

    // Append the popup content to the body
    document.body.appendChild(popupContent);

    // Handle form submission to add new comments
    const commentForm = document.getElementById('comment-form');
    commentForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const commentInput = document.getElementById('comment-input').value;
      // Send the comment to the Involvement API
      await fetch(`${involvementApiUrl}/comments/${mealId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: commentInput }),
      });
      // Refresh the popup to display the new comment
      document.body.removeChild(popupContent);
      showPopup(mealId);
    });
  } catch (error) {
    console.error('Error fetching data: ', error);
  }
};

// Function to handle the "Comment" button click
const handleCommentButtonClick = (mealId) => {
  showPopup(mealId);
};

// Add event listeners to all "Comment" buttons
document.addEventListener('DOMContentLoaded', () => {
  const commentButtons = document.querySelectorAll('.comment-btn');
  commentButtons.forEach((button, index) => {
    button.addEventListener('click', () => handleCommentButtonClick(index + 1));
  });
});
