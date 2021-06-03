const fileInput = document.getElementById("myFileInput");
const view_recipe_card = document.getElementsByClassName("view-recipe-card")[0];
const my_recipe_cards = document.getElementsByClassName("my-recipe-cards")[0];

// variable to hold uploaded image data
let uploadedImage = '';

// arrays with local/session storage data
let viewRecipeArray = sessionStorage.getItem('viewRecipe') ? JSON.parse(sessionStorage.getItem('viewRecipe')) : [];
let myRecipesArray = localStorage.getItem('myRecipes') ? JSON.parse(localStorage.getItem('myRecipes')) : [];
let savedRecipesArray = localStorage.getItem('recipes') ? JSON.parse(localStorage.getItem('recipes')) : [];

// create recipe cards ( as needed for each html page )
viewRecipeArray.forEach(viewRecipeCardMaker);
myRecipesArray.forEach(myRecipeCardMaker);

// convert the user uploaded image into a data URL. This will allow us to save it in local storage
if(fileInput){
  fileInput.addEventListener('change', function(){
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      uploadedImage = reader.result;
    });
    reader.readAsDataURL(this.files[0]);
  });
}

// save the data of the recipe you created in the "Add recipe" page ( in local storage )
function publish_recipe(){
  const recipeName = document.getElementById("name");
  const description = document.getElementById("description");
  const ingredients = document.getElementById("ingredients");
  const instructions = document.getElementById("instructions");
  if(recipeName.value != '' && description.value != '' && ingredients.value != '' && instructions.value != ''){
    var recipe_info = {
      'img'  : uploadedImage,
      'name' : recipeName.value,
      'description' : description.value,
      'ingredients' : ingredients.value,
      'instructions' : instructions.value
    }
    myRecipesArray.push(recipe_info);
    localStorage.setItem('myRecipes', JSON.stringify(myRecipesArray));
    document.querySelector('#myFileInput').value = '';
    recipeName.value = '';
    description.value = '';
    ingredients.value = '';
    instructions.value = '';
  }
  else{
    alert("Please complete the fields");
  }
}

// use the data you saved in the previous function to create recipe cards for the "My recipes" page
function myRecipeCardMaker(text){
  if(my_recipe_cards){
    var card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = '<div class="images" style="background-image: url('+text.img+');"></div>' +
    '<div class="name">' +
      '<h1>'+text.name+'</h1>' +
    '</div>' +
    '<div class="other">' +
      '<p><span>Description: </span><br>'+text.description+'</p>' +
      '<p><span>Ingredients: </span><br>'+text.ingredients+'</p>' +
      '<p><span>Instructions: </span><br>'+text.instructions+'</p>' +
      '<a href="view-recipe.html" style="color:blue;cursor:pointer;" onclick="view_recipe(\'' +text.img+ '\' , \''+text.name+'\' , \'' +text.description+ '\' , \''+text.ingredients+'\' , \''+text.instructions+'\')">View more</a>' +
    '</div>' +
    '<div class="del-btn">' +
      '<i class="fas fa-trash" onclick="delMyRecipe(\'' +text.img+ '\' , \''+text.name+'\' , \'' +text.description+ '\' , \''+text.ingredients+'\' , \''+text.instructions+'\')"></i>' +
    '</div>';
    my_recipe_cards.appendChild(card); 
  }   
}

// delete a recipe from the "My recipes" page ( by clicking the trash button )
function delMyRecipe(img, name, description, ingredients, instructions){
  let index = myRecipesArray.findIndex(x => x.img === img && x.name === name && x.description === description && x.ingredients === ingredients && x.instructions === instructions);
  myRecipesArray.splice(index, 1);
  localStorage.setItem('myRecipes', JSON.stringify(myRecipesArray));
  location.reload();
}

// save the recipe data for the "View recipe" page in session storage ( by clicking on the "view more" hyperlink)
function view_recipe(img, name, description, ingredients, instructions){
  var recipe_info = {
  'img'  : img,
  'name' : name,
  'description' : description,
  'ingredients' : ingredients,
  'instructions' : instructions
  }
  viewRecipeArray = [];
  sessionStorage.setItem('viewRecipe', JSON.stringify(viewRecipeArray))
  viewRecipeArray.push(recipe_info);
  sessionStorage.setItem('viewRecipe', JSON.stringify(viewRecipeArray))
}

// use the saved data from the previous function to create a "big" recipe card for the "View recipe" page
function viewRecipeCardMaker(text){
  if(view_recipe_card){
    var card = document.createElement('div');
    card.className = 'big-card';
    card.innerHTML = '<div class="big-image" style="background-image: url('+text.img+');"></div>' +
    '<div class="name">' +
      '<h1>'+text.name+'</h1>' +
    '</div>' +
    '<div class="view-other">' +
      '<p><span>Description: </span><br>'+text.description+'</p>' +
      '<p><span>Ingredients: </span><br>'+text.ingredients+'</p>' +
      '<p><span>Instructions: </span><br>'+text.instructions+'</p>' +
    '</div>';
    view_recipe_card.appendChild(card);
  } 
}

// delete a recipe card from the "Saved recipes" page ( by clicking the trash button )
function delSavedRecipe(img, name, calories, cautions, dietLabels, healthLabels, ingredients, url){
  let index = savedRecipesArray.findIndex(x => x.img === img && x.name === name && x.calories === calories && x.cautions === cautions && x.dietLabels === dietLabels && x.url === url);
  savedRecipesArray.splice(index, 1);
  localStorage.setItem('recipes', JSON.stringify(savedRecipesArray));
  location.reload();
}