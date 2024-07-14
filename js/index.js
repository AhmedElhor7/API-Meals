$(document).ready(function () {
  // Show Nav Bar
  $("#switch").on("click", function () {
    showNavBar();
  });

  // Hide Nav Bar
  $("#close").on("click", function () {
    hideNavBar();
  });

  $("#home").on("click", function (e) {
    e.preventDefault();
    showLoader();
    window.location.href = "index.html";
  });

  // Attach click event handler to dynamically created elements
  $(document).on("click", "#containerMeals", function (e) {
    showLoader();
    const targetId = $(e.currentTarget).find(".text-slideup").attr("target-id");
    getApiForMealDetails(targetId).then(function () {
      hideLoader();
      showmealDetails();
    });
  });
  // Attach click event handler to dynamically created elements
  $(document).on("click", "#containerCategories", function (e) {
    showLoader();
    const targetName = $(e.currentTarget)
      .find(".text-name")
      .attr("target-name");
    getApiForMeal(targetName, "", false).then(function () {
      hideLoader();
    });
  });

  // Attach click event handler to dynamically created elements
  $(document).on("click", "#containerCountryMeals", function (e) {
    showLoader();
    // console.log("Area clicked");
    const targetId = $(e.currentTarget).find(".text-slideup").attr("target-id");
    getApiForMealDetails(targetId).then(function () {
      hideLoader();
      showmealDetails();
    });
  });

  // Attach click event handler to dynamically created elements
  $(document).on("click", "#containerIngredients", function (e) {
    showLoader();
    // console.log("Ingredients clicked");
    const targetId = $(e.currentTarget).find(".text-slideup").attr("target-id");
    getApiForMealDetails(targetId).then(function () {
      hideLoader();
      showmealDetails();
    });
  });

  // Attach click event handler to dynamically created elements
  $(document).on("click", "#containerArea", function (e) {
    showLoader();
    // console.log("Country clicked");
    const targetCountry = $(e.currentTarget)
      .find("span")
      .attr("target-country");
    getApiForMeal("", "", false, false, targetCountry).then(function () {
      hideLoader();
    });
  });

  // Attach click event handler to dynamically created elements
  $(document).on("click", "#containerAllIngredients", function (e) {
    showLoader();
    // console.log("AllIngredients clicked");
    const targetIngredients = $(e.currentTarget)
      .find("span")
      .attr("target-ingredients");
    getApiForMeal("", "", false, false, "", false, targetIngredients).then(
      function () {
        hideLoader();
      }
    );
  });
  //   Call Api Null To Return All Data
  showLoader();
  getApiForMeal("").then(function () {
    hideLoader();
  });
});

  // Declare Global Variables
  const $mealDetails = $("#mealDetails");
  const $meals = $("#meals");
  const $searchContainer = $("#searchContainer");

// This Function To Show Nav Bar
function showNavBar() {
        $(".nav-hide").animate({ left: "0%" }, 500, "swing");
        $(".nav-show").animate({ left: "250px" }, 500, "swing");
        $("ul li").animate({ top: "0px" }, 500, "swing");
        $("#switch").hide();
        $("#close").removeClass("d-none");
}

// This Function To Hide Nav Bar
function hideNavBar() {
    $(".nav-hide").animate({ left: "-250px" }, 500, "swing");
    $(".nav-show").animate({ left: "0%" }, 500, "swing");
    $("ul li").animate({ top: "300px" }, 500, "swing");
    $("#switch").show();
    $("#close").addClass("d-none");
}


// Function to show loader
function showLoader() {
    document.querySelector('#coverLoader').classList.remove('d-none');
    document.querySelector('#meals').classList.add('d-none');
}

// Function to hide loader
function hideLoader() {
    document.querySelector('#coverLoader').classList.add('d-none');
    document.querySelector('#meals').classList.remove('d-none');
}

