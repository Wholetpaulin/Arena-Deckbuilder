    // The below code fills in the first row of the table
    //var type = "fight+club";
    var queryURL = "https://api.hearthstonejson.com/v1/22611/enUS/cards.collectible.json";
    var firstc = 0;         //these are global counters used in one of out later functions
    var secondc = 1;
    var thirdc = 2;

    $.ajax({
      url: queryURL,
      method: "GET",
    }).done(function(response) {
      
      //Here's where the function will go that fill the array appropiatly...
      var standdruid = getSet("DRUID", response);
      console.log(standdruid);
      filltable(standdruid);                //change this from response to a more concise array

      //console.log(response);
      
    });

    //-------------------------function definitions-------------------------
    function filltable(response){

      var len = response.length;
      var randomarr = [];

      for(var i = 0; i < 90; i++){
         randomarr.push(Math.floor(Math.random() * len));
      }

        // Getting the first row of the table
      var firstRowTds = $("table")
        .children()
        .eq(1)          //choose tbody
        .children("tr")
        .eq(0)          //choose the first tr
        .children("td");


      // Setting the inner text of each td in the first row
      firstRowTds.eq(0).html('<button class="btn waves-effect waves-light" type="submit" name="action">'+response[randomarr[0+firstc]].name+'</button>');
      //The use of randomarr[0+firstc] is simply a way to get one of 90 random numbers between 0 and len
      firstRowTds.eq(1).text(response[randomarr[0+firstc]].cost + " mana " + response[randomarr[0+firstc]].rarity + " " +  response[randomarr[0+firstc]].type);  //should do attack and health for minions here

      firstRowTds.eq(2).html($.parseHTML(response[randomarr[0+firstc]].text));

      // Getting the second row of the table
      var secondRowTds = $("table")
        .children()
        .eq(1)          //choose tbody
        .children("tr")
        .eq(1)          //choose the second tr
        .children("td");

      // Setting the inner text of each td in the second row
      //gets the card's name
      secondRowTds.eq(0).html('<button class="btn waves-effect waves-light" type="submit" name="action">'+response[randomarr[0+secondc]].name+'</button>');

      secondRowTds.eq(1).text(response[randomarr[0+secondc]].cost + " mana " + response[randomarr[0+secondc]].rarity + " " + response[randomarr[0+secondc]].type);  //should do attack and health for minions here too

      //gets the description of the card
      secondRowTds.eq(2).html($.parseHTML(response[randomarr[0+secondc]].text));

      // Getting the third row of the table
      var thirdRowTds = $("table")
        .children()
        .eq(1)          //choose tbody
        .children("tr")
        .eq(2)          //choose the third tr
        .children("td");

      // Setting the inner text of each td in the second row
      //gets the card's name
      thirdRowTds.eq(0).html('<button class="btn waves-effect waves-light" type="submit" name="action">'+response[randomarr[0+thirdc]].name+'</button>');

      thirdRowTds.eq(1).text(response[randomarr[0+thirdc]].cost + " mana " + response[randomarr[0+thirdc]].rarity + " " +  response[randomarr[0+thirdc]].type);  //should do attack and health for minions here too

      //gets the description of the card
      thirdRowTds.eq(2).html($.parseHTML(response[randomarr[0+thirdc]].text));
    }

    function getSet(claz, allarr){           //This function loops through all 1500 cards 
                                            //and sets a new array of only the standard druid cards
        var resultset = [];
        allarr.forEach(function(element) {        //ensures that 
            if(element.set === "EXPERT1" || element.set ==="CORE" || element.set === "GANGS" || element.set === "ICECROWN"|| element.set === "KARA" || element.set === "LOOTAPALOOZA" || element.set === "OG" || element.set === "UNGORO"){
                if(element.type != "HERO"){     //makes sure none of the heros get counted as cards
                    if(element.cardClass === claz || element.cardClass === "NEUTRAL"){
                        resultset.push(element);
                    }
                }
            }
        });
        return resultset;

        /*
        var resultset = [];
        allarr.forEach(function(element) {        //ensures that 
            if(element.set === "EXPERT1" || element.set ==="CORE" || element.set === "GANGS" || element.set === "ICECROWN"|| element.set === "KARA" || element.set === "LOOTAPALOOZA" || element.set === "OG" || element.set === "UNGORO"){
                if(element.type != "HERO"){     //makes sure none of the heros get counted as cards
                  resultset.push(element);
                }
            }
        });
        return resultset;
        */
    }
