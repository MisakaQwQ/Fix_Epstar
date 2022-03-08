// ==UserScript==
// @name         FixYjsjw
// @namespace    MisakaQwQ
// @version      0.35
// @description  重载金智研究生教务系统部分非W3C方法
// @author       MisakaQwQ
// @include      *edu.cn/epstar/*
// @include      *edu.cn/wsxk/jsp/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    var message = 'yjsxt Overloaded';
    console.log(message);
})();

window.showModalDialog = function (url, arg, feature) {
    var opFeature = feature.split(";");
    var featuresArray = new Array()
    if (document.all) {
        for (var i = 0; i < opFeature.length - 1; i++) {
            var f = opFeature[i].split("=");
            featuresArray[f[0]] = f[1];
        }
    }
    else {

        for (var i = 0; i < opFeature.length - 1; i++) {
            var f = opFeature[i].split(":");
            featuresArray[f[0].toString().trim().toLowerCase()] = f[1].toString().trim();
        }
    }



    var h = "200px", w = "400px", l = "100px", t = "100px", r = "yes", c = "yes", s = "no";
    if (featuresArray["dialogheight"]) h = featuresArray["dialogheight"];
    if (featuresArray["dialogwidth"]) w = featuresArray["dialogwidth"];
    if (featuresArray["dialogleft"]) l = featuresArray["dialogleft"];
    if (featuresArray["dialogtop"]) t = featuresArray["dialogtop"];
    if (featuresArray["resizable"]) r = featuresArray["resizable"];
    if (featuresArray["center"]) c = featuresArray["center"];
    if (featuresArray["status"]) s = featuresArray["status"];
    var modelFeature = "height = " + h + ",width = " + w + ",left=" + l + ",top=" + t + ",model=yes,alwaysRaised=yes" + ",resizable= " + r + ",celter=" + c + ",status=" + s;

    var model = window.open(url, "", modelFeature, null);

    model.dialogArguments = arg;

};

ActiveXObject = function (type) {
    if ("Msxml2.DOMDocument" == type) {
        var tmp = document.implementation.createDocument("", "", null);
        return tmp
    }
    else if ("MsXml2.XmlHttp" == type) {
        var tmp = new XMLHttpRequest();
        return tmp
    }
};

Page_ResolveBizObjByPath = function (sObjectPath) {
    var tempArr;
    if (sObjectPath == "" || sObjectPath == null)
        return null;
    tempArr = sObjectPath.split("/");
    if (tempArr.length > 0)
        return tempArr[tempArr.length - 1];
    else
        return null;
};


Page_GetServerMetaXml = function (sObjectPath, sFields) {
    var sURL, sObjName, m_XmlHttp;
    sObjName = Page_ResolveBizObjByPath(sObjectPath.trim());
    var C_GETSERVERDATAURL = "/epstar/app/getxml.jsp?";
    sURL = C_GETSERVERDATAURL;
    m_XmlHttp = new ActiveXObject("MsXml2.XmlHttp");
    m_XmlHttp.open("post", sURL, false);
    m_XmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    var xmlparam;
    //xmlparam = "mainobj=" + sObjectPath.trim() + "&fields=" + sObjName + ":" + sFields.trim() + "&xmltype=metaxml";
    if (sFields == "" || sFields == null)
        xmlparam = "mainobj=" + sObjectPath.trim() + "&xmltype=metaxml";
    else
        xmlparam = "mainobj=" + sObjectPath.trim() + "&fields=" + sObjName + ":" + sFields.trim() + "&xmltype=metaxml";

    m_XmlHttp.send(xmlparam);

    switch (CheckSession(m_XmlHttp)) {
        case 0:
            break;
        case 1:
            m_XmlHttp.open("post", sURL, false);
            m_XmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            m_XmlHttp.send(xmlparam);
            break;
        case -1:
            throw "会话已失效或服务器不可用，请稍候!";
            break;
    }
    return m_XmlHttp.responseXML;
};

