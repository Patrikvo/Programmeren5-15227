/**
 * Created by jefin on 20/05/2017.
 */

var identityFile = 'data/identity.json';
var ProcedureFilePrefix = 'data/procedure';
var ProcedureFileSuffix = '.json';
var PositionFile = 'data/position.json';
var organisationListFile = 'data/organisationList.json';
var modelStorageName = 'model';
var IsOathLogin = false;



var vos = {
    'model': {
        loaded: false,
        identity: {},
        procedureList: {},
        organisationList: {},
        position: {},
        myLocation: {}
    },
    'setModel': function () {
        /**
         * plaats JSON bestanden in vos.model.en vos.model.in local storage
         */
        window.localStorage.clear();
        // zolang je aan het debuggen bent
        localStorage.removeItem(modelStorageName);

        // ga na of het model al geladen is
        var model = JSON.parse(localStorage.getItem(modelStorageName));

        if (model === null) {
            $http(identityFile)
                .get()
                .then(function (data) {
                    vos.model.identity = JSON.parse(data);
                    var payload = {};
                    // procedures depend on Role (in uppercase)
                    var fileName = ProcedureFilePrefix + vos.model.identity.role.toUpperCase() + ProcedureFileSuffix;
                    return $http(fileName).get(payload);
                })
                .then(function (data) {
                    vos.model.procedureList = JSON.parse(data);
                    var payload = { 'id': 1 };
                    return $http(PositionFile).get(payload);
                })
                .then(function (data) {
                    vos.model.position = JSON.parse(data);
                    var payload = {};
                    return $http(organisationListFile).get(payload);
                })
                .then(function (data) {
                    vos.model.organisationList = JSON.parse(data);
                    vos.model.loaded = true;
                    localStorage.setItem(modelStorageName, JSON.stringify(vos.model));
                    // controller['home']['index'](); // de controller maken we later
                })
                .catch(function (data) {
                    vos.model.loaded = false;
                    localStorage.setItem(modelStorageName, JSON.stringify(vos.model));
                });
        } else {
            vos.model = model;
        }
    },

    'updateProcedures': function () {
        var payload = {};
        // procedures depend on Role (in uppercase)
        var fileName = ProcedureFilePrefix + vos.model.identity.role.toUpperCase() + ProcedureFileSuffix;
        $http(fileName).get(payload).then(function (data) {
            vos.model.procedureList = JSON.parse(data);
        });
    },



    'navigateTo': function (view, title) {
        location.href = '#' + view;
        var h1 = document.querySelector('#' + view + ' h1');
        if (title && h1) {
            h1.innerHTML = title;
        }
    },
    /**
     * Voorbereiding versturen sms.
     *
     * @param {string} number telefoonnummer waarnaar sms gestuurd moet worden.
     * @param {string} messageText boodschap die verstuurd zal worden.
     */
    smsPrepare: function (number, messageText) {
        // number = '0486788723';
        var message = messageText + '\n' +
            vos.model.identity.firstName + ' ' + vos.model.identity.lastName + '\n' +
            vos.model.myLocation.name + '\n' +
            vos.model.myLocation.street + '\n' +
            vos.model.myLocation.postalCode + ' ' + vos.model.myLocation.city + '\n' +
            number;
        smsSend(number, message);
    },

    'getPosition': function () {
        var options = {
            maximumAge: 3600000,
            timeout: 6000,
            enableHighAccuracy: false
        }
        var onSuccess = function (pos) {
            vos.model.position.latitude = pos.coords.latitude.toFixed(4);
            vos.model.position.longitude = pos.coords.longitude.toFixed(4);
            vos.setMyLocation();
            render.identity('#home .identity');
            //view['home']['index']();
        };
        var onError = function (error) {
            // stel in op hoofdzetel
            vos.model.position.latitude = 51.1771;
            vos.model.position.longitude = 4.3533;
            vos.setMyLocation();
            render.identity('#home .identity');
            //view['home']['index']();
        };
        var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
    },
    'setMyLocation': function () {
        if (vos.model.loaded == false)
        {
            return;
        }
        vos.model.organisationList.forEach(function (item) {
            item.distanceFromMyLocation = getDistanceFromLatLonInKm(
                vos.model.position.latitude, vos.model.position.longitude,
                item.latitude, item.longitude);
        });
        vos.model.organisationList.sort(function (a, b) {
            return a.distanceFromMyLocation - b.distanceFromMyLocation;
        });

        vos.model.organisationList.forEach(
            function (item) {
                document.getElementById("feedback").innerHTML = '';
                document.getElementById("feedback").innerHTML += item.distanceFromMyLocation + ' ' +
                    item.longitude + ' ' + item.latitude + ' ' + item.name + '<br>';
            });
        vos.model.myLocation = vos.model.organisationList[0];
    },


    login: function () {
        var userName = document.getElementById('userName').value;
        var password = document.getElementById('password').value;

        if (userName) {
            $http('data/personList.json')
                .get()
                .then(function (responseText) {
                    var person = JSON.parse(responseText);
                    var userIdentity = person.list.find(function (item) {
                        return item.userName === userName && item.password === password
                    });
                    if (userIdentity) {
                        userIdentity.loggedIn = true;
                        // identity = JSON.parse(localStorage.getItem('identity'));
                        vos.model.identity = userIdentity;
                        IsOathLogin = false;
                        var payload = {};
                        // procedures depend on Role (in uppercase)
                        var fileName = 'data/procedure' + vos.model.identity.role.toUpperCase() + '.json';
                        $http(fileName).get(payload)
                            .then(function (data) {
                                vos.model.procedureList = JSON.parse(data);
                                localStorage.setItem('model', JSON.stringify(vos.model));
                                controller['home']['index']();
                            });
                    } else {
                        alert('ongeldige gebruikersnaam of paswoord');
                    }
                })
                .catch(function (message) {
                    alert(message);
                })
        } else {
            signIn(null);
            IsOathLogin = true;
            vos.model.identity.role = "LDO";

            vos.updateProcedures();
        }

    },

    logout: function () {
        if (IsOathLogin) {
            signOut(null);
            vos.model.identity.firstName = "Gast";
            vos.model.identity.lastName = "";
            vos.model.identity.loggedIn = false;
        }
        else {
            $http('data/identity.json')
                .get()
                .then(function (responseText) {
                    vos.model.identity = JSON.parse(responseText);
                    var payload = {};
                    // procedures depend on Role (in uppercase)
                    var fileName = 'data/procedure' + vos.model.identity.role.toUpperCase() + '.json';
                    return $http(fileName).get(payload);
                })
                .then(function (responseText) {
                    vos.model.procedureList = JSON.parse(responseText);
                    vos.model.loaded = true;
                    localStorage.setItem('model', JSON.stringify(vos.model));
                    controller['home']['index']();
                })
                .catch(function (message) {
                    alert(message);
                });
        }
        
    }


}


