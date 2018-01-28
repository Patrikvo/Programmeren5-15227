/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        document.addEventListener("offline", onOffline, false);
        document.addEventListener("online", onOnline, false);
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};


var phoneCall = function (number) {
    // if (window.cordova) {
    //     //ref = window.open('tel:' + number, '_system');
    //     cordova.InAppBrowser.open('tel:' + number.replace(/\s/g,''), '_system');
    //     //ref.addEventListener("endcallbutton", onEndCallKeyDown, false);
    // }
    if (window.cordova) {
        var bypassAppChooser = true;
        window.plugins.CallNumber.callNumber(onPhoneCallSuccess, onPhoneCallError, number, bypassAppChooser);
    }
};

function onPhoneCallSuccess(result) {
    // alert('succes: ' + result);
}

function onPhoneCallError(result) {
    // alert('error: ' + result);
}


var smsSend = function (number, message) {
    // CONFIGURATION
    var options = {
        replaceLineBreaks: false, // true to replace \n by a new line, false by default
        android: {
            intent: 'INTENT'  // send SMS with the native android SMS messaging
            // intent: '' // send SMS without open any other app
        }
    };

    var success = function () {
        alert('SMS is verstuurd!');
    };

    var error = function (e) {
        alert('SMS is niet verstuurd:' + e);
    };
    if (typeof sms === 'undefined' || typeof sms.send === 'undefined') {
        alert('SMS send is undefined. Would have sent error');
    } else {
        sms.send(number, message, options, success, error);
    }
};


app.initialize();

window.onload = function(){
    
   // checkConnection();
    document.body.addEventListener('click', dispatcher, false);
    vos.setModel();
    //location.href = "#home-index";
    window.setTimeout(function () { controller['home']['index'](); }, 500);
    //controller['home']['index']();
    transferLogs();
}




// connectionStatus
var onOffline = function () {
    checkConnection();
}

var onOnline = function () {
    checkConnection();
    transferLogs();
}

var checkConnection = function () {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN] = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI] = 'WiFi connection';
    states[Connection.CELL_2G] = 'Cell 2G connection';
    states[Connection.CELL_3G] = 'Cell 3G connection';
    states[Connection.CELL_4G] = 'Cell 4G connection';
    states[Connection.CELL] = 'Cell generic connection';
    states[Connection.NONE] = 'No network connection';

    document.getElementById("connectionStatus").innerHTML = states[networkState];
}

var hasWifiConnection = function () { return navigator.connection.type == Connection.WIFI;}

var transferLogs = function(){
    var logCache = JSON.parse(localStorage.getItem('logCache'));

    if (logCache == null) { return;}

    if (logCache.length > 0 && hasWifiConnection() == true) {
        inTransitLog = logCache.pop();
        transferLog(inTransitLog);
    }
    else {
        return;
    }

    localStorage.setItem('logCache', JSON.stringify(logCache));


}

var inTransitLog;

var transferLog = function(logEntry){
    var url = "http://programmeren5-15227-p-van-ostaeyen-patrikvanostaeyen.c9users.io:8080/api/Insert";

    // Sending and receiving data in JSON format using POST method
    //
    var xhr = new XMLHttpRequest();

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                inTransitLog = null;
                transferLogs();
                console.log(200);
            }
            else if (xhr.status === 404) {
                document.getElementById("connectionStatus").innerHTML = "transfer failed";
                transferFailedconsole.log(404)

            }
            else {
                console.log(xhr.status)
            }
        }
        
    };
    var data = JSON.stringify(logEntry);
    xhr.send(data);

}


var transferFailed = function(){
    var logCache = JSON.parse(localStorage.getItem('logCache'));

    if (logCache == null) {
        logCache = new Array();
    }

    logCache.push(inTransitLog);

    localStorage.setItem('logCache', JSON.stringify(logCache));
    inTransitLog = null;
}