Report_Pyjh = function (sXH) {
    var sParameters = "";
    //空白成绩单ID
    var sNode = 'db603da2-29d7-6fa4-308d-3fee28d8c232';
    var urlTo = sReportUrl + "?sNode-report=" + sNode;
    sParameters = "&param='XH=\'" + sXH + "\''";
    urlTo = urlTo + sParameters;
    urlTo = encodeURI(urlTo)
    var returnValue = window.showModalDialog(urlTo, this, "dialogHeight: 750px; dialogWidth: 850px;  resizable: Yes; center: yes ;status: no;");
    //OpenWin(urlTo,'','850','750');
}

CheckSession = function (arg) {
    return 0;
};

MO = function (e) {
    if (!e)
        var e = window.event;
    var S = e.srcElement;
    while (S.tagName != "TD") { S = S.parentElement; }
    S.className = "default_toolbutton_over";
}

MU = function (e) {
    if (!e)
        var e = window.event;
    var S = e.srcElement;
    while (S.tagName != "TD") { S = S.parentElement; }
    S.className = "default_toolbutton";
}

DataGrid_OnRowMouseOver = function (styClass) {
    try {
        var evtElement = window.event.srcElement;
        while (evtElement.tagName.toLowerCase() != "tr") {
            evtElement = evtElement.parentNode;
        }
        if (!evtElement.getAttribute("_selected"))
            evtElement.className = styClass;
    } catch (e) { };
}

DataGrid_OnRowMouseOut = function (styClass) {
    try {
        var evtElement = window.event.srcElement;
        var tableElement = evtElement;
        while (evtElement.tagName.toLowerCase() != "tr") {
            evtElement = evtElement.parentNode;
        }
        while (tableElement.tagName.toLowerCase() != "table" && tableElement.getAttribute("elementType") != "datagrid") {
            tableElement = tableElement.parentElement;
        }
        if (tableElement && !evtElement.getAttribute("_selected"))
            evtElement.className = styClass;
    } catch (e) { };
}

DataGrid_OnRowClick = function () {
    var evtElement = window.event.srcElement;
    var tableElement = evtElement;
    while (evtElement.tagName.toLowerCase() != "tr") {
        evtElement = evtElement.parentNode;
    }
    /*
    while(tableElement.tagName.toLowerCase() != "table" && tableElement.getAttribute("elementType") != "datagrid")
    {
        tableElement = tableElement.parentElement;
    }
    //tableElement.setAttribute("selcdRowIndex",evtElement.getAttribute("rowindex"));
    //evtElement.className = "selectrows";*/
}

EditField_GetSelectServerItems = function (elSource) {
    var selcElement, nBizObj, idType;

    //exception check
    if (elSource == null) {
        throw "EditField_GetSelectServerItems函数的第一个参数为空!";
    }

    if (typeof (elSource) == "string") {
        selcElement = document.all(elSource);
        //exception check
        if (selcElement == null) {
            throw "在EditField_GetSelectServerItemsEx函数中找不到 id:" + elSource + " 的元素节点!";
        }
        if (typeof (selcElement.type) == "undefined")
            throw "根据EditField_GetSelectServerItemsEx函数中传进来的参数，\n在页面中找到多个id等于'" + elSource + "'的对象!";
    }
    else if (typeof (elSource) == "object")
        selcElement = elSource;



    nBizObj = selcElement.form.getAttribute("mainBizObj");
    if (nBizObj == null || nBizObj == "") {
        msg_error_debug = "该editfield form没有mainBizObj属性或它为空!";
        return null;
    }
    idType = selcElement.form.getAttribute("idType");
    if (idType == null) {
        msg_error_debug = "该editfield form没有idType属性!";
        return null;
    }

    var sURL, xmlhttp, selectNode, fieldid;
    var C_GETSITEITEMSURL = "/epstar/app/getitems.jsp?";
    sURL = C_GETSITEITEMSURL + "bizobj=" + nBizObj + "&bizobjidtype=" + idType + "&fieldid=" + selcElement.id;

    xmlhttp = new ActiveXObject("MsXml2.XmlHttp");
    xmlhttp.open("get", sURL, false);
    xmlhttp.send();

    switch (CheckSession(xmlhttp)) {
        case 0:
            break;
        case 1:
            xmlhttp.open("get", sURL, false);
            xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xmlhttp.send();
            break;
        case -1:
            throw "会话已失效或服务器不可用，请稍候!";
            break;
    }
    selectNode = xmlhttp.responseXML.documentElement.getElementsByTagName("select")[0];
    return selectNode;
}

