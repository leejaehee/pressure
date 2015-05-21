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

public class History implements Serializable {

    /**
     * Serialization UID
     */
    private static final long serialVersionUID = 1;

    private long id;

    private String histroyNo;
    private String customer;
    private String testType;
    private String psvNo;
    private String fluid;
    private String serialNo;
    private String location;
    private String maker;
    private String velveType;

    private long inletSize;
    private long outletSize;

    private Date testDate;

    private float setPress;
    private float backPress;
    private float coldPress;
    private float resultSetPress;
    private float resultColdPress;
    private float resultBackPress;
    private float resultPopPress;
    private float resultLeakPress;

    private String resultOk;

    private float adjustScrew;

    private long uppering;
    private long lowering;

    private String worker;
    private String inspector;
    private String manager;

    private String confPort;
    private String confBaudrate;
    private String confSetPress;
    private String confPressUnit;
    private long testId;

    public History() {
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

    public String getHistroyNo() {
        return histroyNo;
    }

    public void setHistroyNo(String histroyNo) {
        this.histroyNo = histroyNo;
    }

    public String getCustomer() {
        return customer;
    }

    public void setCustomer(String customer) {
        this.customer = customer;
    }

    public String getTestType() {
        return testType;
    }

    public void setTestType(String testType) {
        this.testType = testType;
    }

    public String getPsvNo() {
        return psvNo;
    }

    public void setPsvNo(String psvNo) {
        this.psvNo = psvNo;
    }

    public String getFluid() {
        return fluid;
    }

    public void setFluid(String fluid) {
        this.fluid = fluid;
    }

    public String getSerialNo() {
        return serialNo;
    }

    public void setSerialNo(String serialNo) {
        this.serialNo = serialNo;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getMaker() {
        return maker;
    }

    public void setMaker(String maker) {
        this.maker = maker;
    }

    public String getVelveType() {
        return velveType;
    }

    public void setVelveType(String velveType) {
        this.velveType = velveType;
    }

    public long getInletSize() {
        return inletSize;
    }

    public void setInletSize(long inletSize) {
        this.inletSize = inletSize;
    }

    public long getOutletSize() {
        return outletSize;
    }

    public void setOutletSize(long outletSize) {
        this.outletSize = outletSize;
    }

    public Date getTestDate() {
        return testDate;
    }

    public void setTestDate(Date testDate) {
        this.testDate = testDate;
    }

    public float getSetPress() {
        return setPress;
    }

    public void setSetPress(float setPress) {
        this.setPress = setPress;
    }

    public float getBackPress() {
        return backPress;
    }

    public void setBackPress(float backPress) {
        this.backPress = backPress;
    }

    public float getColdPress() {
        return coldPress;
    }

    public void setColdPress(float coldPress) {
        this.coldPress = coldPress;
    }

    public float getResultSetPress() {
        return resultSetPress;
    }

    public void setResultSetPress(float resultSetPress) {
        this.resultSetPress = resultSetPress;
    }

    public float getResultColdPress() {
        return resultColdPress;
    }

    public void setResultColdPress(float resultColdPress) {
        this.resultColdPress = resultColdPress;
    }

    public float getResultBackPress() {
        return resultBackPress;
    }

    public void setResultBackPress(float resultBackPress) {
        this.resultBackPress = resultBackPress;
    }

    public float getResultPopPress() {
        return resultPopPress;
    }

    public void setResultPopPress(float resultPopPress) {
        this.resultPopPress = resultPopPress;
    }

    public float getResultLeakPress() {
        return resultLeakPress;
    }

    public void setResultLeakPress(float resultLeakPress) {
        this.resultLeakPress = resultLeakPress;
    }

    public String getResultOk() {
        return resultOk;
    }

    public void setResultOk(String resultOk) {
        this.resultOk = resultOk;
    }

    public float getAdjustScrew() {
        return adjustScrew;
    }

    public void setAdjustScrew(float adjustScrew) {
        this.adjustScrew = adjustScrew;
    }

    public long getUppering() {
        return uppering;
    }

    public void setUppering(long uppering) {
        this.uppering = uppering;
    }

    public long getLowering() {
        return lowering;
    }

    public void setLowering(long lowering) {
        this.lowering = lowering;
    }

    public String getWorker() {
        return worker;
    }

    public void setWorker(String worker) {
        this.worker = worker;
    }

    public String getInspector() {
        return inspector;
    }

    public void setInspector(String inspector) {
        this.inspector = inspector;
    }

    public String getManager() {
        return manager;
    }

    public void setManager(String manager) {
        this.manager = manager;
    }

    public String getConfPort() {
        return confPort;
    }

    public void setConfPort(String confPort) {
        this.confPort = confPort;
    }

    public String getConfBaudrate() {
        return confBaudrate;
    }

    public void setConfBaudrate(String confBaudrate) {
        this.confBaudrate = confBaudrate;
    }

    public String getConfSetPress() {
        return confSetPress;
    }

    public void setConfSetPress(String confSetPress) {
        this.confSetPress = confSetPress;
    }

    public String getConfPressUnit() {
        return confPressUnit;
    }

    public void setConfPressUnit(String confPressUnit) {
        this.confPressUnit = confPressUnit;
    }

    public long getTestId() {
        return testId;
    }

    public void setTestId(long testId) {
        this.testId = testId;
    }

    @Override
    public String toString() {
        return "History{" +
                "id=" + id +
                ", histroyNo='" + histroyNo + '\'' +
                ", customer='" + customer + '\'' +
                ", testType='" + testType + '\'' +
                ", psvNo='" + psvNo + '\'' +
                ", fluid='" + fluid + '\'' +
                ", serialNo='" + serialNo + '\'' +
                ", location='" + location + '\'' +
                ", maker='" + maker + '\'' +
                ", velveType='" + velveType + '\'' +
                ", inletSize=" + inletSize +
                ", outletSize=" + outletSize +
                ", testDate=" + testDate +
                ", setPress=" + setPress +
                ", backPress=" + backPress +
                ", coldPress=" + coldPress +
                ", resultSetPress=" + resultSetPress +
                ", resultColdPress=" + resultColdPress +
                ", resultBackPress=" + resultBackPress +
                ", resultPopPress=" + resultPopPress +
                ", resultLeakPress=" + resultLeakPress +
                ", resultOk='" + resultOk + '\'' +
                ", adjustScrew=" + adjustScrew +
                ", uppering=" + uppering +
                ", lowering=" + lowering +
                ", worker='" + worker + '\'' +
                ", inspector='" + inspector + '\'' +
                ", manager='" + manager + '\'' +
                ", confPort='" + confPort + '\'' +
                ", confBaudrate='" + confBaudrate + '\'' +
                ", confSetPress='" + confSetPress + '\'' +
                ", confPressUnit='" + confPressUnit + '\'' +
                ", testId=" + testId +
                '}';
    }
}