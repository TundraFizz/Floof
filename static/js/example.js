// var renderer = PIXI.auto DetectRenderer(0, 0, {backgroundColor:0xfbfffd});
var renderer = PIXI.autoDetectRenderer(0, 0);
Calculate();
$("#container").append(renderer.view);
// renderer.view.style.position = "absolute";
var stage = new PIXI.Container();

var c=document.getElementsByTagName("canvas")[0];
console.log(c);
// var ctx=c.getContext("2d");
// ctx.fillStyle="#FF0000";

PIXI.loader
  .add("/animated.json")
  .load(onAssetsLoaded);

function onAssetsLoaded(){
  var eeveeTextures = [];

  for(var i = 0; i < 90; i++){
     var texture = PIXI.Texture.fromFrame("Eevee " + (i+1) + ".png");
     eeveeTextures.push(texture);
  }

  var eevee = new PIXI.extras.MovieClip(eeveeTextures);
  eevee.position.x = 0;
  eevee.position.y = 0;
  eevee.anchor.x   = 0;
  eevee.anchor.y   = 0;
  eevee.gotoAndPlay(0);
  // stage.addChild(eevee);
  requestAnimationFrame(animate);

  // Mouse, Touch Screens, and prevent right-click menu
  $(renderer.view).mousedown(function(){MouseDown();});
  document.addEventListener("touchstart", MouseDown, true);
  $("body").on("contextmenu", "canvas", function(e){return false;});
}

function animate(){
  renderer.render(stage);
  requestAnimationFrame(animate);
}

function Calculate(){
  var width  = $(window).width();
  var height = $(window).height();

  $("#container").css("width",  width);
  $("#container").css("height", height);

  if(width  < height) height = width;
  else if(height < width) width = height;

  renderer.view.style.width  = width  + "px";
  renderer.view.style.height = height + "px";
}

$(window).resize(function(){
  Calculate();
});

function MouseDown(event){

}
