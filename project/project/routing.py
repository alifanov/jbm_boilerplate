from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from blog.routing import websocket_urlpatterns

app = ProtocolTypeRouter(
    {"websocket": AuthMiddlewareStack(URLRouter(websocket_urlpatterns))}
)

