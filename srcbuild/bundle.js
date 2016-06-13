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

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// Initialize your app
	var myApp = new Framework7({
	    precompileTemplates: true
	});

	// Export selectors engine
	var $$ = Dom7;
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
	    //changeView(role);
	//    leftPanel();
	   __webpack_require__(2);
	   // __inline('view-linker.js');
	   // __inline('view-product.js');
	   // __inline('view-order.js');
	   // __inline('view-user.js');
	}


	getRole().then(init);



/***/ },
/* 2 */
/***/ function(module, exports) {

	var mainView = myApp.addView('.view-main', {
	    // Because we use fixed-through navbar we can enable dynamic navbar
	    dynamicNavbar: true
	});


	// Callbacks to run specific code for specific pages, for example for About page:
	myApp.onPageInit('index', function(page) {
	    // run createContentPage func after link was clicked
	    getData("allCustomers")
	        .then(function(data) {
	            //渲染customer-list页
	            $$("#l-customer-list").html(Template7.templates.tCustomerList(data));
	            $$("#l-loading-wrapper").remove();
	            //点击进入info页
	            $$("#l-customer-list").on("click", "li", function() {
	                getData("getCustomerInfo", {
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
	                        toDo("removeCustomer", {
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
	                getData("getAllLinkerNames").then(function(data){
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

	module.exports = {};


/***/ }
/******/ ]);