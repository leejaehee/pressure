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
        if (params.get("testId") == null) {
            response.setError("TestId is not available.");
            response.setSuccess(false);
            return response;
        }

        if (params.get("portConf") == null) {
            response.setError("PortConf is not available.");
            response.setSuccess(false);
            return response;
        }

        if (params.get("baudrateConf") == null) {
            response.setError("BaudrateConf is not available.");
            response.setSuccess(false);
            return response;
        }

        if (params.get("scanTimeConf") == null) {
            response.setError("ScanTimeConf is not available.");
            response.setSuccess(false);
            return response;
        }

        paintGraph.setTestId(params.get("testId").toString());
        paintGraph.setPort(params.get("portConf").toString());
        paintGraph.setBaudRate(Integer.parseInt(params.get("baudrateConf").toString()));
        paintGraph.setScanTime(Integer.parseInt(params.get("scanTimeConf").toString()));

        if ("TIMED_WAITING".equals(paintGraph.getState().name())) {
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

//        paintGraph.interrupt();
        paintGraph.suspend();

        response.setSuccess(true);
        return response;
    }

    @RequestMapping("/save/result")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response save(@RequestBody Map params) {
        Response response = new Response();
        response.setSuccess(historyService.updateHistory(params));
        return response;
    }
}