// declsring the variables
var database;
var happyDog, dog;
var food;
var button1, button2;
var flag = false, coolDown = 0;

function preload()
{
  // loading the images
	happyDog = loadImage("images/dogImg1.png");
  dog = loadImage("images/dogImg.png");
}

function setup()
{
	createCanvas(800, 700);
  // creating the buttons
  button1 = createButton('feed');
  button2 = createButton('add food');

  // putting the buttons in position
  button2.position(800,700);
  button1.position(700,700);

  database = firebase.database();

  // creating a food class object
  food = new Food();

  // referring the database to update the variables

  // updating the food stock variable
  database.ref('foodStock').on("value",function(data){
    food.foodStock = data.val();
  })

  // updating the frame count variable
  database.ref('frameCount').on("value",function(data){
    frameCount = data.val();
  })

  // updating the flag variable
  database.ref('flag').on("value",function(data){
    flag = data.val();
  })

  // updating the cool down variable
  database.ref('coolDown').on("value",function(data){
    coolDown = data.val();
  })
}


function draw() 
{  
  drawSprites();

  background("white");

  food.display();

  // if food stock is 0 (you have no more food) it will tell you to feed your dog
  if(food.foodStock == 0)
  {
    textSize(20);
    fill("black")
    text("feed me!",400,600);
  }

  imageMode(CENTER);

  // if flag is true (you have feed the dog)  then the dog is happy and it displays a bottle in front of it
  // and cool down starts incrementing
  if(flag == true)
  {
    image(happyDog,400,350,100,200);
    image(food.image,300,350,75,150)
    coolDown++;
    updateCoolDown(coolDown);
  }
  // if flag is false (the dog has eaten what you have given or you havent feed it yet) then the dog appears sad
  else
  {
    image(dog,400,350,100,200);
  }

  // if cool down reaches 100 (it has been 100 frames of time) then we set cool down to 0
  // and update flag to false
  // as if the dog drank the milk bottle
  if(coolDown == 100)
  {
    coolDown = 0;
    updateCoolDown(coolDown);
    flag = false;
    updateFlag(flag);
  }

  // if feed button is pressed and flag is false then food stock should decrese and last feed is updated
  // and flag is changed to true
  button1.mousePressed(function(){
    // if flag is false (the dog has eaten what you have given or you havent feed it yet)
    // then it will go through with the code
    if(flag == false)
    {
      food.foodStock--;
      food.updateFoodStock();

      food.lastFeed = hour();
      
      flag = true;
      updateFlag(flag);
    }
  })

  // if add food button is pressed then it will add food to the stock
  // by incrementing food stock
  button2.mousePressed(function(){
    food.foodStock++;
    food.updateFoodStock();
  })
}

// creating functions to update the database

// updating the cool down
function updateCoolDown(count)
{
  database.ref('/').update({
    'coolDown': count
  })
}

// updating the flag
function updateFlag(value)
{
  database.ref('/').update({
    'flag': value
  })
}
