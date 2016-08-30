var renderer = PIXI.autoDetectRenderer(800, 600);
document.body.appendChild(renderer.view);

var stage = new PIXI.Container(); // Create the stage
var loader = PIXI.loader;         // Create the loader

var path = "static/img/";

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
  var movies = [];
  console.log(files)
  // Select five random images to display
  var len = Object.keys(files).length
  
  for(var i = 0; i < 5; i++)
  {
    var obj = RandomProperty(files);
    console.log(obj);
    
    var name   = obj.substring(0, obj.length-5);
    var fCount = files[obj]["frames"];
    var speed  = files[obj]["speed"];
    
    var sprite = [];
    
    for(var j = 0; j < fCount; j++)
      sprite.push(PIXI.Texture.fromFrame(name + "-" + parseInt(j)));
    
    movies.push(new PIXI.extras.MovieClip(sprite));
  }
  
  //for(var key in files)
  //{
  //  var name   = key.substring(0, key.length-5);
  //  var fCount = files[key]["frames"];
  //  var speed  = files[key]["speed"];
  //  
  //  var sprite = [];
  //  
  //  for(var i = 0; i < fCount; i++)
  //    sprite.push(PIXI.Texture.fromFrame(name + "-" + parseInt(i)));
  //  
  //  movies.push(new PIXI.extras.MovieClip(sprite));
  //}
  
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
