/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);

/******/ 	};

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		0:0
/******/ 	};

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

/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);

/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;

/******/ 			script.src = __webpack_require__.p + "" + chunkId + "." + ({}[chunkId]||chunkId) + ".js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};

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

	/* WEBPACK VAR INJECTION */(function(A, $$) {var myApp = A.myApp;

	function leftPanel() {
	    var $index = $$(".view-main");
	    var $linker = $$(".view-linkman");
	    var $product = $$(".view-product");
	    var $order = $$(".view-order");

	    var $views = $$(".view");
	    var $panel = $$(".panel-left");

	    $panel.on("click", ".l-section", function() {
	        myApp.closePanel();
	        var page = $$(this).data("page");
	        $views.hide();
	        if (!A.getView(page)) {
	            __webpack_require__.e/* nsure */(1, function(require){
	                var md = __webpack_require__(9)("./" + page + "/index.js");
	                md.init();
	            });
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
	    //__inline('view-linker.js');
	    //__inline('view-product.js');
	    //__inline('view-order.js');
	    __webpack_require__(6);
	}


	A.getRole().then(init);

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(2)))

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($$) {// Initialize your app
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

	function getView(name) {
	    myapp.views.forEach(function(el,index){
	        if (el[name]) {
	           return el; 
	        }
	    });
	}

	module.exports = {
	    myApp : myApp,
	    getData : getData,
	    toDo : toDo,
	    templates : {},
	    getRole : getRole,
	    getView : getView
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = Dom7;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(A, $$) {
	var myApp = A.myApp;

	$$('.views').append(__webpack_require__(4));
	var mainView = myApp.addView('.view-main', {
	    // Because we use fixed-through navbar we can enable dynamic navbar
	    dynamicNavbar: true
	});

	function init() {
	    // Callbacks to run specific code for specific pages, for example for About page:
	    myApp.onPageInit('index', function(page) {
	        // run createContentPage func after link was clicked
	        A.getData("allCustomers")
	            .then(function(data) {
	                //渲染customer-list页
	                $$("#l-customer-list").html(A.templates.tCustomerList(data));
	                $$("#l-loading-wrapper").remove();
	                //点击进入info页
	                $$("#l-customer-list").on("click", "li", function() {
	                    A.getData("getCustomerInfo", {
	                        _id: $$(this).data("id")
	                    }).then(function(data) {
	                        console.log(data);
	                        data.data[0]['title'] = '客户详情';
	                        mainView.router.loadContent(A.templates.tCustomerInfo(data));
	                    }, function(res) {
	                        if (res == "no-data") {
	                            console.warn(res);
	                        }
	                    });
	                });

	                // 点击删除,禁止冒泡,只用js api 删除,否则会触发li的点击
	                $$("#l-customer-list .swipeout-delete").on("click", function(e) {
	                    var li = $$(this).parent().parent();
	                    myApp.confirm('您确定删除吗?', '删除该用户',
	                        function() {
	                            A.toDo("removeCustomer", {
	                                _id: li.data("id")
	                            }).then(function() {
	                                myApp.swipeoutDelete(li);
	                            }, function() {
	                                myApp.alert("删除失败");
	                            })
	                        },
	                        function() {
	                            myApp.swipeoutClose(li);
	                        }
	                    );
	                    e.stopPropagation();
	                    e.preventDefault();
	                    return false;
	                })

	                //添加用户
	                $$("#l-add-customer").on("click", function() {
	                    A.getData("getAllLinkerNames").then(function(data) {
	                        data.data[0] = {
	                            title: "添加用户"
	                        };
	                        mainView.router.loadContent(A.templates.tCustomerInfo(data));
	                    });
	                });

	            });
	    }).trigger();

	    myApp.onPageInit('customer-info', function(page) {

	        $$('#l-add-saveCustomer').on('click', function(e) {
	            var $self = $$(this);
	            setTimeout(function() {
	                page.view.router.refreshPreviousPage()
	                $self.val("提交中...").attr("disabled", "disabled");
	            }, 0);
	            setTimeout(function() {
	                $self.val("提交成功");
	            }, 300);
	            setTimeout(function() {
	                page.view.router.back();
	            }, 600);
	        });

	        //添加linker
	        $$("#l-add-link").on("click", function() {
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
	    init : init
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

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(A, $$) {
	var myApp = A.myApp;

	$$(".view").append(__webpack_require__(7));

	var userView = myApp.addView('.view-user', {
	    // Because we use fixed-through navbar we can enable dynamic navbar
	    dynamicNavbar: true
	});

	function init() {
	    myApp.onPageInit('user-index', function(page) {
	        // run createContentPage func after link was clicked
	        A.getData("allUser")
	            .then(function(data) {
	                //渲染customer-list页
	                $$("#l-user-list").html(A.templates.tCustomerList(data));
	                $$("#l-loading-wrapper-user").remove();
	                //点击进入info页
	                $$("#l-user-list").on("click", "li", function() {
	                    A.getData("getUserInfo", {
	                        _id: $$(this).data("id")
	                    }).then(function(data) {
	                        console.log(data);
	                        data.data[0]['title'] = '用户详情';
	                        data.data[0]['userRole'] = role;
	                        userView.router.loadContent(A.templates.tUserInfo(data));
	                    }, function(res) {
	                        if (res == "no-data") {
	                            console.warn(res);
	                        }
	                    });
	                });

	                // 点击删除,禁止冒泡,只用js api 删除,否则会触发li的点击
	                $$("#l-user-list .swipeout-delete").on("click", function(e) {
	                    var li = $$(this).parent().parent();
	                    myApp.confirm('您确定删除吗?', '删除该用户',
	                        function() {
	                            A.toDo("removeUser", {
	                                _id: li.data("id")
	                            }).then(function() {
	                                myApp.swipeoutDelete(li);
	                            }, function() {
	                                myApp.alert("删除失败");
	                            })
	                        },
	                        function() {
	                            myApp.swipeoutClose(li);
	                        }
	                    );
	                    e.stopPropagation();
	                    e.preventDefault();
	                    return false;
	                })

	                //添加user
	                $$("#l-add-user").on("click", function() {
	                    var data = {
	                        data: [{
	                            "title": '添加用户',
	                            "userRole": role
	                        }]
	                    };
	                    userView.router.loadContent(Template7.templates.tUserInfo(data));
	                });

	            });
	    }).trigger();


	    myApp.onPageInit('user-info', function(page) {
	        $$('#l-add-saveUser').on('click', function(e) {
	            var $self = $$(this);
	            setTimeout(function() {
	                page.view.router.refreshPreviousPage()
	                $self.val("提交中...").attr("disabled", "disabled");
	            }, 0);
	            setTimeout(function() {
	                $self.val("提交成功");
	            }, 300);
	            setTimeout(function() {
	                page.view.router.back();
	            }, 600);
	        });

	    });

	    A.templates.tUserInfo = Template7.compile(__webpack_require__(8));

	}


	module.exports = {
	    init: init
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(2)))

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = "<div class=\"view view-user navbar-fixed\" style=display:none;><div class=navbar><div class=navbar-inner><div class=\"center sliding\">用户列表</div><div class=right><a href=# class=\"link icon-only open-panel\"><i class=\"icon icon-bars\"></i></a></div></div></div><div class=\"pages navbar-through toolbar-through\"><div data-page=user-index class=page><form data-search-list=#l-user-list data-search-in=.item-title class=\"searchbar searchbar-init\"><div class=searchbar-input><input type=search placeholder=Search><a href=# class=searchbar-clear></a></div><a href=# class=searchbar-cancel>Cancel</a></form><div class=searchbar-overlay></div><div class=page-content><div class=content-block-title><div class=row><div class=col-70 style=line-height:30px;>用户列表</div><div class=col-30><a href=# id=l-add-user class=\"button button-round active\">添加用户</a></div></div></div><div class=list-block id=l-user-list></div><div class=content-block id=l-loading-wrapper-user style=text-align:center;><span class=\"preloader l-loading\"></span></div></div></div></div></div>"

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = "<div class=navbar><div class=navbar-inner><div class=left><a href=# class=\"link back\"><i class=\"icon icon-back\"></i><span>Back</span></a></div><div class=\"center sliding\">{{data[0].title}}</div><div class=right><a href=# class=\"link icon-only open-panel\"><i class=\"icon icon-bars\"></i></a></div></div></div><div class=pages><div data-page=user-info class=page id=user-info><div class=page-content><div class=list-block><form action=/saveUser method=post enctype=x-www-form-urlencoded class=ajax-submit><input type=hidden class=_id name=_id value={{data[0]._id}}><ul><li><div class=item-content><div class=item-inner><div class=\"item-title label\">用户名</div><div class=item-input><input type=text name=name value={{data[0].name}} placeholder=Name></div></div></div></li><li><div class=item-content><div class=item-inner><div class=\"item-title label\">密码</div><div class=item-input><input type=text name=pswd value={{data[0].pswd}} placeholder=Name></div></div></div></li><li><div class=item-content><div class=item-inner><div class=\"item-title label\">称呼</div><div class=item-input><input type=text name=call value={{data[0].call}} placeholder=Call></div></div></div></li><li><div class=item-content><div class=item-inner><div class=\"item-title label\">邮箱</div><div class=item-input><input type=email name=email value={{data[0].email}} placeholder=E-mail></div></div></div></li><li><div class=item-content><div class=item-inner><div class=\"item-title label\">电话</div><div class=item-input><input type=tel placeholder=phone value={{data[0].phone}} name=phone></div></div></div></li><li></li><li data-role={{data[0].role}} {{#js_compare \"this.data[0].userrole !=1 \"}}style=display:none; {{ js_compare}}><a href=# class=\"item-link smart-select\" data-searchbar=true data-searchbar-placeholder=\"Search fruits\"><select name=role value={{data[0].role}}><option>请选择</option><option value=1 {{#js_compare \"this.data[0].role=\"=\" '1' \"}}selected=selected{{/js_compare}}>系统管理员</option><option value=2 {{#js_compare \"this.data[0].role=\"=\" '2' \"}}selected=selected{{/js_compare}}>产品管理员</option><option value=3 {{#js_compare \"this.data[0].role=\"=\" '3' \"}}selected=selected{{/js_compare}}>销售员</option></select><div class=item-content><div class=item-inner><div class=item-title>用户角色</div><div class=item-after></div></div></div></a></li><li><div class=item-content><div class=item-inner><div class=\"item-title label\">备注</div><div class=item-input><textarea placeholder=note name=note>{{data[0].note}}</textarea></div></div></div></li></ul><div class=content-block-title><input id=l-add-saveUser type=submit class=\"button active\" style=height:40px;line-height:40px; value=确定></div></form></div></div></div></div>"

/***/ }
/******/ ]);