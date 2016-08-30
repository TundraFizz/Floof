var renderer = PIXI.autoDetectRenderer(800, 600);
document.body.appendChild(renderer.view);

console.log("Project's name is: " + testing);
console.log(files);

var path = "static/img/";

var stage = new PIXI.Container(); // Create the stage
var loader = PIXI.loader;         // Create the loader

for(var key in files)
  loader.add(path + key);

loader.once("complete", onAssetsLoaded);
loader.load();

function onAssetsLoaded()
{  
  var movies = [];
  
  for(var key in files)
  {
    var name   = key.substring(0, key.length-5);
    var fCount = files[key]["frames"];
    var speed  = files[key]["speed"];
    
    var sprite = [];
    
    for(var i = 0; i < fCount; i++)
      sprite.push(PIXI.Texture.fromFrame(name + "-" + parseInt(i)));
    
    movies.push(new PIXI.extras.MovieClip(sprite));
  }
  
  // MovieClip inherits all the properties of a PIXI sprite,
  // so you can change its position, its anchor, mask it, etc.
  
  for(var i = 0; i < movies.length; i++)
  {
    var x = Math.floor(Math.random() * 700)
    var y = Math.floor(Math.random() * 500)
    movies[i].position.set(x, y);
  }
  
  for(var i = 0; i < movies.length; i++)
  {
    movies[i].anchor.set(0.5);
    movies[i].animationSpeed = 0.3;
  }
  
  for(var i = 0; i < movies.length; i++)
    movies[i].play();
  
  for(var i = 0; i < movies.length; i++)
    stage.addChild(movies[i]);
  
  animate();
}

function animate()
{
  // Render the stage container
  renderer.render(stage);
  requestAnimationFrame(animate);
}