EditField_GetSelectLoaded = function (elSource) {
    var selcElement;

    //exception check
    if (elSource == null) {
        throw "EditField_GetSelectLoaded函数的第一个参数为空!";
    }

    if (typeof (elSource) == "string") {
        selcElement = document.all(elSource);
        //exception check
        if (selcElement == null) {
            throw "在EditField_GetSelectLoaded函数中找不到 id:" + elSource + " 元素节点!";
        }
        if (typeof (selcElement.type) == "undefined")
            throw "根据EditField_GetSelectLoaded函数中传进来的参数，\n在页面中找到多个id等于'" + elSource + "'的对象!";
    }
    else if (typeof (elSource) == "object")
        selcElement = elSource;

    if (selcElement.getAttribute("sel_loaded") != null) {
        if (selcElement.getAttribute("sel_loaded") == "true" || selcElement.getAttribute("sel_loaded") == true)
            return true;
        else
            return false;
    }
    else
        return false;
}

EditField_LoadSelectItemsEx = function (elSource, xml, value) {
    var selcElement, nXml, nXmlElement, rootNode, selectedElement;
    //exception check
    if (elSource == null) {
        throw "EditField_LoadSelectItemsEx函数的第一个参数为空!";
    }
    //exception check
    if (xml == null) {
        throw "EditField_LoadSelectItemsEx函数的第二个参数为空!";
    }


    if (typeof (elSource) == "string") {
        selcElement = document.all(elSource);
        //exception check
        if (selcElement == null) {
            throw "在EditField_LoadSelectItemsEx函数中找不到 id:" + elSource + " 的元素节点!";
        }
        if (typeof (selcElement.type) == "undefined")
            throw "根据EditField_LoadSelectItemsEx函数中传进来的参数，\n在页面中找到多个id等于'" + elSource + "'的对象!";
    }
    else if (typeof (elSource) == "object")
        selcElement = elSource;

    if (typeof (xml) == "string")
        nXml = xml;
    else if (typeof (xml) == "object")
        nXml = xml;

    //check the select element has selected a item
    if (selcElement.selectedIndex != -1 && typeof (selcElement.selectedIndex) != "undefined") {
        selectedElement = selcElement.options[selcElement.selectedIndex];
        var optNodes = nXml.getElementsByTagName("option");
        selcElement.innerHTML = "";

        for (var i = 0; i < optNodes.length; i++) {
            var tmpNode = optNodes[i];

            if (i == 0) {
                var checkValue = tmpNode.getAttribute("value");
                if (checkValue != "") {
                    var blankElement = document.createElement("option");
                    blankElement.innerText = DEFAULT_SELECT_BLANK_OPTION_TEXT;
                    selcElement.appendChild(blankElement);
                } else {
                    if (tmpNode.innerText == "") {
                        tmpNode.innerText = DEFAULT_SELECT_BLANK_OPTION_TEXT;
                    }
                }
            }

            var insertElement = document.createElement("option");
            selcElement.appendChild(insertElement);
            if (tmpNode.getAttribute("value") == value) {
                tmpNode.setAttribute("selected", "true");
                insertElement.setAttribute("selected", "true");

            }
            insertElement.value = tmpNode.getAttribute("value");
            if (tmpNode.hasChildNodes())
                insertElement.innerText = tmpNode.childNodes[0].wholeText;
        }
    }
    else {
        var optNodes = nXml.getElementsByTagName("option");
        selcElement.innerHTML = "";
        for (var i = 0; i < optNodes.length; i++) {
            var tmpNode = optNodes[i];

            //if the select is requied, insert a blank node
            if (i == 0) {
                var checkValue = tmpNode.getAttribute("value");
                if (checkValue != "") {
                    var blankElement = document.createElement("option");
                    blankElement.innerText = DEFAULT_SELECT_BLANK_OPTION_TEXT;
                    selcElement.appendChild(blankElement);
                } else {
                    if (tmpNode.innerText == "") {
                        tmpNode.innerText = DEFAULT_SELECT_BLANK_OPTION_TEXT;
                    }
                }
            }

            var insertElement = document.createElement("option");
            selcElement.appendChild(insertElement);
            if (tmpNode.getAttribute("value") == value) {
                tmpNode.setAttribute("selected", "true");
                insertElement.setAttribute("selected", "true");
            }
            insertElement.value = tmpNode.getAttribute("value");
            if (tmpNode.hasChildNodes())
                insertElement.innerText = tmpNode.childNodes[0].wholeText;
        }
    }
    EditField_SetSelectLoaded(selcElement, true);
    return true;
}

