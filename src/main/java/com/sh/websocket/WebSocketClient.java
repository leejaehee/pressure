package com.sh.websocket;

import javax.websocket.*;
import java.io.IOException;

@ClientEndpoint
public class WebSocketClient {
    @OnOpen
    public void onOpen(Session session) {
        try {
            session.getBasicRemote().sendText("");
        } catch (IOException ex) {
        }
    }

    @OnMessage
    public void onMessage(String message) {
        System.out.println(message);
    }

    @OnError
    public void onError(Throwable t) {
        t.printStackTrace();
    }
}
