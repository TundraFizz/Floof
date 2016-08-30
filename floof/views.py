from pyramid.view import view_config
import json
import os


@view_config(route_name="index", renderer="templates/index.jinja2")
def index(request):
    files = {}
    all_files = os.listdir("floof/static/img")
    for f in all_files:
        ext = f[-5:]
        if ext == ".json":
            with open("floof/static/img/" + f) as jfile:    
                data = json.load(jfile)
                files[f] = {}
                files[f]["speed"] = data["meta"]["speed"]
                files[f]["frames"] = data["meta"]["size"]

    return {"files": json.dumps(files)}
