var renderer = PIXI.autoDetectRenderer(800, 600);
document.body.appendChild(renderer.view);

console.log("Project's name is: " + testing);
console.log(files);

var path = "static/img/";
// Find all .json files in path
console.log("====================");

var stage = new PIXI.Container(); // Create the stage
var loader = PIXI.loader;
loader.add("static/img/image001.json");
loader.add("static/img/image004.json");
loader.once("complete", onAssetsLoaded);
loader.load();

function onAssetsLoaded()
{
  var frames1 = [];
  var frames2 = [];
  
  for(var i = 0; i < 2; i++) frames1.push(PIXI.Texture.fromFrame("image001-" + parseInt(i)));
  for(var i = 0; i < 8; i++) frames2.push(PIXI.Texture.fromFrame("image004-" + parseInt(i)));
  
  var movie1 = new PIXI.extras.MovieClip(frames1);
  var movie2 = new PIXI.extras.MovieClip(frames2);
  
  // MovieClip inherits all the properties of a PIXI sprite,
  // so you can change its position, its anchor, mask it, etc
  movie1.position.set(200);
  movie2.position.set(400);
  
  movie1.anchor.set(0.5);
  movie1.animationSpeed = 0.3;
  movie2.anchor.set(0.5);
  movie2.animationSpeed = 0.3;
  
  movie1.play();
  movie2.play();
  
  stage.addChild(movie1);
  stage.addChild(movie2);
  
  animate();
}

function animate()
{
  // Render the stage container
  renderer.render(stage);
  requestAnimationFrame(animate);
}