EditField_CheckSelectOptionsEx = function (elSource, value) {
    if (EditField_GetSelectLoaded(elSource) == false) {
        var selectNode = EditField_GetSelectServerItems(elSource);
        EditField_LoadSelectItemsEx(elSource, selectNode, value);
        return false;
    }
    else {
        return true;
    }

}

EditField_SetSelectLoaded = function (elSource, bLoaded) {
    var selcElement;

    //exception check
    if (elSource == null) {
        throw "EditField_SetSelectLoaded函数的第一个参数为空!";
    }
    if (typeof (elSource) == "string") {
        selcElement = document.all(elSource);
        //exception check
        if (selcElement == null) {
            throw "在EditField_SetSelectLoaded函数中找不到 id:" + elSource + " 元素节点!";
        }
        if (typeof (selcElement.type) == "undefined")
            throw "根据EditField_SetSelectLoaded函数中传进来的参数，\n在页面中找到多个id等于'" + elSource + "'的对象!";
    }
    else if (typeof (elSource) == "object")
        selcElement = elSource;

    selcElement.setAttribute("sel_loaded", bLoaded);
}

EditField_SetValue = function (elSource, value) {
    var objElement;
    if (typeof (elSource) == "string") {
        objElement = document.all(elSource);
        //exception check
        if (objElement == null) {
            throw "在EditField_SetValue 函数中找不到 id:" + elSource + " 元素节点";
        }
        if (typeof (objElement.type) == "undefined") {
            throw "根据EditField_SetValue函数中传进来的参数，\n在页面中找到多个id等于'" + elSource + "'的对象!";
        }
    }
    else if (typeof (elSource) == "object")
        objElement = elSource;
    if (objElement.tagName.toLowerCase() == "select") {
        if (EditField_CheckSelectOptionsEx(elSource, value) == true) {
            objElement.value = value;
        }

        //objElement.options[(objElement.selectedIndex)].setAttribute("selected",false);

        for (var i = 0; i < objElement.options.length; i++) {
            if (objElement.options[i].value == value.toString()) {
                //objElement.options[i].setAttribute("selected", true);
                //objElement.value = value;
                if (objElement.disabled == true) {
                    objElement.options[i].className = "eftReadOnly";
                }
                break;
            }
        }
    }
    else if (objElement.tagName.toLowerCase() == "input") {
        if (objElement.type.toLowerCase() == "checkbox") {
            if (value == "")
                objElement.checked = false;
            else
                objElement.checked = value;

        }
        else
            objElement.value = value;
    }
    else
        objElement.value = value;
}

