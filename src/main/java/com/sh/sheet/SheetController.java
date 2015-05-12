package com.sh.sheet;

import com.sh.rest.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/sheet")
public class SheetController {

    @Autowired
    SheetService sheetService;

    @RequestMapping("/get")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response get(@RequestParam String PSVNo) {
        Response response = new Response();
        Map sheet = sheetService.selectByPSVNo(PSVNo);
        response.setSuccess(true);
        response.getMap().putAll(sheet);
        return response;
    }

    @RequestMapping("/list")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public String list() {
        List sheet = sheetService.selectPSVList();
        String result = "{\"list\":[";
        for (Object object : sheet) {
            result += "{\"psvNo\":\"" + object.toString() + "\"},";
        }

        result = result.substring(0, result.length() - 1);
        result = result + "]}";
        return result;
    }

    @RequestMapping("/create")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public boolean create(@RequestParam String PSVNo) {
        boolean created = sheetService.createSheet(PSVNo);
        return created;
    }

}