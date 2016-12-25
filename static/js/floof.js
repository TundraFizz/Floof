// Eevee sounds
// https://www.youtube.com/watch?v=pN55McDzRgo

var counter = 0;
var eeveeTexture;
var tex;
var spriteSheet;
var collection;
var width  = 800;
var height = 600;

// $(document).ready(onReady);
PIXI.loader
    .add("animated.json")
    .load(onAssetsLoaded);

function onAssetsLoaded(){
  renderer = PIXI.autoDetectRenderer(width, height, {backgroundColor:0x000001});
  stage = new PIXI.Stage(0x000000);

  document.body.appendChild(renderer.view);
  renderer.view.style.position = "absolute";

  requestAnimationFrame(update);

  //                                           Scale X/Y   Rot    UVs    Alpha
  container = new PIXI.ParticleContainer(100, [true, true, false, false, false]);
  stage.addChild(container);

  // eeveeTexture = new PIXI.Texture.fromImage("happy_eevee.gif");
  // tex = new PIXI.Texture(eeveeTexture.baseTexture, PIXI.math.Rectangle(0, 0, 512, 512));

  // spriteSheet = new PIXI.Texture.fromImage("animated.png");
  // collection = [];
  // for(var i = 0; i < 9; i++){ // There are 90 animation frames in the spritesheet
  //   for(var j = 0; j < 10; j++){
  //     var yolo = new PIXI.Texture(spriteSheet.baseTexture, new PIXI.math.Rectangle(j*512, i*512, 512, 512));
  //     // var yolo = new PIXI.Texture(PIXI.BaseTextureCache["animated.png"], new PIXI.math.Rectangle(j*512, i*512, 512, 512));

  //     // var yolo = new PIXI.Texture(PIXI.BaseTextureCache["spritesheet.png"], new PIXI.Rectangle(x, y,w, h));
  //     collection.push(yolo);
  //   }
  // }

  // create an array to store the textures
  var explosionTextures = [];

  for(var i = 1; i <= 90; i++){
    var texture = PIXI.Texture.fromFrame("Eevee " + i + ".png");
    explosionTextures.push(texture);
  }

  // Mouse, Touch Screens, and prevent right-click menu
  $(renderer.view).mousedown(function(){MouseDown();});
  document.addEventListener("touchstart", MouseDown, true);
  $("body").on("contextmenu", "canvas", function(e){return false;});
  // Add Eevee
  // var obj = new PIXI.Sprite(tex);
  // obj.x = width  / 2;
  // obj.y = height / 2;
  // obj.anchor.x = 0.5;
  // obj.anchor.y = 0.5;
  // container.addChild(obj);

  // Animated
  // var obj = new PIXI.Sprite(collection[10]);
  var obj = new PIXI.extras.MovieClip(explosionTextures);
  obj.x = width  / 2;
  obj.y = height / 2;
  obj.anchor.x = 0.5;
  obj.anchor.y = 0.5;
  container.addChild(obj);
}

function MouseDown(event){
  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!");
}

function update(){
  // Animate Eevee
  if(++counter == collection.length)
    counter = 0;
  container.children[0].texture = collection[counter];
  // container.children[0].texture = new PIXI.Sprite(collection[counter]);

  renderer.render(stage);
  requestAnimationFrame(update);
}

$(window).resize(function(){
  var width  = $(window).width();
  var height = $(window).height();
  renderer.view.style.width  = width  + "px";
  renderer.view.style.height = height + "px";
});
