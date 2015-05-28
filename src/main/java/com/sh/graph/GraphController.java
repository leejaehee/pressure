package com.sh.graph;

import com.sh.history.HistoryService;
import com.sh.rest.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.Map;

@Controller
@RequestMapping("/graph")
public class GraphController {

    @Autowired
    HistoryService historyService;

    @Autowired
    PaintGraph paintGraph;

    @RequestMapping("/start")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response start(@RequestBody Map params) {
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
        paintGraph.setName(params.get("testId").toString());
        if (paintGraph.getState().name().equals("TIMED_WAITING")) {
            paintGraph.resume();
        } else {
            paintGraph.start();
        }
        response.setSuccess(setHistory && history);
        return response;
    }

    @RequestMapping("/stop")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response stop() {
        Response response = new Response();

        paintGraph.suspend();

        response.setSuccess(true);
        return response;
    }

    @RequestMapping("/resume")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response resume() {
        Response response = new Response();

        paintGraph.resume();

        response.setSuccess(true);
        return response;
    }
}