from channels.generic.websocket import JsonWebsocketConsumer


class NotificationCunsomer(JsonWebsocketConsumer):
    groups = ['notifications', ]

    def receive_json(self, content, **kwargs):
        self.send_json(content)
