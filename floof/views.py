from pyramid.view import view_config
import json
import os


@view_config(route_name="index", renderer="templates/index.jinja2")
def index(request):
    files = {"Test": "hello"}
    all_files = os.listdir("floof/static/img")
    for f in all_files:
        ext = f[-5:]
        if ext == ".json":
            # files.append(f)
            pass

    return {"project": "Floof", "files": json.dumps(files)}
