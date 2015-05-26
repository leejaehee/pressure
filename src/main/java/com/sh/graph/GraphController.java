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
import java.util.Random;

@Controller
@RequestMapping("/graph")
public class GraphController {

    @Autowired
    HistoryService historyService;

    @RequestMapping("/create")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response create(@RequestBody Map params) {
        Response response = new Response();
        boolean setHistory;
        if ("1".equals(params.get("step").toString())) {
            params.put("fisrtHistoryId", params.get("historyId").toString());
            setHistory = historyService.createSetHistory(params);
        } else {
            params.put("secondHistoryId", params.get("historyId").toString());
            setHistory = historyService.updateSetHistory(params);
        }
        boolean history = historyService.createHistory(params);
        // start thread testId를 넘겨주고 thread에서 db로 값을 넣어주도록 시작하면 된다.

        response.setSuccess(setHistory && history);
        return response;
    }
}