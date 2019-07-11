<!-- Andrew Pedersens Discussion File -->

Problem #1

So after going through the README.md file I read through the volunteers_calculator.js file just to get an idea of what the code was doing and to make sure I didnt notice anything mispelled or some soft of formatting out of place. 

From there I ran the test and noticed that we were recieving that the 
testBagsStillNeeded test was failing. 

from there I went to the calculator.js file to where the getBagsStillNeeded Function was written out and began investigating. When you go through the function you can see that the function itterates through the correct variables but bagsStillNeeded is a result of
 Goal Bags (this.data[i][1]) - Actual Bags (this.data[i][2]) ... not Actual Bags - Themselves. 

 