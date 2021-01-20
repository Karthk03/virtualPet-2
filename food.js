class Food
{
    constructor()
    {
        // creating the variables
        this.foodStock = 10;
        this.lastFeed;
        this.image = loadImage("Milk.png");
    }

    display()
    {
        // displaying the milk
        for(let i = 0; i<this.foodStock; i++)
        {
            imageMode(CENTER);
            image(this.image,i*20+20,200,40,50);
        }

        // showing when you last feed the dog
        // if last feed is not undefined 
        if(this.lastFeed != null)
        {
            textSize(20);
            fill("black");
            // since the hour function shows in a 24 hour format
            // we have to change it to a 12 hour format
            //if hour is greater than 12 then we have to take the remainder when divided by 12
            if(this.lastFeed>12)
            {
                text("last feed: "+this.lastFeed%12+ "PM",200,700);
            }
            // if it is 0 then it is the beginning of the day or 12PM
            else if(this.lastFeed == 0)
            {
                text("last feed: 12PM",200,700);
            }
            // if it does not fall into the above categories then we can just display normally
            else
            {
                text("last feed: "+this.lastFeed+ "AM",200,500);
            }
        }
    }

    // creating a function to update the database

    // updating the food stock
    updateFoodStock()
    {
        database.ref('/').update({
            'foodStock': this.foodStock
        })
    }
}