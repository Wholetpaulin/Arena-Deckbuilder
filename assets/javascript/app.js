    var queryURL = "https://api.hearthstonejson.com/v1/22611/enUS/cards.collectible.json";

    $.ajax({
      url: queryURL,
      method: "GET",
    }).done(function(response) {
      
      //Here's where the function will go that fill the array appropiatly...
      var standdruid = getSet("DRUID", response);
      console.log(standdruid);

      new Vue({
        el:"#vue-app",
        data:{
          deckList: '',
          name1: 'Press Select to start',       //Could start with these empty and make seperate 9 buttons for the claz
          name2: 'Press Select to start',
          name3: 'Press Select to start'
        },
        methods:{

          populate(){
            var len = standdruid.length;
            var randomarr = [];

            for(var i = 0; i < 90; i++){
               randomarr.push(Math.floor(Math.random() * len));
            }

            this.name1 = standdruid[randomarr[0]].name;
            this.name2 = standdruid[randomarr[1]].name;
            this.name3 = standdruid[randomarr[2]].name;

            this.stats1 = standdruid[randomarr[0]].cost + " mana " + standdruid[randomarr[0]].rarity + " " + standdruid[randomarr[0]].type;
            this.stats2 = standdruid[randomarr[1]].cost + " mana " + standdruid[randomarr[0]].rarity + " " + standdruid[randomarr[0]].type;
            this.stats3 = standdruid[randomarr[2]].cost + " mana " + standdruid[randomarr[0]].rarity + " " + standdruid[randomarr[0]].type;

            this.text1 = standdruid[randomarr[0]].text;
            this.text2 = standdruid[randomarr[1]].text;
            this.text3 = standdruid[randomarr[2]].text;
          },
          //I couldn't figure out how to call "append" passing in a  parameter.. Was giving me weird output.. So I went redundant
          append1(){
            this.deckList += '<br>' + this.name1;
            this.populate();
          },

          append2(){
            this.deckList += '<br>' + this.name2;
            this.populate();
          },

          append3(){
            this.deckList += '<br>' + this.name3;
            this.populate();
          }

        }
      });
    });

    //-------------------------function definitions-------------------------

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
