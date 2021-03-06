//***************************
//    ASSIGNMENT
//Ajax call from client side app
//One person at a time on the DOM
//22 index points
//1st person should be in a different style
//next and previous button
//person should display Name, Github link, and shoutout

//*********************************
//WALKTHROUGH HOW I WILL DO IT
//********************************
//create an ajax function to  get data
//once data is collected send through carousel function
//


var zetaInfo=[];
var indexTracker = 0;




$(document).ready(function(){
    getData();

    console.log(indexTracker);

    //createContent();
    //

    //console.log(zetaArray);

});

function createCarousel(data){
   $("#zeta").append("<div class='main'></div>");
    var $el = $("#zeta").children().last();

    createIndexPoints(data,$el);
    createNavButtons($el);
}

function nextSlide(){
   indexTracker++;
    if(indexTracker >= zetaInfo.length){
       indexTracker = 0;
    };

    updateIndexPoints();
    updateContent();
}

function prevSlide(){
    indexTracker--;
   if(indexTracker < 0){
        indexTracker = zetaInfo.length - 1;
    };

    updateIndexPoints();

    updateContent();

}

function createNavButtons($el){
    $el.append("<div id='next' class='nav-button btn-primary'>Next</div>");
    $el.prepend("<div id='prev' class='nav-button btn-primary'>Prev</div>");


}

function createIndexPoints(data, $el){
    for(var i = 0; i < data.length; i++){
        console.log(zetaInfo);
        $el.append("<div class='index-point' id='index"+i+"'></div>");
    };
}

function updateIndexPoints(){
    for(var i = 0; i < zetaInfo.length; i++){
        $("#index" + i).removeClass("index-point-active");
        if(i == indexTracker){
          $("#index" + i).addClass("index-point-active");
        };
    };
}


function createContent() {

    $("#displayInfo").append(zetaInfo[indexTracker]);

    var el = "<div class='teamMemberDisplay"+[indexTracker]+" well'>" +
        "<div>Name:" + zetaInfo[indexTracker].name + "</div>" +
        "<div>Github: <a href='" + zetaInfo[indexTracker].github + "'>" + zetaInfo[indexTracker].github + "</a></div>" +
        "<div>Shout Out:' " + zetaInfo[indexTracker].shoutout + "'</div>"

    "</div>";
    $("#displayInfo").append(el);
}

function updateContent(){
    for (var i=0; i<zetaInfo.length;i++){
        $(".teamMemberDisplay"+[i] ).remove();
        if(i== indexTracker){
            createContent();
        };
    };
}

    function getData(){
        $.ajax({
            type: "GET",
            url : "/data",
            success: function(data){
                zetaInfo=data.zeta;
                createCarousel(zetaInfo);
                createContent( );

                updateIndexPoints();
                $("#next").on('click', nextSlide);
                $("#prev").on('click', prevSlide);

                console.log("round trip complete");
            }
        });
    }







//need to correlate the array with the given button
// appending  it