var render = {
    'identity': function (querySelector) {
        var elem = document.querySelector(querySelector);
        elem.innerHTML = '';
        elem.appendChild(makeTextElement(vos.model.identity.firstName + ' ' + vos.model.identity.lastName, 'h2'))
        elem.appendChild(makeTextElement(vos.model.identity.function, 'h3'));
        elem.appendChild(makeTextElement(vos.model.identity.mobile, 'h4'));
        elem.appendChild(makeTextElement(vos.model.myLocation.name));
        elem.appendChild(makeTextElement(vos.model.myLocation.street));
        elem.appendChild(makeTextElement(vos.model.myLocation.phone));
        if (vos.model.identity.loggedIn) {
            elem.appendChild(makeTextElement('aangemeld als ' + vos.model.identity.role));
            var buttonElement = makeButton('Afmelden');
            buttonElement.setAttribute('name', 'uc');
            buttonElement.setAttribute('value', 'home/logout');
            
            elem.appendChild(buttonElement);

        }
        else {
            elem.appendChild(makeTextElement('aangemeld als gast'));
            var buttonElement = makeButton('Aanmelden');
            buttonElement.setAttribute('name', 'uc');
            buttonElement.setAttribute('value', 'home/loggingIn');
            //buttonElement.setAttribute('value', 'home/login');
            
            elem.appendChild(buttonElement);
        }
        return elem;
    },
    'procedure': {
        'make': function (procedureCode) {
            var procedure = vos.model.procedureList.procedure.find(function (item) {
                return item.code === procedureCode;
            });
            elem = render.identity('#view-procedure .show-room');

            if (frame >= procedure.step.length) { frame = procedure.step.length - 1; }
            if (frame < 0) { frame = 0; }

            var step = document.createElement('DIV');
            step.setAttribute('class', 'step');
            step.appendChild(makeHtmlTextElement(procedure.heading + ' - stap ' + (frame+1) + ' van ' + procedure.step.length, 'h2'));


            var listElement = document.createElement('OL');
            listElement.setAttribute('class', 'index');


            procedure.step.forEach(function (item, index) {
                if (index == frame) {
                    var step = makeHtmlTextElement(item.title, 'li');
                    if ("action" in item) {
                        var commandPanelElem = makeCommandPanel();
                        item.action.forEach(function (actionItem) {
                            commandPanelElem.appendChild(render.procedure[actionItem.code](actionItem, procedure.title, procedureCode, item.title));
                        });
                        step.appendChild(commandPanelElem);
                    }
                    if ("list" in item) {
                        step.appendChild(render.procedure['LIST'](item.list));
                    }
                    listElement.appendChild(step);
                }
            });


            step.appendChild(listElement);

            elem.appendChild(step);
        },
        'TEL': function (item, message, procedureCode, step) {
            // Het telefoonnummer van directie, secretariaat, ... is afhankelijk van de plaats
            var phoneNumber = getPhoneNumber(item.phoneNumber);
            if (vos.model.identity.loggedIn) {
                var buttonElement = makeTileButton('Tel', 'icon-phone');
                buttonElement.addEventListener('click', function () {
                    logAction(message, procedureCode, step, phoneNumber, 'TEL');
                    phoneCall(phoneNumber);
                });
                buttonElement.appendChild(document.createTextNode(getPhoneNumberOwner(item.phoneNumber)));
                return buttonElement;
            } else {
                return makeTextElement(item.code + ' ' + phoneNumber, 'P');
            }
        },
        'SMS': function (item, message, procedureCode, step) {
            // Het telefoonnummer van directie, secretariaat, ... is afhankelijk van de plaats
            var phoneNumber = getPhoneNumber(item.phoneNumber);
            if (vos.model.identity.loggedIn) {
                var buttonElement = makeTileButton('Tel', 'icon-send');
                buttonElement.addEventListener('click', function () {
                    logAction(message, procedureCode, step, phoneNumber, 'SMS');
                    vos.smsPrepare(phoneNumber, message);
                });
                buttonElement.appendChild(document.createTextNode(getPhoneNumberOwner(item.phoneNumber)));
                return buttonElement;
            } else {
                return makeTextElement(item.code + ' ' + phoneNumber, 'P');
            }
        },
        'LIST': function (list) {
            var listElement = document.createElement('OL');
            listElement.setAttribute('class', 'index');
            list.forEach(function (item) {
                listElement.appendChild(makeHtmlTextElement(item.title, 'li'))
            });
            return listElement;
        }
    }
}

