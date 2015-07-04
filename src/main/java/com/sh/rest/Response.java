package com.sh.rest;

import com.fasterxml.jackson.annotation.JsonInclude;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
        "success",
        "total",
        "start",
        "limit",
        "error",
        "map",
        "list",
        "object"
})
@XmlRootElement(name = "response")
public class Response implements Serializable {

    /**
     * Serialization UID
     */
    private static final long serialVersionUID = 1;

    protected boolean success;

    protected long total;

    protected int limit;

    protected int start;

    @JsonInclude(value = JsonInclude.Include.NON_NULL)
    protected String error;

    @JsonInclude(value = JsonInclude.Include.NON_NULL)
    protected Map<String, Object> map;

    @JsonInclude(value = JsonInclude.Include.NON_NULL)
    protected List<Object> list;

    @JsonInclude(value = JsonInclude.Include.NON_NULL)
    protected Object object;

    public long getTotal() {
        return total;
    }

    public void setTotal(long total) {
        this.total = total;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public int getLimit() {
        return limit;
    }

    public void setLimit(int limit) {
        this.limit = limit;
    }

    public int getStart() {
        return start;
    }

    public void setStart(int start) {
        this.start = start;
    }

    public String getError() {
        if (error == null) {
            error = new String();
        }
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public Map<String, Object> getMap() {
        if (map == null) {
            map = new HashMap<String, Object>();
        }
        return map;
    }

    public void setMap(Map<String, Object> map) {
        this.map = map;
    }

    public List<Object> getList() {
        if (list == null) {
            list = new ArrayList<Object>();
        }
        return list;
    }

    public void setList(List<Object> list) {
        this.list = list;
    }

    public Object getObject() {
        return object;
    }

    public void setObject(Object object) {
        this.object = object;
    }

    @Override
    public String toString() {
        return "Response{" +
                "success=" + success +
                ", total=" + total +
                ", limit=" + limit +
                ", start=" + start +
                ", error=" + error +
                ", map=" + map +
                ", list=" + list +
                ", object=" + object +
                '}';
    }
}
