package com.sh.sheet;

import com.sh.rest.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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
    public Response get(@RequestParam String PSV_NO) {
        Response response = new Response();
        Map sheet = sheetService.selectByPSVNo(PSV_NO);
        response.setSuccess(true);
        response.getMap().putAll(sheet);
        return response;
    }

    @RequestMapping("/delete")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response delete(@RequestParam String PSV_NO) {
        Response response = new Response();
        response.setSuccess(sheetService.deleteByPSVNo(PSV_NO));
        return response;
    }

    @RequestMapping("/save")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response save(@RequestBody Map params) {
        Response response = new Response();
        response.setSuccess(sheetService.updateByPSVNo(params));
        return response;
    }

    @RequestMapping("/list")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public String list() {
        List sheet = sheetService.selectPSVList();
        String result = "{\"list\":[";
        for (Object object : sheet) {
            result += "{\"PSV_NO\":\"" + object.toString() + "\"},";
        }

        result = result.substring(0, result.length() - 1);
        result = result + "]}";
        return result;
    }

    @RequestMapping("/create")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public boolean create(@RequestParam String PSV_NO) {
        boolean created = sheetService.createSheet(PSV_NO);
        return created;
    }

}