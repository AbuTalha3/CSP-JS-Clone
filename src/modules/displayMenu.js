const apiUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

const displayMenu = async () => {
  const displayTable = document.querySelector('.section-1');
  displayTable.innerHTML = '';

  try {
    const response = await fetch(`${apiUrl}`);
    const data = await response.json();
    data.meals.forEach((meal) => {
      const mealData = document.createElement('div');
      mealData.classList.add('sub-menu');
      mealData.innerHTML = `
        <img src=${meal.strMealThumb} alt='dish image' class='meal-image'>
        <div class='meal-div-1'>
        <p class='meal-name'>${meal.strMeal}</p>
        <div class='sub-div-1'>
        <i class="fa-thin fa-heart icon-1"></i>        
        <p class='like-score'>6 likes</p>
        </div>
        </div>
        <div class='buttons'>
        <button class='comment-btn'>Comment</button>
        </div>
      `;

      displayTable.appendChild(mealData);
    });
  } catch (error) {
    console.error('Error fetching dish: ', error);
  }
};

export default displayMenu;