<!-- Andrew Pedersens Discussion File -->

Problem #1

After going through the README.md file I read through the volunteers_calculator.js file just to get an idea of what the code was doing and to make sure I didn't notice anything misspelled or some soft of formatting out of place.

From there I ran the test and noticed that we were receiving that the
testBagsStillNeeded test was failing.

I went to the calculator.js file to where the getBagsStillNeeded Function was written out and began investigating. When you go through the function you can see that the function iterates through the correct variables but bagsStillNeeded is a result of
Goal Bags (this.data[i][1]) - Actual Bags (this.data[i][2]) ... not the "Actual Bags variable" minus themselves.

    getBagsStillNeeded: function() {
     if (this.bagsStillNeeded !== null) {
       return this.bagsStillNeeded;
     }

     this.bagsStillNeeded = [];
     for(var i = 0; i < this.daysCount; i++) {
       var bags = (this.data[i][1]- this.data[i][2]);
       this.bagsStillNeeded.push(bags);
     };
     return this.bagsStillNeeded;
   },

Problem #2

To handle an additional value in the Text File (or the "data" array it is iterating through) you just need to adjust the place holder values of where the for loops look for the data by changing them one number higher than their previous value because the Day of the week's name is now taking up the [0] place holder value in each entry.

I tried using an if/else statement to set a days variable and change the date based on the value of 'i' in the getResults function but that wasn't passing the data that I wanted due to the variables I was trying to pass around not being globally scoped.

To get the days of the week on to show in the console/results I wrote a function that iterates through the daysCount variable and then set the day of the week equal to the first value in the array for entered in that day (which would be the day of the week). I then passed the result of that function into the getResults function and used a ternary operator to allow the days of the week to be showing if the variable for the Day is set in the records. But if its not, the original format is used and the day as a number is displayed.

*Finally - While the above method worked for the implementation it compromised the test so I put days of the week on the End of Daily Data (in index [3]) so and returned other functions to reference their original indexes.

   getDayOfWeek: function() {
     if (this.dayOfWeek !== null) {
       return this.dayOfWeek;
     }

    this.dayOfWeek = [];
    for (var i = 0 ; i < this.daysCount; i++) {
       var day = this.data[i][3];
       this.dayOfWeek.push(day);
    }
     return this.dayOfWeek
   },

   getResults: function(volunteers) {
     this.results = [];
     for(var i = 0; i < volunteers.length; i++) {
       var result = (volunteers[i]+" additional volunteers are needed on day "+ (this.daysCount < 3 ? i : this.getDayOfWeek()[i]))
       this.results.push(result);
       console.log(result)
     }
   }
     console.log(this.results)
     return this.results;
   },

Problem #3

To sort the Results in descending order I took the getResults function and added a sort method which contained a function within it. That function would take the each result and slice off the number portion of the result and compare it to the one following it and then reorder them in descending fashion. Keep in mind that this program has its limitations and only works for parameters given as it would need to be refactored to handle larger values.

   getResults: function(volunteers) {
     this.results = [];
     for(var i = 0; i < volunteers.length; i++) {
       var result = (volunteers[i]+" additional volunteers are needed on day "+ (this.daysCount < 3 ? i : this.getDayOfWeek()[i]))
       this.results.push(result);
       console.log(result)
     }
     if (this.daysCount > 3) {
     this.results.sort( function(a,b){
       var slicedResultA = a.slice(0,5)
       var slicedResultB = b.slice(0,5)
       var volunteersA = parseFloat(slicedResultA)
       var volunteersB = parseFloat(slicedResultB)
       return volunteersB - volunteersA;       
     })
   }
     console.log(this.results)
     return this.results;
   },





Problem #4

I would make sure I am not reusing variable names volunteer) such as in the get stokedBagsPerVolunteer function and the file processing funciton. For someone like "us" who has spent alot of time with this code we know there is a differnce between the two but making them slightly differnt may make it easier for someone else to read. Also assigning different variables helps keep edge cases down especially with using larger scoped variable names.

I also changed my var's to let in my for loops to make sure they are blocked scoped. This is a habit I startedd in school and it helps me better visually keep track of what my programs are doing. 

