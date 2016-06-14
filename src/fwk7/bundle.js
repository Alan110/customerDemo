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

	/* WEBPACK VAR INJECTION */(function(A) {var myApp = A.myApp;

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
	        $$(".view[data-page=" + page + "]").show();
	    });
	}

	function changeView(role) {
	   if(role == 2) {
	        $$(".panel-left a[data-page=index]").remove();
	        $$(".panel-left a[data-page=order-index]").remove();
	        $$(".panel-left a[data-page=link-index]").remove();
	        $$(".view[data-page=index]").hide();
	        $$(".view[data-page=product-index]").show();
	   }
	   if (role != 1) {
	        $$("#l-add-user").remove();
	   }
	   if ( !(role == 1 || role == 2)) {
	        $$(".panel-left a[data-page=product-index]").remove();
	        $$(".view[data-page=product-index]").hide();
	   }

	}

	function init(role) {
	    changeView(role);
	    leftPanel();
	    __webpack_require__(2);
	    //__inline('view-linker.js');
	    //__inline('view-product.js');
	    //__inline('view-order.js');
	    __webpack_require__(3);
	}


	A.getRole().then(init);


	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 1 */
/***/ function(module, exports) {

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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(A) {var myApp = A.myApp;
	var mainView = myApp.addView('.view-main', {
	    // Because we use fixed-through navbar we can enable dynamic navbar
	    dynamicNavbar: true
	});

	// Callbacks to run specific code for specific pages, for example for About page:
	myApp.onPageInit('index', function(page) {
	    // run createContentPage func after link was clicked
	    A.getData("allCustomers")
	        .then(function(data) {
	            //渲染customer-list页
	            $$("#l-customer-list").html(Template7.templates.tCustomerList(data));
	            $$("#l-loading-wrapper").remove();
	            //点击进入info页
	            $$("#l-customer-list").on("click", "li", function() {
	                A.getData("getCustomerInfo", {
	                    _id: $$(this).data("id")
	                }).then(function(data) {
	                    console.log(data);
	                    data.data[0]['title'] = '客户详情';
	                    mainView.router.loadContent(Template7.templates.tCustomerInfo(data));
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
	                A.getData("getAllLinkerNames").then(function(data){
	                    data.data[0] = {title:"添加用户"};
	                    mainView.router.loadContent(Template7.templates.tCustomerInfo(data));
	                });
	            });

	        });
	}).trigger();

	myApp.onPageInit('customer-info', function(page) {

	    $$('#l-add-saveCustomer').on('click', function(e) {
	        var $self = $$(this);
	        setTimeout(function(){
	            page.view.router.refreshPreviousPage()
	            $self.val("提交中...").attr("disabled","disabled");
	        },0);
	        setTimeout(function(){
	            $self.val("提交成功");
	        },300);
	        setTimeout(function(){
	            page.view.router.back();
	        },600);
	    });

	    //添加linker
	    $$("#l-add-link").on("click", function() {
	        var _id = $$("#customer-info ._id").val();
	        var name = $$("#customer-info .name").val();
	        if( !_id  && !name){
	            myApp.alert('请先创建客户名' , "warn");
	            return ;
	        }
	        var data = { 
	            data : [
	                {
	                    allCustomerNames : [ {_id : _id ,name :name ,select : true} ]
	                }
	            ] 
	        };
	        mainView.router.loadContent(Template7.templates.tLinkerInfo(data));
	    });

	});

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(A) {A.templates.tUserInfo = Template7.compile(__webpack_require__(4));
	var myApp = A.myApp;
	var userView = myApp.addView('.view-user', {
	    // Because we use fixed-through navbar we can enable dynamic navbar
	    dynamicNavbar: true
	});

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
	                        "userRole" : role
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

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = "        <div class=\"navbar\">\n          <div class=\"navbar-inner\">\n            <div class=\"left\"><a href=\"#\" class=\"link back\"> <i class=\"icon icon-back\"></i><span>Back</span></a></div>\n            <div class=\"center sliding\">{{data[0].title}}</div>\n            <div class=\"right\">\n              <!-- Right link contains only icon - additional \"icon-only\" class--><a href=\"#\" class=\"link icon-only open-panel\"> <i class=\"icon icon-bars\"></i></a>\n            </div>\n          </div>\n        </div>\n        <div class=\"pages\">\n          <!-- Page, data-page contains page name-->\n          <div data-page=\"user-info\" class=\"page\" id=\"user-info\">\n            <!-- Scrollable page content-->\n            <div class=\"page-content\">\n                <div class=\"list-block\">\n                    <form action=\"/saveUser\" method=\"post\" enctype=\"x-www-form-urlencoded\" class=\"ajax-submit\">\n                      <input type=\"hidden\" class=\"_id\" name=\"_id\" value=\"{{data[0]._id}}\">\n                      <ul>\n                        <!-- Text inputs -->            \n                        <li>\n                          <div class=\"item-content\">\n                            <div class=\"item-inner\">\n                              <div class=\"item-title label\">用户名</div>\n                              <div class=\"item-input\">\n                                <input type=\"text\" name=\"name\" value=\"{{data[0].name}}\" placeholder=\"Name\">\n                              </div>\n                            </div>\n                          </div>\n                        </li>\n                        <li>\n                          <div class=\"item-content\">\n                            <div class=\"item-inner\">\n                              <div class=\"item-title label\">密码</div>\n                              <div class=\"item-input\">\n                                <input type=\"text\" name=\"pswd\" value=\"{{data[0].pswd}}\" placeholder=\"Name\">\n                              </div>\n                            </div>\n                          </div>\n                        </li>\n\n                        <li>\n                          <div class=\"item-content\">\n                            <div class=\"item-inner\">\n                              <div class=\"item-title label\">称呼</div>\n                              <div class=\"item-input\">\n                                <input type=\"text\" name=\"call\" value=\"{{data[0].call}}\" placeholder=\"Call\">\n                              </div>\n                            </div>\n                          </div>\n                        </li>\n                        <li>\n                          <div class=\"item-content\">\n                            <div class=\"item-inner\">\n                              <div class=\"item-title label\">邮箱</div>\n                              <div class=\"item-input\">\n                                <input type=\"email\" name=\"email\" value=\"{{data[0].email}}\" placeholder=\"E-mail\">\n                              </div>\n                            </div>\n                          </div>\n                        </li>\n                        <li>\n                          <div class=\"item-content\">\n                            <div class=\"item-inner\">\n                              <div class=\"item-title label\">电话</div>\n                              <div class=\"item-input\">\n                                <input type=\"tel\" placeholder=\"phone\" value=\"{{data[0].phone}}\" name=\"phone\">\n                              </div>\n                            </div>\n                          </div>\n                        </li>\n                          <li>\n                        </li>\n                        <li data-role=\"{{data[0].role}}\" {{#js_compare \"this.data[0].userRole != '1' \"}}style=\"display:none;\"{{/js_compare}}\n>\n                          <a href=\"#\" class=\"item-link smart-select\" data-searchbar=\"true\" data-searchbar-placeholder=\"Search fruits\">\n                            <!-- select -->\n                            <select name=\"role\" value={{data[0].role}}>\n                                <option>请选择</opton>\n                                <option value=\"1\" {{#js_compare \"this.data[0].role == '1' \"}}selected=selected{{/js_compare}}>系统管理员</opton>\n                                <option value=\"2\" {{#js_compare \"this.data[0].role == '2' \"}}selected=selected{{/js_compare}}>产品管理员</opton>\n                                <option value=\"3\" {{#js_compare \"this.data[0].role == '3' \"}}selected=selected{{/js_compare}}>销售员</opton>   \n                            </select>\n                            <div class=\"item-content\">\n                              <div class=\"item-inner\">\n                                <div class=\"item-title\">用户角色</div>\n                                <div class=\"item-after\"></div>\n                              </div>\n                            </div>\n                          </a>\n                        </li>\n                        <li>\n                          <div class=\"item-content\">\n                            <div class=\"item-inner\">\n                              <div class=\"item-title label\">备注</div>\n                              <div class=\"item-input\">\n                                <textarea placeholder=\"note\"  name=\"note\">{{data[0].note}}</textarea>\n                              </div>\n                            </div>\n                          </div>\n                        </li>\n                      </ul>\n\t\t\t\t  <div class=\"content-block-title\">\n\t\t\t\t\t\t<input id=\"l-add-saveUser\" type=\"submit\" class=\"button active\" style=\"height:40px;line-height:40px;\" value=\"确定\">\n\t\t\t\t  </div>\n                  </form>\n\t\t\t\t</div>\n            </div>\n          </div>\n        </div>\n"

/***/ }
/******/ ]);