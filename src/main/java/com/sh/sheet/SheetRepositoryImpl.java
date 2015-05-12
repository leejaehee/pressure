/*
 * Copyright (C) 2015 Bahamas Project (http://www.opencloudengine.org).
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
package com.sh.sheet;

import com.sh.repository.PersistentRepositoryImpl;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Repository
public class SheetRepositoryImpl extends PersistentRepositoryImpl<Map, Map> implements SheetRepository {

    @Autowired
    public SheetRepositoryImpl(SqlSessionTemplate sqlSessionTemplate) {
        super.setSqlSessionTemplate(sqlSessionTemplate);
    }

    @Override
    public String getNamespace() {
        return this.NAMESPACE;
    }

    @Override
    public Map selectByPSVNo(String PSVNo) {
        return this.getSqlSessionTemplate().selectOne(this.getNamespace() + ".selectByPSVNo", PSVNo);
    }

    @Override
    public List selectPSVList() {
        return this.getSqlSessionTemplate().selectList(this.getNamespace() + ".selectPSVList");
    }

    @Override
    public boolean createSheet(String psvNo) {
        return this.getSqlSessionTemplate().insert(this.getNamespace() + ".createSheet", psvNo) > 0;
    }
}
