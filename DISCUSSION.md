<!-- Andrew Pedersens Discussion File -->

Problem #1

So after going through the README.md file I read through the volunteers_calculator.js file just to get an idea of what the code was doing and to make sure I didnt notice anything mispelled or some soft of formatting out of place. 

From there I ran the test and noticed that we were recieving that the 
testBagsStillNeeded test was failing. 

from there I went to the calculator.js file to where the getBagsStillNeeded Function was written out and began investigating. When you go through the function you can see that the function itterates through the correct variables but bagsStillNeeded is a result of
 Goal Bags (this.data[i][1]) - Actual Bags (this.data[i][2]) ... not the "Actual Bags variable" minus themselves. 

 Problem #2 

To handle an additional value in the Text File (or the "data" array it is itterating through) you just need to adjust the place holder values of where the for loops look for the data by changing them one number higher than their previous value because the Day of the week's name is now taking up the [0] place holder value in each entry. 

I tried using an if/else statement to set a days variable and change the date based on the value of 'i'
in the getResults function but that wasnt passing the data that I wanted due to the variables I was trying to pass around not being globally scoped. 

To get the days of the week on to show in the console/results I wrote a function that itterated through the daysCount variable and then set the day of the week equal to the first value in the array for entered in that day (which would be the day of the week). I then passed the result of that function into the getResults function and used a ternary operator to allow the days of the week to be showing if the variable for the Day is set in the records. But if its not, the original formnat is used and the day as a number is displayed.


Problem #3

To sort the Results in descending order I took the getResults function and addeed a sort method which containted a function within it. That function would take the each result and slice off the number portion of the result and compare it to the one following it and then reorder them in desending fashion. Keep in mind that this program has its limitations and only works for parameters given as it would need to be refactored to handle larger values.





Problem #4 

I would implement data recieved and the 
results calculated as (JavaScript) Object Literals for better indexing, manulipation, and exhibition. 

I would also write this program using more ECMAScript 6 syntax for better readibility and block-scope and constant variable integration. 