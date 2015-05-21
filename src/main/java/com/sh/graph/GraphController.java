package com.sh.graph;

import com.sh.history.HistoryService;
import com.sh.model.History;
import com.sh.rest.Response;
import com.sh.sheet.SheetService;
import com.sh.test.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/graph")
public class GraphController {

    @Autowired
    HistoryService historyService;

    @Autowired
    TestService testService;

    @RequestMapping("/get")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response get(@RequestBody Map params) {
        Response response = new Response();
        History history = historyService.createHistory(params);
//        String testNo = testService.createTest(params);
        response.setSuccess(true);
//        response.getMap().putAll(sheet);
        return response;
    }
}