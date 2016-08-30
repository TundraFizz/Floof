import os
import json
import math
from PIL import Image


def init():
    all_files = os.listdir()
    for f in all_files:
        ext = f[-4:]
        if ext == ".png":
            export_data(f)


def export_data(file):
    with Image.open(file) as img:
        w, h = img.size
    dash = int(file.find("-"))
    frames = int(file[dash+1 : -4])
    size = math.ceil(math.sqrt(frames))
    name = file[:dash]
    print(file)
    print(name)
    print(w)
    print(h)
    print(frames)
    print(size)

    data = {"frames": {}}
    x = 0
    y = 0
    sub_width = int(w/size)
    sub_height = int(h/size)

    for i in range(0, frames):
        f = "{}-{}".format(name, i)
        data["frames"][f] = {}
        
        frame = {"x": x, "y": y, "w": sub_width, "h": sub_height}
        spriteSourceSize = {"x": 0, "y": 0}
        sourceSize = {"w": sub_width, "h": sub_height}
        trimmed = True
        rotated = False
        
        data["frames"][f]["frame"] = frame
        data["frames"][f]["spriteSourceSize"] = spriteSourceSize
        data["frames"][f]["sourceSize"] = sourceSize
        data["frames"][f]["trimmed"] = trimmed
        data["frames"][f]["rotated"] = rotated
        
        x += sub_width
        if x == w:
            x = 0
            y += sub_height

    print("===========================================")
    data["meta"] = {}
    data["meta"]["image"] = file
    data["meta"]["speed"] = 0.3
    data["meta"]["size"] = frames
    with open("{}.json".format(name), "w") as outfile:
        json.dump(data, outfile)


print("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n")
print("================== START ==================")
init()