// Function to display data fetched from the API
function displayData(data, dataType = 'meals') {
    // console.log(data);

    let container = ``;

    if (dataType === 'meals' && data.meals) {
        // Display meals
        for (let i = 0; i < data.meals.length && i < 20; i++) {
            const meal = data.meals[i];
            container += `
                <div class="col-md-3 containerMeals text-center" id="containerMeals">
                    <figure class="position-relative rounded-2">
                        <div class="home-img">
                            <img src="${meal.strMealThumb}" alt="" class="img-fluid">
                        </div>
                        <div class="text-slideup d-flex justify-content-center align-items-center" target-id="${meal.idMeal}">
                            <span>${meal.strMeal}</span>
                        </div>
                    </figure>
                </div>
            `;
        }
    }

    if (dataType === 'categories' && data.categories) {
        // Display categories
        for (let i = 0; i < data.categories.length; i++) {
            const category = data.categories[i];
            container += `
                <div class="col-md-3 container-categories text-center" id="containerCategories">
                    <figure class="position-relative rounded-2">
                        <div class="home-img">
                            <img src="${
                              category.strCategoryThumb
                            }" alt="" class="img-fluid">
                        </div>
                        <div class="text-slideup d-flex justify-content-center align-items-center" target-id="${category.idCategory}">
                        <span class="text-name" target-name="${category.strCategory}">${category.strCategory} <br>    <span class="fs-6">${category.strCategoryDescription.slice(0 , 120)}</span>  </span>                        
                        </div>
                    </figure>
                </div>
            `;
        }
    }

    if (dataType === 'area' && data.meals) {
        // Display area
        for (let i = 0; i < data.meals.length; i++) {
            const meal = data.meals[i];
            container += `
                <div class="col-md-3 container-categories text-center" id="containerArea">
                    <figure class="position-relative rounded-2">
                        <div class="home-country">
                            <i class="fa-solid fa-house-laptop text-white-50"></i>
                        </div>
                        <div class="text-slideup d-flex justify-content-center align-items-center" target-id="${meal.idMeal}">
                            <span target-country="${meal.strArea}">${meal.strArea}</span>
                        </div>
                    </figure>
                </div>
            `;
        }
    }

    if (dataType === 'ingredients' && data.meals) {
        // Display area
        for (let i = 0; i < data.meals.length; i++) {
            const meal = data.meals[i];
            container += `
                <div class="col-md-3 container-categories text-center" id="containerIngredients">
                    <figure class="position-relative rounded-2">
                        <div class="home-country">
                            <img src="${
                                meal.strMealThumb
                            }" alt="" class="img-fluid">
                        </div>
                        <div class="text-slideup d-flex justify-content-center align-items-center" target-id="${meal.idMeal}">
                            <span>${meal.strMeal}</span>
                        </div>
                    </figure>
                </div>
            `;
        }
    }
   

    if (dataType === "country" && data.meals) {
        // Display country-specific meals
        for (let i = 0; i < data.meals.length; i++) {
            const meal = data.meals[i];
            container += `
                <div class="col-md-3 container-categories text-center" id="containerCountryMeals">
                    <figure class="position-relative rounded-2">
                        <div class="home-img">
                            <img src="${meal.strMealThumb}" alt="" class="img-fluid">
                        </div>
                        <div class="text-slideup d-flex justify-content-center align-items-center" target-id="${meal.idMeal}">
                            <span>${meal.strMeal}</span>
                        </div>
                    </figure>
                </div>
            `;
        }
    }

    if (dataType === 'allIngredients' && data.meals) {
        // Display all Ingredients
        for (let i = 0; i < data.meals.length && i < 20 ; i++) {
            const meal = data.meals[i];
            container += `
                <div class="col-md-3 container-categories text-center" id="containerAllIngredients">
                    <figure class="position-relative rounded-2">
                        <div class="home-country">
                            <i class="fa-solid fa-drumstick-bite text-white-50 fs-1"></i>
                        </div>
                        <div class="text-slideup d-flex justify-content-center align-items-center" target-id="${meal.idIngredient}">
                            <span class="text-name" target-ingredients="${meal.strIngredient}">${meal.strIngredient} <br>    <span id="smallText">${meal.strDescription.slice(0 , 110)}</span>  </span>
                        </div>
                    </figure>
                </div>
            `;
        }
    }

    // Set the generated HTML to the container
    $("#containerAllMeals").html(container);
}

