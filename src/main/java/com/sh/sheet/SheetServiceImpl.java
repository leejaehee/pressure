package com.sh.sheet;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class SheetServiceImpl implements SheetService {

    @Autowired
    SheetRepository sheetRepository;

    @Override
    public Map<String, Object> selectByPSVNo(String PSVNo) {
        return sheetRepository.selectByPSVNo(PSVNo);
    }

    @Override
    public boolean deleteByPSVNo(String PSVNo) {
        return sheetRepository.deleteByPSVNo(PSVNo);
    }

    @Override
    public List selectPSVList() {
        return sheetRepository.selectPSVList();
    }

    @Override
    public boolean createSheet(String psvNo) {
        return sheetRepository.createSheet(psvNo);
    }

    @Override
    public boolean updateByPSVNo(Map map) {
        return sheetRepository.updateSheet(map);
    }
}
