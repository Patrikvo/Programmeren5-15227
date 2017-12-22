/**
 * Created by jefin on 20/05/2017.
 */
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
    }
}

var identityFile = 'data/identity.json';
var ProcedureFilePrefix = 'data/procedure';
var ProcedureFileSuffix = '.json';
var PositionFile = 'data/position.json';
var organisationListFile = 'data/organisationList.json';
var modelStorageName = 'model';