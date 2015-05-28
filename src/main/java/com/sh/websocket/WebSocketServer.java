package com.sh.websocket;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.LinkedList;

@ServerEndpoint(value = "/websocket/{client-id}")
public class WebSocketServer {

    private static final LinkedList<Session> clients = new LinkedList<Session>();

    @OnOpen
    public void onOpen(Session session) {
        clients.add(session);
    }

    @OnMessage
    public void onMessage(String message, @PathParam("client-id") String clientId) {
        for (Session client : clients) {
            try {
                client.getBasicRemote().sendText(message);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    @OnClose
    public void onClose(Session peer) {
        clients.remove(peer);
    }
}