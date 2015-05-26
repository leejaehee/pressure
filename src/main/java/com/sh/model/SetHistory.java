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
package com.sh.model;

import java.io.Serializable;
import java.util.Date;

public class SetHistory implements Serializable {

    /**
     * Serialization UID
     */
    private static final long serialVersionUID = 1;

    private long id;

    private String setHistroyId;
    private String firstHistroyId;
    private String secondHistroyId;


    public SetHistory() {
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getSetHistroyId() {
        return setHistroyId;
    }

    public void setSetHistroyId(String setHistroyId) {
        this.setHistroyId = setHistroyId;
    }

    public String getFirstHistroyId() {
        return firstHistroyId;
    }

    public void setFirstHistroyId(String firstHistroyId) {
        this.firstHistroyId = firstHistroyId;
    }

    public String getSecondHistroyId() {
        return secondHistroyId;
    }

    public void setSecondHistroyId(String secondHistroyId) {
        this.secondHistroyId = secondHistroyId;
    }

    @Override
    public String toString() {
        return "SetHistory{" +
                "id=" + id +
                ", setHistroyId='" + setHistroyId + '\'' +
                ", firstHistroyId='" + firstHistroyId + '\'' +
                ", secondHistroyId='" + secondHistroyId + '\'' +
                '}';
    }
}