#!/usr/bin/env node

var fs = require("fs");

var VolunteersCalculator = module.exports = function(){
  return {
    bagsStillNeeded: null,
    bagsStockedPerVolunteer: null,
    volunteersNeeded: null,
    daysCount: null,
    data: null,
    results: null,
    dayOfWeek: null,

     

    processFile: function(f, done) {
      var self = this;
      fs.readFile(f, 'utf8', function (err,data) {
        var lines = data.split('\n');
        this.volunteerData = [];
        for(let line = 0; line < lines.length; line++){
          this.volunteerData.push(lines[line].split(','));
        }
        var daysCount = (this.volunteerData.length-1);
        var data = this.volunteerData.splice(1);

        self.daysCount = daysCount;
        self.data = data;
        done(daysCount, data);
      });
    },

    dayCount: function() {
      var daysCount = this.data.length;
      return this.daysCount;
    },

    getVolunteersNeeded: function() {
      if (this.volunteersNeeded !== null) {
        return this.volunteersNeeded;
      }

      var volunteersNeeded = [];
      for(let j = 0; j < this.daysCount; j++) {
        var v = (this.getBagsStillNeeded()[j]/this.getBagsStockedPerVolunteer()[j])
        volunteersNeeded.push(v.toFixed(2));
      };
      return volunteersNeeded;
    },

    getDayOfWeek: function() {
      if (this.dayOfWeek !== null) {
        return this.dayOfWeek;
      }

     this.dayOfWeek = [];
     for (let i = 0 ; i < this.daysCount; i++) {
        var day = this.data[i][3];
        this.dayOfWeek.push(day);
     }
      return this.dayOfWeek
    },

    getResults: function(volunteers) {
      this.results = [];
      for(let i = 0; i < volunteers.length; i++) { 
        var result = (volunteers[i]+' additional volunteers are needed on day '+ (this.daysCount > 3 ? this.getDayOfWeek()[i] : i))
        result = result.replace(/(\r\n|\n|\r)/gm,"");
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

    getBagsStillNeeded: function() {
      if (this.bagsStillNeeded !== null) {
        return this.bagsStillNeeded;
      }

      this.bagsStillNeeded = [];
      for(let i = 0; i < this.daysCount; i++) {
        var bags = (this.data[i][1]- this.data[i][2]);
        this.bagsStillNeeded.push(bags);
      };
      return this.bagsStillNeeded;
    },

    getBagsStockedPerVolunteer: function() {
      if (this.bagsStockedPerVolunteer !== null) {
        return this.bagsStockedPerVolunteer;
      }

      this.bagsStockedPerVolunteer = [];
      for(let i = 0; i < this.daysCount; i++) {
        var bagsStocked = this.data[i][2];
        var volunteersForDay = this.data[i][0];

        this.bagsStockedPerVolunteer.push((bagsStocked/volunteersForDay));
      };
      return this.bagsStockedPerVolunteer;
    }
  }
}

if (require.main === module) {
  var calculator = new VolunteersCalculator();
  var readAndPrint = function(arg) {
    calculator.processFile(arg, function() {
      var volunteers = calculator.getVolunteersNeeded();
      calculator.getResults(volunteers);
    });
  }

  if (process.argv.length === 3) {
    readAndPrint(process.argv[2]);
  } else {
    console.log("Please follow the README instructions to run the program.");
  }
}
