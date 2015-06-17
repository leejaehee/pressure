package com.sh.serial;

import java.io.*;
import javax.comm.*;

public class SerialEcho implements SerialPortEventListener {
    static CommPortIdentifier portId;
    BufferedReader br;
    BufferedWriter bw;
    String echoMsg;
    SerialPort serialPort;

    public SerialEcho(String port) {
        try {
            portId = CommPortIdentifier.getPortIdentifier(port);
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
                byte[] readBuffer = new byte[20];
                try {
                    echoMsg = br.readLine();
                    String[] split = echoMsg.split(" ");
                    if (echoMsg != null && split.length > 0) {
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