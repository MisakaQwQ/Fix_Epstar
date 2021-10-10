// ==UserScript==
// @name         FixYjsjw
// @namespace    MisakaQwQ
// @version      0.2
// @description  重载金智研究生教务系统部分非W3C方法
// @author       MisakaQwQ
// @include      *edu.cn/epstar/app/*
// @include      *edu.cn/epstar/web/swms/mainframe/home/*
// @grant        none
// ==/UserScript==

(function() {
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

ActiveXObject = function(type){
    if("Msxml2.DOMDocument" == type){
        var tmp = document.implementation.createDocument("", "", null);
        return tmp
    }
    else if("MsXml2.XmlHttp" == type){
        var tmp = new XMLHttpRequest();
        return tmp
    }
};

Page_ResolveBizObjByPath = function(sObjectPath){
	var tempArr;
	if(sObjectPath == "" || sObjectPath == null)
		return null;
	tempArr = sObjectPath.split("/");
	if(tempArr.length > 0)
		return tempArr[tempArr.length - 1];
	else
		return null;
};


Page_GetServerMetaXml = function (sObjectPath, sFields){
	var sURL, sObjName, m_XmlHttp;
	sObjName = Page_ResolveBizObjByPath(sObjectPath.trim());
	var C_GETSERVERDATAURL = "/epstar/app/getxml.jsp?";
	sURL = C_GETSERVERDATAURL;
	m_XmlHttp = new ActiveXObject("MsXml2.XmlHttp");
	m_XmlHttp.open("post", sURL, false);
	m_XmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	var xmlparam;
	//xmlparam = "mainobj=" + sObjectPath.trim() + "&fields=" + sObjName + ":" + sFields.trim() + "&xmltype=metaxml";
	if(sFields==""||sFields ==null)
	  xmlparam = "mainobj=" + sObjectPath.trim() + "&xmltype=metaxml";
	else
	  xmlparam = "mainobj=" + sObjectPath.trim() + "&fields=" + sObjName + ":" + sFields.trim() + "&xmltype=metaxml";

	m_XmlHttp.send(xmlparam);

	switch(CheckSession(m_XmlHttp))
	{
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

Report_Pyjh = function(sXH)
{
	var sParameters = "";
	//空白成绩单ID
	var sNode = 'db603da2-29d7-6fa4-308d-3fee28d8c232';
	var urlTo = sReportUrl + "?sNode-report="+ sNode ;
	sParameters = "&param='XH=\'"+ sXH +"\''";
	urlTo = urlTo + sParameters;
    urlTo = encodeURI(urlTo)
	var returnValue = window.showModalDialog(urlTo,this,"dialogHeight: 750px; dialogWidth: 850px;  resizable: Yes; center: yes ;status: no;");
	//OpenWin(urlTo,'','850','750');
}

CheckSession = function(arg){
    return 0;
};
