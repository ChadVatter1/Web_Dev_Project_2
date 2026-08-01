document
.getElementById("shuffle")
.onclick=function(){

    shuffle();

};



document
.querySelectorAll("[data-mode]")
.forEach(button=>{


    button.onclick=function(){


        changeMode(
            button.dataset.mode
        );


    };


});