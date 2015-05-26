package com.sh.history;


import com.sh.model.History;
import com.sh.sheet.SheetRepository;
import com.sh.sheet.SheetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class HistoryServiceImpl implements HistoryService {

    @Autowired
    HistoryRepository historyRepository;

    @Override
    public boolean createHistory(Map map) {
        return historyRepository.createHistory(map);
    }

    @Override
    public boolean createSetHistory(Map map) {
        return historyRepository.createSetHistory(map);
    }

    @Override
    public boolean updateSetHistory(Map map) {
        return historyRepository.updateSetHistory(map);
    }
}
