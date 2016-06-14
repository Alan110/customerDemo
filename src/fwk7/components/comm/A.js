// Initialize your app
var myApp = new Framework7({
    precompileTemplates: true
});

var mySite = 'http://127.0.0.1:8888/';

function getData(query, data) {
    return new Promise(function (resolve, reject) {
        $$.ajax({
            url: mySite + query,
            data: data,
            dataType: "json",
            crossDomain: true,
            success: function (res) {
                if (res.data) {
                    resolve(res);
                } else {
                    reject("no-data");
                }
            }
        })
    });
}

function getRole() {
    return new Promise(function (resolve, reject) {
        $$.ajax({
            url: mySite + "getRole",
            dataType: "json",
            crossDomain: true,
            success: function (res) {
                console.log(res);
                if (res) {
                    if(res.status == "redirect"){
                        location.href = "login.html";
                    }
                    resolve(res.user.role);
                } else {
                    reject("no-data");
                }
            }
        })
    });
}

function toDo(query, data) {
    return new Promise(function (resolve, reject) {
        $$.ajax({
            url: mySite + query,
            data: data,
            dataType: "json",
            crossDomain: true,
            success: function (res) {
                if (res.status === "ok") {
                    resolve(res);
                } else {
                    reject("fail");
                }
            }
        })
    });
}

module.exports = {
    myApp : myApp,
    getData : getData,
    toDo : toDo,
    templates : {},
    getRole : getRole
}
