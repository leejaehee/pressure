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
package com.sh.history;

import com.sh.repository.PersistentRepositoryImpl;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository
public class HistoryRepositoryImpl extends PersistentRepositoryImpl<Map, Map> implements HistoryRepository {

    @Autowired
    public HistoryRepositoryImpl(SqlSessionTemplate sqlSessionTemplate) {
        super.setSqlSessionTemplate(sqlSessionTemplate);
    }

    @Override
    public String getNamespace() {
        return this.NAMESPACE;
    }

    @Override
    public boolean createHistory(Map map) {
        return this.getSqlSessionTemplate().insert(this.getNamespace() + ".createHistory", map) > 0;
    }

    @Override
    public boolean createSetHistory(Map map) {
        return this.getSqlSessionTemplate().insert(this.getNamespace() + ".createSetHistory", map) > 0;
    }

    @Override
    public boolean updateSetHistory(Map map) {
        return this.getSqlSessionTemplate().update(this.getNamespace() + ".updateSetHistory", map) > 0;
    }

    @Override
    public boolean updateHistory(Map map) {
        return this.getSqlSessionTemplate().update(this.getNamespace() + ".updateHistory", map) > 0;
    }
}
