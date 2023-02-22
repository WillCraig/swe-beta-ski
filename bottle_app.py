import os
from bottle import default_app, run, route, static_file, redirect

@route('/')
def get_index():
    redirect("/index.html")  

@route('<filepath:path>')
def get_static(filepath):
    return static_file(filepath, root="./")
    
if "PYTHONANYWHERE_DOMAIN" in os.environ:
    application = default_app()
else:
    run(host='localhost', port=8080)