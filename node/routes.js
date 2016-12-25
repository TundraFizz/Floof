module.exports = function(app){
  const fs = require("fs");

  ///////////
  // Index //
  ///////////
  app.get("/", function(req, res){
    var files = {};
    var fileList = fs.readdirSync("static/img");

    for(f in fileList){
      var fileName = fileList[f];
      if(fileName.substring(fileList[f].length - 5,
                            fileList[f].length) == ".json"){

        var jsonFile = "static/img/" + fileList[f];
        var data = JSON.parse(fs.readFileSync(jsonFile, "utf8"));
        var obj = {};
        obj["speed"]  = data["meta"]["speed"];
        obj["frames"] = data["meta"]["size"];
        files[fileName] = obj;
      }
    }

    res.render("index.ejs", {files: files});
  });

  //////////
  // Fizz //
  //////////
  app.get("/fizz", function(req, res){
    res.render("fizz.ejs");
  });

  app.get("/final", function(req, res){
    res.render("final.ejs");
  });
}
