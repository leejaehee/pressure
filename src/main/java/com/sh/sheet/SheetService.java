package com.sh.sheet;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public interface SheetService {
    public Map<String, Object> selectByPSVNo(String PSVNo);

    boolean deleteByPSVNo(String PSVNo);

    List selectPSVList();

    boolean createSheet(String psvNo);

    boolean updateByPSVNo(Map map);
}
