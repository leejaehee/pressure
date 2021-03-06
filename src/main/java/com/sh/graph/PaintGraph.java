package com.sh.graph;

import com.sh.test.TestService;
import com.sh.websocket.WebSocketClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.comm.CommPortIdentifier;
import javax.comm.SerialPort;
import javax.comm.SerialPortEvent;
import javax.comm.SerialPortEventListener;
import javax.websocket.ContainerProvider;
import javax.websocket.Session;
import javax.websocket.WebSocketContainer;
import java.io.*;
import java.net.URI;
import java.text.SimpleDateFormat;
import java.util.*;

@Component
public class PaintGraph extends Thread implements SerialPortEventListener {

    public Session session;
    CommPortIdentifier portId;
    BufferedReader br;
    BufferedWriter bw;
    String echoMsg;
    SerialPort serialPort;

    String testId;
    String port;
    int baudRate;
    int scanTime;

    public void setTestId(String testId) {
        this.testId = testId;
    }

    public void setPort(String port) {
        this.port = port;
    }

    public void setBaudRate(int baudRate) {
        this.baudRate = baudRate;
    }

    public void setScanTime(int scanTime) {
        this.scanTime = scanTime;
    }

    @Autowired
    TestService testService;

    public void connect() {
        try {
            WebSocketContainer container = ContainerProvider.getWebSocketContainer();
            session = container.connectToServer(WebSocketClient.class, URI.create("ws://localhost:8080/websocket/desktop-client"));
                portId = CommPortIdentifier.getPortIdentifier(this.port);
                serialPort = (SerialPort) portId.open("SerialEcho", 100);
                serialPort.addEventListener(this);
                serialPort.notifyOnDataAvailable(true);
                serialPort.setSerialPortParams(this.baudRate, SerialPort.DATABITS_8, SerialPort.STOPBITS_1, SerialPort.PARITY_NONE);
                serialPort.setRTS(true);
                serialPort.setDTR(true);
                br = new BufferedReader(new InputStreamReader(serialPort.getInputStream()));
                bw = new BufferedWriter(new OutputStreamWriter(serialPort.getOutputStream()));
        } catch (Exception e) {
            this.start();
        }
    }

    @Override
    public void run() {
        try {
            this.connect();
            while (!Thread.currentThread().isInterrupted()) {
                bw.write("p000");
                bw.newLine();
                bw.flush();
                Thread.sleep(this.scanTime);
            }
        } catch (Exception e) {
            this.start();
        }
    }

    public void serialEvent(SerialPortEvent event) {
        switch (event.getEventType()) {
            case SerialPortEvent.OUTPUT_BUFFER_EMPTY:
                break;
            case SerialPortEvent.DATA_AVAILABLE:
                try {
                    echoMsg = br.readLine(); // +0.0000 1 Z
                    String[] split = echoMsg.split(" ");
                    if (echoMsg != null && split.length > 0) {
                        long currentTimeMillis = System.currentTimeMillis();
                        Map map = new HashMap();
                        map.put("testId", this.testId);
                        map.put("testTime", currentTimeMillis);
                        map.put("testValue", split[0]);
//                        testService.createTest(map);
                        this.session.getBasicRemote().sendText(currentTimeMillis + "," + split[0]);
                    }
                    bw.write(echoMsg, 0, echoMsg.length());
                    bw.newLine();
                    bw.flush();
                } catch (IOException e) {
                }
                break;
        }
    }

    public List portList(){
        List list = new ArrayList();
        Enumeration portIdentifiers = CommPortIdentifier.getPortIdentifiers();
        while(portIdentifiers.hasMoreElements()){
            Map map = new HashMap();
            map.put("portConf", ((CommPortIdentifier) portIdentifiers.nextElement()).getName());
            list.add(map);
        }
        return list;
    }
}
