$("h1").addClass("big-title margin-50")

$("h1").text("goodbye");
// $("button").text("don't click me")
$("button").html("<em>noo<em/>")

$("a").attr("href","https://www.yahoo.com");

$("button").click(function(){
    $("h1").css("color","cyan");
}); 


$(document).keydown(function(event){
    $("h1").text(event.key);
});

$("button").on("click",function(){
    $("h1").slideToggle()
});

$("button").on("click",function(){
    $("h1").slideUp().slideDown().animate({opacity:0.5})
});