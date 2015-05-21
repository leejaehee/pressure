package com.sh.test;


import com.sh.sheet.SheetRepository;
import com.sh.sheet.SheetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class TestServiceImpl implements TestService {

    @Autowired
    SheetRepository sheetRepository;
}