EditField_GetValue = function (elSource) {
    var objElement;
    if (typeof (elSource) == "string") {
        objElement = document.all(elSource);
        //exception check
        if (objElement == null) {
            throw "在EditField_GetValue 函数中找不到 id:" + elSource + " 元素节点";
        }
        if (typeof (objElement.type) == "undefined") {
            if (objElement.tagName.toLowerCase() != "a" && objElement.tagName.toLowerCase() != "font")
                throw "根据EditField_GetValue函数中传进来的参数，\n在页面中找到多个id等于'" + elSource + "'的对象!";
        }
    }
    else if (typeof (elSource) == "object")
        objElement = elSource;

    if (objElement.tagName.toLowerCase() == "select") {
        /*
        if(objElement.selectedIndex != -1)
            return objElement.options[objElement.selectedIndex].value;
        else
            return "";
            */

        if (objElement.options.length == 0)
            return "";

        for (var n = 0; n < objElement.options.length; n++) {
            var selectedState = objElement.options[n].getAttribute("selected");
            if (selectedState == true) {
                return objElement.options[n].value;
            }
            else if (selectedState == "true") {
                return objElement.options[n].value;
            }
            if (n == objElement.options.length - 1)
                return "";
        }
    }
    else if (objElement.tagName.toLowerCase() == "input") {
        if (objElement.type.toLowerCase() == "checkbox") {
            return (objElement.checked);
        }
        else
            return objElement.value;
    }
    else
        return objElement.value;
}


ShowDetail = function (sPgxxwid, sBjdm, sZt, sNowDate, sPgkssj, sPgjssj, sSKJS, sRKJSZGH) {
    var type = "look";
    //验证是否在评估期内	  
    if (sPgkssj != null && sPgkssj != "" && sPgjssj != null && sPgjssj != "") {
        sPgkssj = sPgkssj.substring(0, 10);
        sPgjssj = sPgjssj.substring(0, 10);
        var sDateArray = sPgkssj.split("-");
        var sDate = new Date(sDateArray[0], sDateArray[1], sDateArray[2].substring(0, 2));
        var eDateArray = sPgjssj.split("-");
        var eDate = new Date(eDateArray[0], eDateArray[1], eDateArray[2].substring(0, 2));
        var nDateArray = sNowDate.split("-");
        var nDate = new Date(nDateArray[0], nDateArray[1], nDateArray[2]);
        if ((nDate.getTime() < sDate.getTime() || nDate.getTime() > eDate.getTime()) && sZt == "0") {
            alert("该班级的教学评估开始时间为:" + sPgkssj.substring(0, 11) + ",结束时间为:" + sPgjssj.substring(0, 11) + "\n当前时间不在评估时间范围内，不可评估!");
            return;
        }
    } else {
        alert("该班级的教学评估指标信息还没有设置，不可评估，请与管理员联系!");
        return;
    }
    if (sZt == "0") type = "edit";


    //跳转到详细页面
    var sUrl = "";
    sUrl = "/epstar/app/template.jsp?mainobj=YJSXT/PYGL/JXPGGLST/V_PYGL_JXPG_JXPGXX&tfile=JXPGXX_XSWH/JXPGXX_XSWH_BDKJ";
    var sParam = "&TYPE=" + type + "&PGXXWID=" + sPgxxwid + "&BJDM=" + sBjdm + "&SKJS=" + sSKJS + "&RKJSZGH=" + sRKJSZGH;
    sUrl = sUrl + sParam;
    sUrl = encodeURI(sUrl);
    var retValue = window.showModalDialog(sUrl, "", "dialogHeight: 750px; dialogWidth: 900px; resizable: Yes; status: no;center: yes");
    if (retValue == 1) {
        Page_Reload();
    }
}

Page_RemoveUrlParam = function (url, name) {
    if (url == null || url == "")
        return null;
    if (name == null || name == "")
        return null;

    var tempArr, tempArr2, tempUrl;
    String.prototype.Trim = function () { return this.replace(/^\s+|\s+$/g, ""); }
    tempUrl = "";
    tempArr = url.split("&");
    for (var i = 0; i < tempArr.length; i++) {
        tempArr2 = tempArr[i].split("=");
        if (tempArr2.length >= 2) {
            if (tempArr2[0].Trim().toLowerCase() == name.Trim().toLowerCase()) {
                //tempUrl = tempUrl + tempArr2[0] + "=" + value;
                continue;
            }
            else {
                tempUrl = tempUrl + tempArr2[0] + "=" + tempArr2[1];
                if (tempArr2.length > 2) {
                    for (var j = 2; j < tempArr2.length; j++) {
                        tempUrl = tempUrl + "=" + tempArr2[j];
                    }
                }
            }
        }
        else {
            if (tempArr2.length > 0)
                tempUrl = tempUrl + tempArr2(0);
        }
        if (i < tempArr.length - 1)
            tempUrl = tempUrl + "&";
    }
    tempUrl = removeLastStringIfExists(tempUrl, "&");
    return tempUrl;
}

