let searchName= document.getElementById("searchName");
let searchLetter= document.getElementById("searchLetter");
$(document).ready(function ()
{
{
   
   $(".loading i").fadeOut(400, function(){
      $(".loading").fadeOut(400,
          function()
          {   
            // $(".subloading-container").fadeOut(200);
              $(".loading").remove();
              $("body").css("overflow","auto");
          })
  })

 
}
})

$(".controlNav").click(function()
{
 if($(".navMenu").width()=="0")
 {
    $(".navMenu").width("250px");
    $(".navMenu").css("opacity","1");
    $(".nav-item ul .item1").animate({opacity:'1',paddingTop: "25px"},1000);
    $(".nav-item ul .item2").animate({opacity:'1',paddingTop: "25px"},1100);
    $(".nav-item ul .item3").animate({opacity:'1',paddingTop: "25px"},1200);
    $(".nav-item ul .item4").animate({opacity:'1',paddingTop: "25px"},1300);
    $(".nav-item ul .item5").animate({opacity:'1',paddingTop: "25px"},1400);
    $(".stripNav").css("left","250px");
    $(".nav-social-item").css("opacity","1");
    document.getElementById("controlNavbar").innerHTML= `<i class="fa fa-align-justify fa-times"></i>`; 
 }
 else
 {
   closeNavMenu();
 }
})

function closeNavMenu()
{
   $(".navMenu").width("0px");
   $(".navMenu").css("overflow","hidden");
   $(".nav-item ul li").animate({opacity:'0',paddingTop: "500px"},1000)
   $(".stripNav").css("left","0px");
   $(".nav-social-item").css("opacity","0");
   document.getElementById("controlNavbar").innerHTML= `<i class="fa fa-align-justify"></i>`; 
}

async function firstPage()
{
   $(".subloading-container").fadeIn(200);
   $("#contact").fadeOut(10);
   let API= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
   let response= await API.json();
   response= response.meals;
   // console.log(response);
   
   let Row="";
   for(var i=0;i<response.length;i++)
   {
      Row += ` <div class="col-md-6 col-lg-3 my-3 shadow">
      <div onclick="getMealDetails('${response[i].idMeal}')" class="meal-container shadow rounded position-relative" >
          <div  class="post w-100">
              <img src="${response[i].strMealThumb}" class="w-100 rounded" alt="">
              <div class="post-layer w-100 h-100 text-center d-flex align-items-center position-absolute">
                 <div class="post-info p-2">
                  <h2 class=" text-dark">${response[i].strMeal}</h2>
                 </div>
              </div>
            </div>
         </div>
      </div>`
      document.getElementById("mealsData").innerHTML= Row;
   }
   $(".subloading-container").fadeOut(200);
   // getMealDetails(`${response[i].idMeal}`);

   

}
firstPage();

// $(".meals-container").click(function(){
//    console.log("hello");
// })

// onclick="getMealDetails('${response[i].idMeal}')"



///////////////////////////Meal Details/////////////////////////////
async function getMealDetails(mealId)
{
   $(".subloading-container").fadeIn(200);
   let mealApi= await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
   let meal= await mealApi.json();
   meal= meal.meals[0];
   // $("#searchform").fadeOut(200,function(){
      // $("#default").fadeIn(200)
      closeNavMenu();
   // })
   $(".subloading-container").fadeOut(400);
   mealDescription(meal);
   $("html, body").animate({scrollTop: 0 }, 200);
   
   console.log(meal);
}

