package com.sh.graph;

import com.sh.serial.SerialEcho;
import com.sh.test.TestService;
import com.sh.websocket.WebSocketClient;
import com.sh.websocket.WebSocketServer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.comm.*;
import javax.websocket.ContainerProvider;
import javax.websocket.DeploymentException;
import javax.websocket.Session;
import javax.websocket.WebSocketContainer;
import java.io.*;
import java.net.URI;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class PaintGraph extends Thread implements SerialPortEventListener {

    public Session session;
    CommPortIdentifier portId;
    BufferedReader br;
    BufferedWriter bw;
    String echoMsg;
    SerialPort serialPort;

    @Autowired
    TestService testService;

    public void connect() {
        try {
            WebSocketContainer container = ContainerProvider.getWebSocketContainer();
            String uri = "ws://localhost:8080/websocket/desktop-client";
            System.out.println("Connecting to " + uri);
            session = container.connectToServer(WebSocketClient.class, URI.create(uri));
            try {
                portId = CommPortIdentifier.getPortIdentifier("COM3");
                serialPort = (SerialPort) portId.open("SerialEcho", 2000);
                serialPort.addEventListener(this);
                serialPort.notifyOnDataAvailable(true);
                serialPort.setSerialPortParams(19200,        // Baud Rate
                        SerialPort.DATABITS_8,                // Data Bits
                        SerialPort.STOPBITS_1,                // Stop Bits
                        SerialPort.PARITY_NONE);             // Parity
                serialPort.setRTS(true);
                serialPort.setDTR(true);
                br = new BufferedReader(new InputStreamReader(serialPort.getInputStream()));
                bw = new BufferedWriter(new OutputStreamWriter(serialPort.getOutputStream()));
            } catch (Exception e) {
                e.printStackTrace();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void run() {
        try {
            this.connect();

            while (true) {
                getData();
                Thread.sleep(970);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void getData() {
        try {
            bw.write("p000");
            bw.newLine();
            bw.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void serialEvent(SerialPortEvent event) {
        switch (event.getEventType()) {
            case SerialPortEvent.BI:      // Break interrupt
            case SerialPortEvent.OE:     // Overrun error
            case SerialPortEvent.FE:      // Framing error
            case SerialPortEvent.PE:     // Parity error.
            case SerialPortEvent.CD:     // Carrier detect
            case SerialPortEvent.CTS:   // Clear to send
            case SerialPortEvent.DSR:   // Data set ready
            case SerialPortEvent.RI:      // Ring indicator.
            case SerialPortEvent.OUTPUT_BUFFER_EMPTY:
                break;             // Output buffer is empty

            case SerialPortEvent.DATA_AVAILABLE:
                try {
                    echoMsg = br.readLine();
                    String[] split = echoMsg.split(" ");
                    if (echoMsg != null && split.length > 0) {
                        Map map = new HashMap();
                        long currentTimeMillis = System.currentTimeMillis();
                        map.put("testId", this.getName());
                        map.put("testTime", currentTimeMillis);
                        map.put("testValue", split[0]);
                        testService.createTest(map);
                        this.session.getBasicRemote().sendText(currentTimeMillis + "," + split[0]);
                        System.out.println(split[0]);
                    }
                    bw.write(echoMsg, 0, echoMsg.length());
                    bw.newLine();
                    bw.flush();
                } catch (IOException e) {
                }
                break;
        }
    }
}