removeLastStringIfExists = function (srcStr, lastStr) {
    if (srcStr == null || srcStr == "" || lastStr == null || lastStr == "") {
        return srcStr;
    }
    if (srcStr.substring(srcStr.length - lastStr.length, srcStr.length) == lastStr) {
        srcStr = srcStr.substring(0, srcStr.length - lastStr.length);
    }
    return srcStr;
}

Page_SetUrlParamValue = function (url, name, value) {
    if (url == null || url == "")
        return null;
    if (name == null || name == "")
        return null;
    if (value == null || value == "")
        return null;

    var tempArr, tempArr2, tempUrl;
    var nFlag = false;
    String.prototype.Trim = function () { return this.replace(/^\s+|\s+$/g, ""); }
    tempUrl = "";
    tempArr = url.split("&");
    for (var i = 0; i < tempArr.length; i++) {
        tempArr2 = tempArr[i].split("=");
        if (tempArr2.length >= 2) {
            if (tempArr2[0].Trim().toLowerCase() == name.Trim().toLowerCase()) {
                tempUrl = tempUrl + tempArr2[0] + "=" + value;
                nFlag = true;
            }
            else {
                tempUrl = tempUrl + tempArr2[0] + "=" + tempArr2[1];
                if (tempArr2.length > 2) {
                    for (var j = 2; j < tempArr2.length; j++) {
                        tempUrl = tempUrl + "=" + tempArr2[j];
                    }
                }
            }
        }
        else {
            if (tempArr2.length > 0)
                tempUrl = tempUrl + tempArr2[0];
        }
        if (i < tempArr.length - 1)
            tempUrl = tempUrl + "&";
    }
    if (nFlag == false) {
        if (tempUrl.charAt(tempUrl.length - 1) == "&") {
            tempUrl = tempUrl + name + "=" + value + "&";
        } else {
            tempUrl = tempUrl + "&" + name + "=" + value + "&";
        }
    }
    tempUrl = removeLastStringIfExists(tempUrl, "&");
    return tempUrl;
}


search = function () {
    try {

        //变量定义

        var sXQDM = EditField_GetValue("XQDM");

        var sKCMC = EditField_GetValue("KCMC");

        var sSKJS = EditField_GetValue("SKJS");

        var sZT = EditField_GetValue("ZT");

        var sUrl = "/epstar/app/template.jsp?mainobj=YJSXT/PYGL/JXPGGLST/V_PYGL_JXPG_JXPGXX&tfile=JXPGXX_XSWH/JXPGXX_XSWH_BG";
        var sFilter = "&filter=V_PYGL_JXPG_JXPGXX:1=1";
        var sOrderBy = "&orderby=V_PYGL_JXPG_JXPGXX:XQDM ASC,ZT ASC";
        var sPage = "&page=V_PYGL_JXPG_JXPGXX:curpage=1,pagesize=" + sCommonPageSize;
        var sParameters = "";

        //根据查询语句拼写filter条件


        if (sXQDM && sXQDM != "") {
            sFilter = sFilter + " and  XQDM='" + sXQDM + "'";
        }

        if (sKCMC && sKCMC != "") {
            sFilter = sFilter + " and  (KCMC like '%" + sKCMC + "%' or KCDM like '" + sKCMC + "%')";
        }

        if (sSKJS && sSKJS != "") {
            sFilter = sFilter + " and  (SKJS like '%" + sSKJS + "%' or SKJSZGH like '" + sSKJS + "%')";
        }
        if (sZT && sZT != "") {
            sFilter = sFilter + " and  ZT='" + sZT + "'";
        }

        sFilter = encodeURI(sFilter);

        //最终拼写访问的URL
        sUrl = sUrl + sOrderBy + sPage + sFilter + sParameters;

        //刷新页面
        window.parent.main.location.href = sUrl;
    } catch (e) {
        alert("无法获取相关查询条件，请与管理员联系！");
    }
}