/**
* Dispath methode die de use case uitvoert die overeenkomt
* met een de gevraagde interactie van de gebruiker.
*
* @param {object} e verwijzing naar het dom element dat het event heeft afgevuurd.
*/
var dispatcher = function (e) {
    transferLogs();
   var target = e.target;
   var steps = 0;
   while (target.getAttribute('name') !== 'uc' && steps < 5 && target.tagName !== 'BODY') {
       target = target.parentNode;
       steps++;
   }
   if (target.getAttribute('name') === 'uc') {
       var uc = target.getAttribute('value');
       var path = uc.split('/');
       var entity = path[0] === undefined ? 'none' : path[0];
       var action = path[1] === undefined ? 'none' : path[1];
       var view = entity + '-' + action;
       // alert (entity + '/' + action);
       if (controller[entity][action]) {
           controller[entity][action]();
       } else {
           alert('ongeldige url ' + uc);
       }
   }
};




var view = {
    'home': {
        'index': function () {
            window.location.assign("index.html#home-index");
        },
        'loggingIn': function () {
            window.location.href = "#home-loggingIn";
        }
    },
    'psycho-social-risk': {
        'index': function () {
            window.location.href = "#psycho-social-index";
        }
    },
    'fire': {
        'index': function () {
            window.location.href = "#fire-index";
        }
    }
    ,
    'terror': {
        'index': function () {
            window.location.href = "#terror-index";
        }
    },
    'accident': {
        'index': function () {
            window.location.href = "#accident-index";
        }
    },
    'procedure': function (title) {
        vos.navigateTo('view-procedure', title);
    }
};


