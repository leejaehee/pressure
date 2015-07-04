/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.sh.repository;

public abstract class PersistentRepositoryImpl<D, P> extends DefaultSqlSessionDaoSupport implements PersistentRepository<D, P> {

    public abstract String getNamespace();

    @Override
    public int insert(D object) {
        return this.getSqlSessionTemplate().insert(this.getNamespace() + ".insert", object);
    }

    @Override
    public int update(D object) {
        return this.getSqlSessionTemplate().update(this.getNamespace() + ".update", object);
    }

    @Override
    public int delete(P identifier) {
        return this.getSqlSessionTemplate().delete(this.getNamespace() + ".delete", identifier);
    }

    @Override
    public D select(P identifier) {
        return this.getSqlSessionTemplate().selectOne(this.getNamespace() + ".select", identifier);
    }

    @Override
    public boolean exists(P identifier) {
        return (Integer) this.getSqlSessionTemplate().selectOne(this.getNamespace() + ".exist", identifier) > 0;
    }
}