// Start Call API
// Function to fetch data from the API based on different parameters
async function getApiForMeal(name = "", firstletter = "", categories = false, area = false, country = "" , allIngredients = false , ingredients ='') {
     if (allIngredients) {
        try {
            const api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
            const response = await api.json();
            // console.log(response);
            displayData(response, "allIngredients");
        } catch (error) {
            console.error("Error fetching area list API", error);
        }
    } 
    else if (ingredients) {
        // console.log("into api ingredients" + ingredients);
        try {
            const api = await fetch(
                `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`
            );
            const response = await api.json();
            // console.log(response);
            displayData(response, "ingredients");
        } catch (error) {
            console.error("Error fetching country list API", error);
        }
    } 
    else if (country) {
        // console.log("into api Country" + country);
        try {
            const api = await fetch(
                `https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`
            );
            const response = await api.json();
            // console.log(response);
            displayData(response, "country");
        } catch (error) {
            console.error("Error fetching country list API", error);
        }
    } 
    else if (area) {
        try {
            const api = await fetch(
                `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
            );
            const response = await api.json();
            // console.log(response);
            displayData(response, "area");
        } catch (error) {
            console.error("Error fetching area list API", error);
        }
    } 
    else if (categories) {
        try {
            const api = await fetch(
                `https://www.themealdb.com/api/json/v1/1/categories.php`
            );
            const response = await api.json();
            // console.log(response);
            displayData(response, "categories");
        } catch (error) {
            console.error("Error fetching categories API", error);
        }
    } else if (firstletter) {
        try {
            const api = await fetch(
                `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstletter}`
            );
            const response = await api.json();
            displayData(response);
        } catch (error) {
            console.error("Error fetching search by first letter API", error);
        }
    } else {
        try {
            const api = await fetch(
                `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
            );
            const response = await api.json();
            displayData(response);
        } catch (error) {
            console.error("Error fetching search by name API", error);
        }
    }
}



// Function to get detailed data from API
async function getApiForMealDetails(id) {
    const options = {
        method: "GET",
    };

    const api = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
        options
    );
    const response = await api.json();
    // console.log(response);
    displayDataOfCard(response);
}



// This Function To Display Data For Meal Deatails
function displayDataOfCard(data) {
    // console.log(data);
    let container = "";

    for (let i = 0; i < data.meals.length; i++) {
        const meal = data.meals[i];

        // Start building the HTML for each meal
        container += `
      <div class="col-12">
        <div class="meal-header d-flex justify-content-end align-items-center py-3">
          <i class="fa-solid fa-xmark h2" id="closeIcone"></i>
        </div>
      </div>
      <div class="col-md-4">
        <div class="meal-img">
          <img src="${meal.strMealThumb}" class="img-fluid pb-3" alt="">
          <span class="h1"></span>
        </div>
      </div>
      <div class="col-md-8">
        <div class="meal-details pb-5">
          <h3>Instructions</h3>
          <p class="pt-3">${meal.strInstructions}</p>
          <h4>Area : <span class="btn btn-primary ms-5">${meal.strArea
            }</span></h4>
          <h4>Category : <span class="btn btn-primary">${meal.strCategory
            }</span></h4>
          <h4 id="recipes" class="pb-2">Recipes :</h4>
          <div class="meal-recipes">
            ${generateMeasuresHtml(meal)}
          </div>
          <h4>Tags :</h4>
          ${meal.strTags && meal.strTags.trim() !== 'null' ? `<span class="btn btn-secondary ms-2 mb-3">${meal.strTags}</span>` : `<span class="btn btn-secondary ms-2 mb-3">Sorry No Data I Found It</span>`}
          <div class="meal-source">
            <span class="btn btn-outline-danger ms-2">
              <a href="${meal.strSource
            }" target="_blank" class="text-decoration-none text-reset">Source</a>
            </span>
            <span class="btn btn-outline-danger">
              <a href="${meal.strYoutube
            }" target="_blank" class="text-decoration-none text-reset">Youtube</a>
            </span>
          </div>
        </div>
      </div>
    `;
    }

    document.querySelector("#rowOfmealDeatils").innerHTML = container;
}

function generateMeasuresHtml(meal) {
    let measuresHtml = "";

    // Loop through possible measure fields (strMeasure1 to strMeasure20)
    for (let i = 1; i <= 20; i++) {
        const measure = meal[`strMeasure${i}`];
        if (measure && measure.trim() !== "") {
            measuresHtml += `<span class="btn btn-secondary">${measure}</span>`;
        }
    }

    return measuresHtml;
}

// This Function TO Show Details OF Meal
function showmealDetails() {
    meals.classList.add("d-none");
    searchContainer.classList.add('d-none');
    mealDetails.classList.remove("d-none");
}

// This Function To Hide details section
document.addEventListener('click', function (event) {
    if (event.target.id === 'closeIcone') {
        mealDetails.classList.add("d-none");
        meals.classList.remove("d-none");
    }
});

// This Event When Click Any Input Call Function Hide Nav Bar
$("input").on('click', function () {
    hideNavBar();
});

// This Function To search For Meal By Using Name
$("#searchName").on('input', function () {
    showLoader();
    // console.log('iam into search fn');
    searchName = $("#searchName").val();
    getApiForMeal(searchName).then(function () {
        hideLoader();
    });
});
// This Function To search For Meal By Using First Letter
$("#searchFirstLetter").on("input", function () {
    showLoader();
    // console.log("iam into search fn");
    const searchFirstLetter = $("#searchFirstLetter").val();
    getApiForMeal('', searchFirstLetter).then(function () {
        hideLoader();
    });
});
// This Function When Click Search Nav Show Input For Search
$("#search").on("click", function () {
    clearFormFields();
    hideDeatailsSection();
    hideFormSection();
    showSearchSection();
    // Because Ruturn Empty Value
    getApiForMeal("null");
    // console.log("iam into search search");
    searchContainer.classList.remove("d-none");
    document.addEventListener("click", function (event) {
        if (event.target.id === "closeIcone") {
            mealDetails.classList.add("d-none");
            searchContainer.classList.remove("d-none");
            meals.classList.remove("d-none");
        }
    });
});
// This Function To Hide Section Deatils
function hideDeatailsSection() {
    mealDetails.classList.add("d-none");
    meals.classList.remove("d-none");
}
// This Function To Hide Section Search
function hideSearchSection() {
    $('#searchContainer').hide();
}
// This Function To Show Section Search
function showSearchSection() {
    $('#searchContainer').show();
}
// This Function To Hide Section Form
function hideFormSection() {
    $("#contactUsContainer").addClass("d-none");
}

// This Function To Show Section Form
function showFormSection() {
    $("#contactUsContainer").removeClass("d-none");
}

// Function to clear form fields
function clearFormFields() {
    $("input").val('');
}


// Click event handler for the categories button
$("#categories").on("click", function () {
    // console.log("iam into search categories");
    showLoader();

    getApiForMeal("", "", true).then(function() {
        hideDeatailsSection();
        hideSearchSection();
        hideFormSection();
        hideLoader();
    });
});

//  Function to search for meals based on various criteria
$("#area").on("click", function () {
    // console.log("Clicked on Area");
    showLoader();
    getApiForMeal("", "", false, true).then(function () {
    hideDeatailsSection();
    hideSearchSection();  
    hideFormSection();
    hideLoader();  
    });

});

//  Function to search for meals based on ingredients 
$("#ingredients").on("click", function () {
    // console.log("Clicked on ingredients");
    showLoader();
    getApiForMeal("", "", false, false , "",true).then(function () {
        hideDeatailsSection();
        hideSearchSection();
        hideFormSection();
        hideLoader(); 
    });

});

//  Function to Show Contact Us 
$("#contact").on("click", function () {
    // console.log("Clicked on contact");
    clearFormFields();
    showFormSection();
    hideDeatailsSection();
    hideSearchSection();
    $('#meals').addClass('d-none');
    
});


// Start Validation Inputs 
  // Validation configuration for each input field
  const validations = {
    inputName: {
      regex: /^[a-zA-Z\s]*$/, // Regular expression for name validation
      message: "#messageNameValid", // Error message span id
    },
    inputEmail: {
      regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Regular expression for email validation
      message: "#messageEmailValid",
    },
    inputPhone: {
      regex: /^\d{11}$/, // Regular expression for phone number validation (12 digits)
      message: "#messagePhoneValid",
    },
    inputAge: {
      custom: (value) => value >= 6 && value <= 120, // Custom validation function for age range
      message: "#messageAgeValid",
    },
    inputPassword: {
      regex: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/, // Regular expression for password validation
      message: "#messagePasswordValid",
    },
    inputRePassword: {
      custom: (value) => value === $("#inputPassword").val(), // Custom validation function for password match
      message: "#messageRePasswordValid",
    },
  };

  // Function to validate a specific field
  function validateField(inputId, value) {
    const { regex, custom, message } = validations[inputId];
    const isValid = regex ? regex.test(value) : custom(value); // Perform validation based on regex or custom function
    $(message).toggleClass("d-none", isValid); // Show/hide error message based on validity
    return isValid;
  }

  // Function to validate the entire form
  function validateForm() {
    const isValid = Object.keys(validations).every((inputId) => {
      const value = $(`#${inputId}`).val().trim(); // Get trimmed value of input field
      return value !== "" && validateField(inputId, value); // Check if field is not empty and passes validation
    });

    $("#submitBtn").prop("disabled", !isValid); // Enable/disable submit button based on form validity
  }

  // Bind input and paste events for validation on each input field
  Object.keys(validations).forEach((inputId) => {
    $(`#${inputId}`).on("input paste", function () {
      validateField(inputId, $(this).val()); // Validate field on input or paste
      validateForm(); // Check overall form validity
    });
  });

  // Function to handle form submission
  $("#submitBtn").on("click", function () {
    clearFormFields(); // Clear form fields after submission
  });

  // Initially disable the submit button
  $("#submitBtn").prop("disabled", true);






