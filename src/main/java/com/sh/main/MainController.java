package com.sh.main;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class MainController {

    @RequestMapping("/")
    public String entry(ModelMap model) {
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
}
