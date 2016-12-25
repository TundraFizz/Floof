var windowWidth  = window.innerWidth;
var windowHeight = window.innerHeight;

var canvas = document.getElementsByTagName("canvas")[0];
var renderer = new PIXI.autoDetectRenderer(windowWidth, windowHeight, {view: canvas, transparent: true, preserveDrawingBuffer: true}, true);

document.body.appendChild(renderer.view);

var stage = new PIXI.Container(); // Create the stage

var texture = PIXI.Texture.fromImage("Fizz.png"); // Create texture from image path
var fizz    = new PIXI.Sprite(texture);           // Create sprite using a texture
var data    = {x: windowWidth/2, y: windowHeight/2, w: windowWidth, h: windowHeight, down: BtnDownFizz};
FizzFactory(fizz, data);

Animate(); // Start animating

var testing = false;

function FizzFactory(obj, data)
{
  // Center sprite's anchor point
  obj.anchor.x = 0.5;
  obj.anchor.y = 0.5;

  // Assign position and size
  obj.position.x = data.x; obj.width  = data.w;
  obj.position.y = data.y; obj.height = data.h;

  obj.interactive = true; // Make interactive

  obj.on("mousedown",  data.down)
     .on("touchstart", data.down);

  if     (obj.width  > obj.height) obj.width  = obj.height;
  else if(obj.height > obj.width)  obj.height = obj.width;

  stage.addChild(obj);
}

function Animate()
{
  CheckIfWindowResized();

  requestAnimationFrame(Animate);
  renderer.render(stage);
  testing = false;
}

function CheckIfWindowResized()
{
  if((windowWidth != window.innerWidth) || (windowHeight != window.innerHeight))
  {
    windowWidth  = window.innerWidth;
    windowHeight = window.innerHeight;

    fizz.position.x = windowWidth  / 2;
    fizz.position.y = windowHeight / 2;

    fizz.width  = windowWidth;
    fizz.height = windowHeight;

    if     (fizz.width  > fizz.height) fizz.width  = fizz.height;
    else if(fizz.height > fizz.width)  fizz.height = fizz.width;

    renderer.resize(windowWidth, windowHeight);
  }
}

function BtnDownFizz()
{
  if(GetAlpha())
  {
    document.location.href = "http://www.tundrafizz.com/pax";
  }
}

function GetAlpha()
{
  var mouse = renderer.plugins.interaction.mouse.global;
  var c     = document.getElementsByTagName("canvas")[0];
  var ctx   = c.getContext("webgl");

  // The preferred renderer is WebGL
  if(ctx)
  {
    var pixelData = new Uint8Array(4);                                              // Create array needed to store a pixel
    ctx.readPixels(mouse.x, mouse.y, 1, 1, ctx.RGBA, ctx.UNSIGNED_BYTE, pixelData); // Read pixel at mouse position
    return (pixelData[3] >= 128);                                                   // Return pixel collision
  }
  else
  {
    ctx = c.getContext("2d");                               // Use 2D Canvas if WebGL is unavailable
    var imgData = ctx.getImageData(mouse.x, mouse.y, 1, 1); // Read pixel at mouse position
    return imgData.data[3] >= 128;                          // Return pixel collision
  }
}


$("body").on("contextmenu", "canvas", function(e){return false;});
