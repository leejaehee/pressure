package com.sh.history;

import com.sh.model.History;

import java.util.List;
import java.util.Map;

public interface HistoryService {
    boolean createHistory(Map map);

    boolean createSetHistory(Map map);

    boolean updateSetHistory(Map map);
}