var lastEntity;
var lastAction;
var frame = 0;


var controller = {
    'home': {
        'index': function () {
            lastEntity = 'home';
            lastAction = 'index';
            frame = 0;
            vos.getPosition();
           // vos.setMyLocation();
            render.identity('#home .identity');
            view['home']['index']();
        },
        'gas-leak': function () {
            lastEntity = 'home';
            lastAction = 'gas-leak';
            render.procedure.make('GL');
            view['procedure']('gaslek');
        },
        'amok': function () {
            lastEntity = 'home';
            lastAction = 'amok';
            render.procedure.make('AMOK');
            view['procedure']('AMOK - Geweld');
        },
        'loggingIn': function () {
            lastEntity = 'home';
            lastAction = 'loggingIn';
            view['home']['loggingIn']();
        },
        'login': function () {
            lastEntity = 'home';
            lastAction = 'login';
            vos.login();
            vos.getPosition();
         //   vos.setMyLocation();
    //        render.identity('#home .identity');
            view['home']['index']();
        },
        'logout': function () {
            lastEntity = 'home';
            lastAction = 'logout';
            vos.logout();
            vos.getPosition();
        //    vos.setMyLocation();
            render.identity('#home .identity');
            view['home']['index']();
        },
        'settings': function () {
            lastEntity = 'home';
            lastAction = 'settings';
            vos.settings;
        }
    },

    'call': {
        'hot-line': function () {
            lastEntity = 'call';
            lastAction = 'hot-line';
            phoneCall('+32486788723');
            //window.open('tel:+32486788723');
        }
    },

    'psycho-social-risk': {
        'index': function () {
            lastEntity = 'psycho-social-risk';
            lastAction = 'index';
            vos.getPosition();
        //    vos.setMyLocation();
            render.identity('#psycho-social-risk .identity');
            view['psycho-social-risk']['index']();
        }
    },
    'terror': {
        'index': function () {
            lastEntity = 'terror';
            lastAction = 'index';
            vos.getPosition();
      //      vos.setMyLocation();
            render.identity('#terror .identity');
            view['terror']['index']();
        },
        'bomb-alarm': function () {
            lastEntity = 'terror';
            lastAction = 'bomb-alarm';
            render.procedure.make('BA');
            view['procedure']('bomalarm');
        },
        'suspicious-object': function () {
            lastEntity = 'terror';
            lastAction = 'suspicious-object';
            render.procedure.make('VV');
            view['procedure']('verdacht voorwerp');
        },
        'terrorist-attack': function () {
            lastEntity = 'terror';
            lastAction = 'terrorist-attack';
            render.procedure.make('TA');
            view['procedure']('terroristische aanslag');
        },
        'amok': function () {
            lastEntity = 'terror';
            lastAction = 'amok';
            render.procedure.make('AMOK');
            view['procedure']('AMOK & blind geweld');
        }
    }
    ,

    'accident': {
        'index': function () {
            lastEntity = 'accident';
            lastAction = 'index';
            vos.getPosition();
        //    vos.setMyLocation();
            render.identity('#accident .identity');
            view['accident']['index']();
        },
        'extra-muros': function () {
            lastEntity = 'accident';
            lastAction = 'extra-muros';
            render.procedure.make('EM');
            view['procedure']('extra-muros');
        },
        'serious-work-accident': function () {
            lastEntity = 'accident';
            lastAction = 'serious-work-accident';
            render.procedure.make('SWA');
            view['procedure']('ernstig arbeidsongeval');
        },
        'work-accident': function () {
            lastEntity = 'accident';
            lastAction = 'work-accident';
            render.procedure.make('WA');
            view['procedure']('arbeidsongeval');
        },
        'to-from-school': function () {
            lastEntity = 'accident';
            lastAction = 'to-from-school';
            render.procedure.make('TFS');
            view['procedure']('van en naar school');
        }
    },

    'fire': {
        'index': function () {
            lastEntity = 'fire';
            lastAction = 'index';
            vos.getPosition();
       //     vos.setMyLocation();
            render.identity('#fire .identity');
            view['fire']['index']('brand');
        },
        'detection': function () {
            lastEntity = 'fire';
            lastAction = 'detection';
            render.procedure.make('BM');
            view['procedure']('brandmelding');
        },
        'evacuation': function () {
            lastEntity = 'fire';
            lastAction = 'evacuation';
            render.procedure.make('BREV');
            view['procedure']('brandevacuatie');
        }
    },

    'page': {
        'previous': function () {
            lastEntity = 'page';
            lastAction = 'previous';
            frame = 0;
            window.history.back();
        },
        'nextFrame': function() {
            frame = frame + 1;
            controller[lastEntity][lastAction]();
        },
        'prevFrame': function () {
            frame = frame - 1;
            controller[lastEntity][lastAction]();
        }
        
    }
};


