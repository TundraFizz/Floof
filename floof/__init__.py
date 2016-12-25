from pyramid.config import Configurator


def main(global_config, **settings):
    config = Configurator(settings=settings)
    config.include("pyramid_jinja2")
    config.add_static_view("static", "static")
    config.add_static_view(".well-known/acme-challenge", "/home/ec2-user/floof/floof/.well-known/acme-challenge")
    config.add_route("index", "/")
    config.scan()
    return config.make_wsgi_app()