function mealDescription(meal)
{
   let recipesInfo = "";
   for (let i = 1; i <= 20; i++)
   {
       if (meal[`strIngredient${i}`]) {
        recipesInfo += `<li class="my-3 mx-1 p-1 alert-success rounded">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
       }
   }

  let tagsInfo = meal.strTags?.split(",");
  let strTag = "";
  for (let i = 0; i < tagsInfo?.length; i++) 
  {
     strTag += `<li class="my-3 mx-1 p-1 alert-danger rounded">${tagsInfo[i]}</li>`;
  }


  let Row="";
  
  
     Row+= ` <div class="col-md-4 pl text-center">
     <img src="${meal.strMealThumb}" class=" w-100" alt="">
     <h1>${meal.strMeal}</h1>
 </div>

 <div class="col-md-8 mt-1 pl">
     <h2 class="text-white">Instructions</h2>
     <p class="text-white mt-2">${meal.strInstructions}</p>
     <p class="text-white"><b class="fw-bolder text-white">Area :</b> ${meal.strArea}</p>
     <p class="text-white"><b class="fw-bolder">Category :</b> ${meal.strCategory}</p>
     <h3>Recipes :</h3>
     <ul class="d-flex align-items-start " id="recipes">
        
     </ul>

     <h3 class="my-2 mx-1 p-1">Tags :</h3>

     <ul class=" tags d-flex" id="tag">
         
     </ul>

     <a class="btn btn-success source text-white" target="_blank" href=${meal.strSource}>Source</a>
     <a class="btn youtube btn-danger text-white" target="_blank" href=${meal.strYoutube}>Youtube</a>
 </div>`
 document.getElementById("mealsData").innerHTML= Row;
 document.getElementById("recipes").innerHTML = recipesInfo;
 document.getElementById("tag").innerHTML = strTag;
 $("html, body").animate({scrollTop: 0 }, 200);

}
/////////////////////////////////////////////////////////////////////


//////////////////Search Page///////////////////////////

$("#searchPage").click(function(){
   $("#default").fadeOut(200);
      $("#searchform").fadeIn(200);
      // $("#default").fadeIn(200)
      $("#contact").fadeOut(10);
      closeNavMenu();
   })

// })
///////////////////////////////////////////Search By Name////////////////////////
async function searchMealByName(name)
{
   let API= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
   let response= await API.json();
   response= response.meals;
   // console.log(response);
   let Row="";
   for(let i=0;i<response.length;i++)
   {
      Row += ` <div class="col-md-6 col-lg-3 my-3 shadow">
      <div onclick="getMealDetails('${response[i].idMeal}')" class="meal-container shadow rounded position-relative">
          <div class="post w-100">
              <img src="${response[i].strMealThumb}" class="w-100 rounded" alt="">
              <div class="post-layer w-100 h-100 text-center d-flex align-items-center position-absolute">
                 <div class="post-info p-2">
                  <h2 class=" text-dark">${response[i].strMeal}</h2>
                 </div>
              </div>
            </div>
         </div>
      </div>`
      
      document.getElementById("mealsData").innerHTML= Row;
      
   }

   $("#default").fadeIn(200);

}

searchName.addEventListener('keyup', function(e){
   let keySearch= e.target.value;
   searchMealByName(keySearch);
   $("html, body").animate({scrollTop: 0 }, 200);
})

////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////Search By Letter////////////////////////////////
async function searchMealByFLetter(letter)
{
   let API= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
   let response= await API.json();
   response= response.meals;
   // console.log(response);
   let Row="";
   for(let i=0;i<response.length;i++)
   {
      Row += ` <div class="col-md-6 col-lg-3 my-3 shadow">
      <div onclick="getMealDetails('${response[i].idMeal}')" class="meal-container shadow rounded position-relative">
          <div class="post w-100">
              <img src="${response[i].strMealThumb}" class="w-100 rounded" alt="">
              <div class="post-layer w-100 h-100 text-center d-flex align-items-center position-absolute">
                 <div class="post-info p-2">
                  <h2 class=" text-dark">${response[i].strMeal}</h2>
                 </div>
              </div>
            </div>
         </div>
      </div>`
      document.getElementById("mealsData").innerHTML= Row;
   }
   $("#default").fadeIn(200);
   $("html, body").animate({scrollTop: 0 }, 200);

}

searchLetter.addEventListener('keyup', function(e){
   let keySearch= e.target.value;
   searchMealByFLetter(keySearch);
   $("html, body").animate({scrollTop: 0 }, 200);
})




/////////////////////////////////////////////////////////////////////////////////



/////////////////////////Category/////////////////////////////////////////////////
async function listMealsCategory()
{
   $(".subloading-container").fadeIn(100);
   let API= await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
   let response= await API.json();
   response= response.categories;
   // console.log(response);
   let Row="";
   for(let i=0;i<response.length;i++)
   {
      Row += ` <div class="col-md-6 col-lg-3 my-5 shadow">
      <div onclick="mealByCategory('${response[i].strCategory}')" class="meal-container shadow rounded position-relative">
          <div class="post w-100">
              <img src="${response[i].strCategoryThumb}" class="w-100 rounded" alt="">
              <div class="post-layer w-100 h-100 text-center d-flex align-items-center position-absolute">
                 <div class="post-info text-center p-2">
                  <h2 class=" text-dark">${response[i].strCategory}</h2>
                  <p class=" fw-bold">${response[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                 </div>
              </div>
            </div>
         </div>
      </div>`

      document.getElementById("mealsData").innerHTML= Row
     
   }
   $(".subloading-container").fadeOut(400);
   $("html, body").animate({scrollTop: 0 }, 200);
}

$("#categoryPage").click(function(){
   $("#searchform").fadeOut(10);
   $("#contact").fadeOut(10);
   closeNavMenu();
   $("#default").fadeIn(0);
      listMealsCategory();
   })


async function mealByCategory(category)
{
   $(".subloading-container").fadeIn(200);
   let API= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
   let response= await API.json();
   response= response.meals;
   let Row="";
   for(let i=0; i<response.length; i++)
   {
      Row += ` <div class="col-md-6 col-lg-3 my-3 shadow">
      <div onclick="getMealDetails('${response[i].idMeal}')" class="meal-container shadow rounded position-relative">
          <div class="post w-100">
              <img src="${response[i].strMealThumb}" class="w-100 rounded" alt="">
              <div class="post-layer w-100 h-100 text-center d-flex align-items-center position-absolute">
                 <div class="post-info text-center p-2">
                  <h2 class=" text-dark">${response[i].strMeal}</h2>
                 </div>
              </div>
            </div>
         </div>
      </div>`

      document.getElementById("mealsData").innerHTML= Row;
   }
   $(".subloading-container").fadeOut(400);
   $("html, body").animate({scrollTop: 0 }, 200);
}
///////////////////////////////////////////////////////////////////////////////////


/////////////////Area///////////////////////////////////////////////////////////////

async function listMealsArea()
{
   $(".loading-container").fadeIn(200);
   let API= await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
   let response= await API.json();
   response= response.meals;
   // console.log(response);
   // $(".loading-container").fadeOut(500);
   let Row="";
   for(let i=0;i<response.length;i++)
   {
      Row += ` <div class="col-md-6 col-lg-3 my-3 shadow">
      <div onclick="mealByArea('${response[i].strArea}')" class="meal-container shadow rounded position-relative">
          <div class="post w-100">
                 <div class="post-info text-center p-2">
                 <i class="areaIcon fas fa-city fa-3x"></i>
                  <h2 class="text-white">${response[i].strArea}</h2>
                  
                 </div>
            </div>
         </div>
      </div>`

      document.getElementById("mealsData").innerHTML= Row
     
   }
   $(".subloading-container").fadeOut(400);
   $("html, body").animate({scrollTop: 0 }, 200);
}

$("#areaPage").click(function(){
   $("#searchform").fadeOut(10);
   $("#contact").fadeOut(10);
   closeNavMenu();
      $("#default").fadeIn(0);
      listMealsArea();
   })
async function mealByArea(area)
{
   $(".subloading-container").fadeIn(200);
      let API= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
      let response= await API.json();
      response= response.meals;
      let Row="";
      for(let i=0; i<response.length; i++)
      {
         Row += ` <div class="col-md-6 col-lg-3 my-3 shadow">
         <div onclick="getMealDetails('${response[i].idMeal}')" class="meal-container shadow rounded position-relative">
             <div class="post w-100">
                 <img src="${response[i].strMealThumb}" class="w-100 rounded" alt="">
                 <div class="post-layer w-100 h-100 text-center d-flex align-items-center position-absolute">
                    <div class="post-info text-center p-2">
                     <h2 class=" text-dark">${response[i].strMeal}</h2>
                    </div>
                 </div>
               </div>
            </div>
         </div>`
   
         document.getElementById("mealsData").innerHTML= Row;
      }
      $(".subloading-container").fadeOut(400);
      $("html, body").animate({scrollTop: 0 }, 200);
}

/////////////////////////////////////////////////////////////////////////////////////


///////////////////////Ingredients////////////////////////////////////////////////////

async function listMealsIngredients()
{
   
   $(".subloading-container").fadeIn(200);
   let API= await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
   let response= await API.json();
   response= response.meals;
   console.log(response);
   // $(".loading-container").fadeOut(500);
   let Row="";
   for(let i=0;i<20;i++)
   {
      Row += ` <div class="col-md-6 col-lg-3 my-3 shadow">
      <div onclick="mealByIngredient('${response[i].strIngredient}')" class="meal-container shadow rounded position-relative">
          <div class="post w-100">
                 <div class="post-info text-center p-2">
                 <i class="ingredientsIcon fas fa-solid fa-utensils fa-3x"></i>
                 
                  <h2 class="text-white">${response[i].strIngredient}</h2>
                  <p class="text-white">${response[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                 </div>
            </div>
         </div>
      </div>`

      document.getElementById("mealsData").innerHTML= Row;


}
$(".subloading-container").fadeOut(400);
$("html, body").animate({scrollTop: 0 }, 200);
}
$("#ingredientPage").click(function()
{
   $("#searchform").fadeOut(10);
   $("#contact").fadeOut(10);
      closeNavMenu();
      $("#default").fadeIn(0);
      listMealsIngredients();

})

async function mealByIngredient(ingredient)
{
   $(".subloading-container").fadeIn(200);
      let API= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
      let response= await API.json();
      response= response.meals;
      let Row="";
      for(let i=0; i<response.length; i++)
      {
         Row += ` <div class="col-md-6 col-lg-3 my-3 shadow">
         <div onclick="getMealDetails('${response[i].idMeal}')" class="meal-container shadow rounded position-relative">
             <div class="post w-100">
                 <img src="${response[i].strMealThumb}" class="w-100 rounded" alt="">
                 <div class="post-layer w-100 h-100 text-center d-flex align-items-center position-absolute">
                    <div class="post-info text-center p-2">
                     <h2 class=" text-dark">${response[i].strMeal}</h2>
                    </div>
                 </div>
               </div>
            </div>
         </div>`
   
         document.getElementById("mealsData").innerHTML= Row;
      }
      $(".subloading-container").fadeOut(400);
      $("html, body").animate({scrollTop: 0 }, 200);
}

///////////////////////////////////////////////////////////////////////////////////////////





//////////////////Regex////////////////////////////////


let regexName= /^[a-zA-Z ]{4,}$/;
let regexEmail= /^[a-zA-z{0,}]{5,15}[0-9]{0,}@(yahoo|gmail)\.com$/;
// let regexAge= /^[1-9][0-9]|100$/;
let regexAge= /^[1-9][0-9]?$|^100$/;
let regexPhone=/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
let regexPassword= /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

let userName= document.getElementById("name");
let userEmail= document.getElementById("email");
let userPhone= document.getElementById("phone");
let userAge= document.getElementById("age");
let userPassword= document.getElementById("password");
let userRePassword= document.getElementById("rePassword");


let nameInputFocused= false;
let emailInputFocused= false;
let phoneInputFocused= false;
let ageInputFocused= false;
let passwordInputFocused= false;



function validateUserName()
{
   if(regexName.test(userName.value)==true)
   {
      return true;
   }
   else
   {
      return false;
   }
}
function validateUserEmail()
{
   if(regexEmail.test(userEmail.value)==true)
   {
      return true;
   }
   else
   {
      return false;
   }
}
function validateUserPhone()
{
   if(regexPhone.test(userPhone.value)==true)
   {
      return true;
   }
   else
   {
      return false;
   }
}
function validateUserAge()
{
   if(regexAge.test(userAge.value)==true)
   {
      return true;
   }
   else
   {
      return false;
   }
}
function validateUserPassword()
{
   if(regexPassword.test(userPassword.value)==true)
   {
      return true;
   }
   else
   {
      return false;
   }
}
function validateUserRePassword()
{
   if(userPassword.value===userRePassword.value)
   {
      return true;
   }
   else
   {
      return false;
   }
}


userName.addEventListener('focus', function()
{
   nameInputFocused= true;
})
userEmail.addEventListener('focus', function()
{
   emailInputFocused= true;
})
userPhone.addEventListener('focus', function()
{
   phoneInputFocused= true;
})
userAge.addEventListener('focus', function()
{
   ageInputFocused= true;
})
userPassword.addEventListener('focus', function()
{
   passwordInputFocused= true;
})

function validation()
{
   
   if(nameInputFocused== true)
   {
      if(validateUserName()== true)
   {
      $("#nameAlert").fadeOut(500);
      userName.classList.remove("is-invalid");
      userName.classList.add("is-valid");
   }
   else
   {
      $("#nameAlert").fadeIn(500);
      userName.classList.remove("is-valid");
      userName.classList.add("is-invalid");
   }
   }
   

   if(emailInputFocused==true)
   {
      if(validateUserEmail()== true)
   {
      $("#emailAlert").fadeOut(500);
      userEmail.classList.remove("is-invalid");
      userEmail.classList.add("is-valid");
   }
   else
   {
      $("#emailAlert").fadeIn(500);
      userEmail.classList.remove("is-valid");
      userEmail.classList.add("is-invalid");
   }

   }


   
   if(phoneInputFocused== true)
   {
      
   if(validateUserPhone()== true)
   {
      $("#phoneAlert").fadeOut(500);
      userPhone.classList.remove("is-invalid");
      userPhone.classList.add("is-valid");
   }
   else
   {
      $("#phoneAlert").fadeIn(500);
      userPhone.classList.add("is-invalid");
      userPhone.classList.remove("is-valid");
   }
   }


   if(ageInputFocused== true)
   {
      if(validateUserAge()== true)
   {
      $("#ageAlert").fadeOut(500);
      userAge.classList.remove("is-invalid");
      userAge.classList.add("is-valid");
   }
   else
   {
      $("#ageAlert").fadeIn(500);
      userAge.classList.add("is-invalid");
      userAge.classList.remove("is-valid");
   }
   }

   if(passwordInputFocused==true)
   {
      
   if(validateUserPassword()== true)
   {
      $("#passwordAlert").fadeOut(500);
      userPassword.classList.remove("is-invalid");
      userPassword.classList.add("is-valid");


      if(validateUserRePassword()== true)
      {
      $("#rePasswordAlert").fadeOut(500);
      userRePassword.classList.remove("is-invalid");
      userRePassword.classList.add("is-valid");
      }
      else
      {
      $("#rePasswordAlert").fadeIn(500);
      userRePassword.classList.add("is-invalid");
      userRePassword.classList.remove("is-valid");
      }
   }
   else
   {
      $("#passwordAlert").fadeIn(500);
      userPassword.classList.add("is-invalid");
      userPassword.classList.remove("is-valid");
   }

   
   }


   if(validateUserName()&&validateUserEmail()&&validateUserAge()&&validateUserPhone()&&validateUserPassword()&&validateUserRePassword())
   {
      document.getElementById("submitBtn").removeAttribute("disabled");
   }
   
   else
   {
      document.getElementById("submitBtn").setAttribute("disabled","true");
   }
}

$("#contactPage").click(function(){
   
   $("#searchform").fadeOut(10);
      closeNavMenu();
      $("#default").fadeOut(10);
      $("#contact").fadeIn(60, function()
      {
         validation();
      })
      
})

$("#submitBtn").click(function()
{
   userName.value="";
   $("#contact").fadeOut(400, function(){
      $("#default").fadeIn(500);
      firstPage();
   });
   

})



















