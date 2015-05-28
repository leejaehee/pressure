package com.sh.graph;

import com.sh.test.TestService;
import com.sh.websocket.WebSocketClient;
import com.sh.websocket.WebSocketServer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.websocket.ContainerProvider;
import javax.websocket.DeploymentException;
import javax.websocket.Session;
import javax.websocket.WebSocketContainer;
import java.io.IOException;
import java.net.URI;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class PaintGraph extends Thread {

    public Session session;

    @Autowired
    TestService testService;


    public void connect() {
        WebSocketContainer container = ContainerProvider.getWebSocketContainer();

        String uri = "ws://localhost:8080/websocket/desktop-client";
        System.out.println("Connecting to " + uri);
        try {
            session = container.connectToServer(WebSocketClient.class, URI.create(uri));
        } catch (DeploymentException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void run() {
        try {
            this.connect();

            while (true) {
                Map map = new HashMap();
                Date date = new Date();
                String s = date.toString();
                map.put("testId", this.getName());
                map.put("testTime", s);
                map.put("testValue", "2");
                testService.createTest(map);
                this.session.getBasicRemote().sendText(s + ",2");
                Thread.sleep(1000);
            }
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
