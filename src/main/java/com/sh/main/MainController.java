package com.sh.main;

import com.sh.serial.TwoWaySerialComm;
import jssc.SerialPortList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class MainController {

    @Autowired
    TwoWaySerialComm twoWaySerialComm;

    @RequestMapping("/")
    public String printWelcome(ModelMap model) {
        return "index";
    }

    @RequestMapping("/hello")
    public String printWelcome(ModelMap model,
                               @RequestParam String portName) {
        System.out.println(model);
        System.out.println(portName);
        model.addAttribute("message", "Hello world!");
        return "hello";
    }

    @RequestMapping("/comm")
    public String communicate(ModelMap model,
                              @RequestParam String port) {
        String result = "";

        String[] portNames = SerialPortList.getPortNames();

        for (int i = 0; i < portNames.length; i++) {
            result += portNames[i] + "\n";
            System.out.println(portNames[i]);
        }

        twoWaySerialComm.main(port);

        model.addAttribute("message", result);
        return "hello";
    }

}