setUserInfo = function (fname, lname, id) {
    vos.model.identity.firstName = fname;

    vos.model.identity.lastName = lname;

    vos.model.identity.loggedIn = true;

    controller['home']['index']();

    //window.location.assign("index.html#home-index");
}



var logAction = function (ProcedureTitle, ProcedureCode, StepTitle, CallNumber, ActionCode){
    /*
    naam van de gebruiker;
het email adres van de gebruiker;
rol van de gebruiker;

de titel en code van de procedure;
de titel van de stap in de procedure;
het telefoonnummer waarnaar gebeld of gesms't wordt;

het telefoonnummer waarvan gebeld of gesms't wordt;
    */


 //   vos.model.identity.mobile

    var UserName = vos.model.identity.firstName + ' ' + vos.model.identity.lastName;
    var Email = vos.model.identity.email;
    var Role = vos.model.identity.role;
   //  ProcedureTitle
   //  ProcedureCode 
   //  StepTitle
  //   CallNumber 
    var sendNumber = vos.model.identity.mobile;
    // ActionCode

    var logEntry = {
        "UserName": UserName,
        "Email": Email,
        "Role": Role,
        "ProcedureCode": ProcedureCode,
        "ProcedureTitle": ProcedureTitle,
        "StepTitle": StepTitle,
        "ActionCode": ActionCode,
        "CallNumber": CallNumber,
        "SendNumber": sendNumber };

/*
    body:
    {
        "UserName": "uname",
            "Email": "email",
                "Role": "role",
                    "ProcedureCode": "pcode",
                        "ProcedureTitle": "ptitle",
                            "StepTitle": "stitle",
                                "ActionCode": "acode",
                                    "CallNumber": "callnum",
                                        "SendNumber": "sendnum"
    }*/

    var logCache = JSON.parse(localStorage.getItem('logCache'));

    if (logCache == null) {
        logCache = new Array();
    }

    logCache.push(logEntry);

    localStorage.setItem('logCache', JSON.stringify(logCache));
}