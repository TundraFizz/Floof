var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.view);

var stage = new PIXI.Container(); // Create the stage
var loader = PIXI.loader;         // Create the loader

// Global variables
var path = "static/img/";
var windowWidth  = window.innerWidth;
var windowHeight = window.innerHeight;
var lastTime = Date.now();
var timeSinceLastFrame = 0;
var counter = 0;
var counterAddImage = 1000;

for(var key in files)
  loader.add(path + key);

// loader.on("progress", function(loader,res){console.log(loader);});
loader.once("complete", onAssetsLoaded);
loader.load();

function RandomProperty(obj)
{
  var keys = Object.keys(obj)
  var i = keys.length * Math.random() << 0;
  return Object.getOwnPropertyNames(obj)[i];
  
  // Gets the actual object
  // return obj[keys[ keys.length * Math.random() << 0]];
}

function onAssetsLoaded()
{
  animate();
}

function animate()
{
  CheckIfWindowResized();
  
  var now = Date.now();
  timeSinceLastFrame = now - lastTime;
  lastTime = now;
  counter += timeSinceLastFrame;
  if(counter >= counterAddImage)
  {
    // One second has passed
    counter -= counterAddImage;
    
    var movies = [];
    var obj = RandomProperty(files);
    
    var name   = obj.substring(0, obj.length-5);
    var fCount = files[obj]["frames"];
    var speed  = files[obj]["speed"];
    
    var sprite = [];
    
    for(var j = 0; j < fCount; j++)
      sprite.push(PIXI.Texture.fromFrame(name + "-" + parseInt(j)));
    
    movies.push(new PIXI.extras.MovieClip(sprite));
    
    var x = Math.floor(Math.random() * windowWidth)
    var y = Math.floor(Math.random() * windowHeight)
    movies[0].position.set(x, y);
    movies[0].anchor.set(0.5);
    movies[0].animationSpeed = 0.3;
    
    var maxSize = 250;
    var w = movies[0]._textures[0].width;
    var h = movies[0]._textures[0].width;
    var s = 1;
    if(w >= maxSize)
      s = maxSize / w;
    else if(h >= maxSize)
      s = maxSize / h;
    
    movies[0].scale.x = s;
    movies[0].scale.y = s;
    
    movies[0].play();
    stage.addChild(movies[0]);
  }
  
  // Render the stage container
  renderer.render(stage);
  requestAnimationFrame(animate);
}

function CheckIfWindowResized()
{
  if((windowWidth != window.innerWidth) || (windowHeight != window.innerHeight))
  {
    windowWidth  = window.innerWidth;
    windowHeight = window.innerHeight;
    
    renderer.resize(windowWidth, windowHeight);
  }
}
