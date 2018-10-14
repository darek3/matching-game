let allCards=["fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube",
"fa-leaf","fa-bicycle","fa-bomb","fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube",
"fa-leaf","fa-bicycle","fa-bomb"]

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}


// shuffle cards, clears the deck html and builds new one
function newDeck(){
    shuffle(allCards);
    $(".deck").empty();
    allCards.forEach(function(element){
         $(".deck").append($('<li class="card"><i class="fa '+element+'"></i></li>'));
  });
}

newDeck();

// restarts the game
function restart(){
     $(".restart").on("click",function(){window.location.reload(true)});
  }

restart();

let open=[];
let countToWin=0;
let movesCounter=0;
let clicks=0;

//event listener for a card
$(".card").on("click", function(){
         $(this).addClass("open show").css("pointer-events","none");

        if(open.length<1){
           open.push(this);
           clicks++
        }else if(open.length>0){
                lastAdded=open.slice(-1)[0];
                if(this.innerHTML===lastAdded.innerHTML){
                    clicks++
                    countToWin++;      //increases when cards match. 8 matches ends the game.
                    $(this).addClass("match");
                    $(lastAdded).addClass("match");
                    open.pop();
                }else{
                    clicks++
                    setTimeout(function(){
                    $(this).removeClass("open show").css("pointer-events","");
                    $(lastAdded).removeClass("open show").css("pointer-events","");
                    open.pop()}.bind(this),400);
                }
           starsRating();
           moves();
       }
       endGameModal()
       if(clicks===1){
         time();
       }
});

//displays number of moves
function moves(){
   if((clicks>1)&&(clicks%2===0)){
       movesCounter++;
       $(".moves").text("Moves: "+movesCounter);
     }
}

//displays star rating
function starsRating(){
    if(movesCounter===10){
       $(".stars li:last").remove();
    }else if(movesCounter===20){
       $(".stars li:last").remove();
    }
}


let clock;
//starts the timer and updates the time
function time(){
   sec=0;
   min=0;
   clock=setInterval(function(){
           sec++;
           if(sec===60){
              min++;
              sec=0;
           }
    $("#actual-time").text(min+" mins "+sec+" secs")
    },1000);
}



//modal that pop ups at the end of the game
function endGameModal(){
     if(countToWin===8){
        clearInterval(clock);  //timer stops when all cards are matched.
        star=$(".stars").clone();
        finalTime=$("#actual-time").clone();
        $(".modal").css("display","block");
        $("#results-moves").text(movesCounter);
        $("#results-stars").append(star);
        $("#results-time").append(finalTime);
        $("#yes").on("click", function(){
             window.location.reload(true);
        });
        $("#no").on("click",function(){
             $(".modal").css("display","none");
        });
     }
}

//closes the modal
let close=()=>{
        $(".close").on("click",function(){
             $(".modal").css("display","none")
        })
      }

close();
