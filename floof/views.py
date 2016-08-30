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
            files[f] = {}
            files[f]["speed"] = 0.3
            files[f]["frames"] = 2

    return {"project": "Floof", "files": json.dumps(files)}
