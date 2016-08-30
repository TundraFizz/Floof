import os
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
    
    data = {}
    
    for x in range(0, frames):
        
        data["frames"] = "{}-{}".format(name, x)
        print(data["frames"])
    
    
    
    print("===========================================")


print("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n")
print("================== START ==================")
init()
