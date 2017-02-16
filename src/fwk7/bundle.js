/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(A, $$) {"use strict";

	var myApp = A.myApp;

	function leftPanel() {
	    var $index = $$(".view-main");
	    var $linker = $$(".view-linkman");
	    var $product = $$(".view-product");
	    var $order = $$(".view-order");

	    var $views = $$(".view");
	    var $panel = $$(".panel-left");

	    $panel.on("click", ".l-section", function () {
	        myApp.closePanel();
	        var page = $$(this).data("page");
	        $views.hide();
	        if (!A.getView(page)) {
	            !/* require.ensure */(function () {/* WEBPACK VAR INJECTION */(function($$) {
	                var md = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./components/indexxxxx.js\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	                md.init();
	                $$(".view[data-page=" + page + "]").show();
	            
	/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(2)))}(__webpack_require__));
	        } else {
	            $$(".view[data-page=" + page + "]").show();
	        }
	    });
	}

	function changeView(role) {
	    if (role == 2) {
	        $$(".panel-left a[data-page=index]").remove();
	        $$(".panel-left a[data-page=order-index]").remove();
	        $$(".panel-left a[data-page=link-index]").remove();
	        $$(".view[data-page=index]").hide();
	        $$(".view[data-page=product-index]").show();
	    }
	    if (role != 1) {
	        $$("#l-add-user").remove();
	    }
	    if (!(role == 1 || role == 2)) {
	        $$(".panel-left a[data-page=product-index]").remove();
	        $$(".view[data-page=product-index]").hide();
	    }
	}

	function init(role) {
	    changeView(role);
	    leftPanel();
	    var customer = __webpack_require__(3);
	    customer.init();
	    var name = 'alan';
	    var tpl = "<li>" + name + "</li>";
	    console.log(tpl);
	    //__inline('view-linker.js');
	    //__inline('view-product.js');
	    //__inline('view-order.js');
	    //    require('./components/user/index.js');
	}

	A.getRole().then(init);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(2)))

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($$) {"use strict";

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
	            success: function success(res) {
	                if (res.data) {
	                    resolve(res);
	                } else {
	                    reject("no-data");
	                }
	            }
	        });
	    });
	}

	function getRole() {
	    return new Promise(function (resolve, reject) {
	        $$.ajax({
	            url: mySite + "getRole",
	            dataType: "json",
	            crossDomain: true,
	            success: function success(res) {
	                console.log(res);
	                if (res) {
	                    if (res.status == "redirect") {
	                        location.href = "login.html";
	                    }
	                    resolve(res.user.role);
	                } else {
	                    reject("no-data");
	                }
	            }
	        });
	    });
	}

	function toDo(query, data) {
	    return new Promise(function (resolve, reject) {
	        $$.ajax({
	            url: mySite + query,
	            data: data,
	            dataType: "json",
	            crossDomain: true,
	            success: function success(res) {
	                if (res.status === "ok") {
	                    resolve(res);
	                } else {
	                    reject("fail");
	                }
	            }
	        });
	    });
	}

	function getView(name) {
	    myApp.views.forEach(function (el, index) {
	        if (el[name]) {
	            return el;
	        }
	    });
	}

	module.exports = {
	    myApp: myApp,
	    getData: getData,
	    toDo: toDo,
	    templates: {},
	    getRole: getRole,
	    getView: getView
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = Dom7;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(A, $$) {'use strict';

	var myApp = A.myApp;

	$$('.views').append(__webpack_require__(4));
	var mainView = myApp.addView('.view-main', {
	    // Because we use fixed-through navbar we can enable dynamic navbar
	    dynamicNavbar: true
	});

	function init() {
	    // Callbacks to run specific code for specific pages, for example for About page:
	    myApp.onPageInit('index', function (page) {
	        // run createContentPage func after link was clicked
	        A.getData("allCustomers").then(function (data) {
	            //渲染customer-list页
	            $$("#l-customer-list").html(A.templates.tCustomerList(data));
	            $$("#l-loading-wrapper").remove();
	            //点击进入info页
	            $$("#l-customer-list").on("click", "li", function () {
	                A.getData("getCustomerInfo", {
	                    _id: $$(this).data("id")
	                }).then(function (data) {
	                    console.log(data);
	                    data.data[0]['title'] = '客户详情';
	                    mainView.router.loadContent(A.templates.tCustomerInfo(data));
	                }, function (res) {
	                    if (res == "no-data") {
	                        console.warn(res);
	                    }
	                });
	            });

	            // 点击删除,禁止冒泡,只用js api 删除,否则会触发li的点击
	            $$("#l-customer-list .swipeout-delete").on("click", function (e) {
	                var li = $$(this).parent().parent();
	                myApp.confirm('您确定删除吗?', '删除该用户', function () {
	                    A.toDo("removeCustomer", {
	                        _id: li.data("id")
	                    }).then(function () {
	                        myApp.swipeoutDelete(li);
	                    }, function () {
	                        myApp.alert("删除失败");
	                    });
	                }, function () {
	                    myApp.swipeoutClose(li);
	                });
	                e.stopPropagation();
	                e.preventDefault();
	                return false;
	            });

	            //添加用户
	            $$("#l-add-customer").on("click", function () {
	                A.getData("getAllLinkerNames").then(function (data) {
	                    data.data[0] = {
	                        title: "添加用户"
	                    };
	                    mainView.router.loadContent(A.templates.tCustomerInfo(data));
	                });
	            });
	        });
	    }).trigger();

	    myApp.onPageInit('customer-info', function (page) {

	        $$('#l-add-saveCustomer').on('click', function (e) {
	            var $self = $$(this);
	            setTimeout(function () {
	                page.view.router.refreshPreviousPage();
	                $self.val("提交中...").attr("disabled", "disabled");
	            }, 0);
	            setTimeout(function () {
	                $self.val("提交成功");
	            }, 300);
	            setTimeout(function () {
	                page.view.router.back();
	            }, 600);
	        });

	        //添加linker
	        $$("#l-add-link").on("click", function () {
	            var _id = $$("#customer-info ._id").val();
	            var name = $$("#customer-info .name").val();
	            if (!_id && !name) {
	                myApp.alert('请先创建客户名', "warn");
	                return;
	            }
	            var data = {
	                data: [{
	                    allCustomerNames: [{
	                        _id: _id,
	                        name: name,
	                        select: true
	                    }]
	                }]
	            };
	            mainView.router.loadContent(A.templates.tLinkerInfo(data));
	        });
	    });
	}

	A.templates.tCustomerList = Template7.compile(__webpack_require__(5));
	//A.templates.tCustomerInfo = Template7.compile(require('./tCustomerInfo.tpl'));
	//A.templates.tLinkerInfo = Template7.compile(require('../linker/tLinkerInfo.tpl'));

	module.exports = {
	    init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(2)))

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = "<div class=\"view view-main navbar-fixed\"><div class=navbar><div class=navbar-inner><div class=\"center sliding\">客户支持系统</div><div class=right><a href=# class=\"link icon-only open-panel\"><i class=\"icon icon-bars\"></i></a></div></div></div><div class=\"pages navbar-through toolbar-through\"><div data-page=index class=page><form data-search-list=#l-customer-list data-search-in=.item-title class=\"searchbar searchbar-init\"><div class=searchbar-input><input type=search placeholder=Search><a href=# class=searchbar-clear></a></div><a href=# class=searchbar-cancel>Cancel</a></form><div class=searchbar-overlay></div><div class=page-content><div class=content-block-title><div class=row><div class=col-70 style=line-height:30px;>客户列表</div><div class=col-30><a href=# id=l-add-customer class=\"button button-round active\">添加客户</a></div></div></div><div class=list-block id=l-customer-list></div><div class=content-block id=l-loading-wrapper style=text-align:center;><span class=\"preloader l-loading\"></span></div></div></div></div></div>"

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = "<ul>{{#each data}}<li class=swipeout data-id={{_id}}><div class=\"swipeout-content item-content\"><div class=item-inner><div class=item-title>{{name}}</div></div></div><div class=swipeout-actions-right><a href=# class=swipeout-delete data-id={{_id}}>Delete</a></div></li>{{/each}}</ul>"

/***/ }
/******/ ]);