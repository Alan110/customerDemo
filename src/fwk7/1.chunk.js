webpackJsonp([1],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./customer/index.js": 3,
		"./user/index.js": 7
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 6;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(A, $$) {"use strict";

	var myApp = A.myApp;

	$$(".view").append(__webpack_require__(8));

	var userView = myApp.addView('.view-user', {
	    // Because we use fixed-through navbar we can enable dynamic navbar
	    dynamicNavbar: true
	});

	function init() {
	    myApp.onPageInit('user-index', function (page) {
	        // run createContentPage func after link was clicked
	        A.getData("allUser").then(function (data) {
	            //渲染customer-list页
	            $$("#l-user-list").html(A.templates.tCustomerList(data));
	            $$("#l-loading-wrapper-user").remove();
	            //点击进入info页
	            $$("#l-user-list").on("click", "li", function () {
	                A.getData("getUserInfo", {
	                    _id: $$(this).data("id")
	                }).then(function (data) {
	                    console.log(data);
	                    data.data[0]['title'] = '用户详情';
	                    data.data[0]['userRole'] = role;
	                    userView.router.loadContent(A.templates.tUserInfo(data));
	                }, function (res) {
	                    if (res == "no-data") {
	                        console.warn(res);
	                    }
	                });
	            });

	            // 点击删除,禁止冒泡,只用js api 删除,否则会触发li的点击
	            $$("#l-user-list .swipeout-delete").on("click", function (e) {
	                var li = $$(this).parent().parent();
	                myApp.confirm('您确定删除吗?', '删除该用户', function () {
	                    A.toDo("removeUser", {
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

	            //添加user
	            $$("#l-add-user").on("click", function () {
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

	    myApp.onPageInit('user-info', function (page) {
	        $$('#l-add-saveUser').on('click', function (e) {
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
	    });

	    A.templates.tUserInfo = Template7.compile(__webpack_require__(9));
	}

	module.exports = {
	    init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(2)))

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = "<div class=\"view view-user navbar-fixed\" style=display:none;><div class=navbar><div class=navbar-inner><div class=\"center sliding\">用户列表</div><div class=right><a href=# class=\"link icon-only open-panel\"><i class=\"icon icon-bars\"></i></a></div></div></div><div class=\"pages navbar-through toolbar-through\"><div data-page=user-index class=page><form data-search-list=#l-user-list data-search-in=.item-title class=\"searchbar searchbar-init\"><div class=searchbar-input><input type=search placeholder=Search><a href=# class=searchbar-clear></a></div><a href=# class=searchbar-cancel>Cancel</a></form><div class=searchbar-overlay></div><div class=page-content><div class=content-block-title><div class=row><div class=col-70 style=line-height:30px;>用户列表</div><div class=col-30><a href=# id=l-add-user class=\"button button-round active\">添加用户</a></div></div></div><div class=list-block id=l-user-list></div><div class=content-block id=l-loading-wrapper-user style=text-align:center;><span class=\"preloader l-loading\"></span></div></div></div></div></div>"

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = "<div class=navbar><div class=navbar-inner><div class=left><a href=# class=\"link back\"><i class=\"icon icon-back\"></i><span>Back</span></a></div><div class=\"center sliding\">{{data[0].title}}</div><div class=right><a href=# class=\"link icon-only open-panel\"><i class=\"icon icon-bars\"></i></a></div></div></div><div class=pages><div data-page=user-info class=page id=user-info><div class=page-content><div class=list-block><form action=/saveUser method=post enctype=x-www-form-urlencoded class=ajax-submit><input type=hidden class=_id name=_id value={{data[0]._id}}><ul><li><div class=item-content><div class=item-inner><div class=\"item-title label\">用户名</div><div class=item-input><input type=text name=name value={{data[0].name}} placeholder=Name></div></div></div></li><li><div class=item-content><div class=item-inner><div class=\"item-title label\">密码</div><div class=item-input><input type=text name=pswd value={{data[0].pswd}} placeholder=Name></div></div></div></li><li><div class=item-content><div class=item-inner><div class=\"item-title label\">称呼</div><div class=item-input><input type=text name=call value={{data[0].call}} placeholder=Call></div></div></div></li><li><div class=item-content><div class=item-inner><div class=\"item-title label\">邮箱</div><div class=item-input><input type=email name=email value={{data[0].email}} placeholder=E-mail></div></div></div></li><li><div class=item-content><div class=item-inner><div class=\"item-title label\">电话</div><div class=item-input><input type=tel placeholder=phone value={{data[0].phone}} name=phone></div></div></div></li><li></li><li data-role={{data[0].role}} {{#js_compare \"this.data[0].userrole !=1 \"}}style=display:none; {{ js_compare}}><a href=# class=\"item-link smart-select\" data-searchbar=true data-searchbar-placeholder=\"Search fruits\"><select name=role value={{data[0].role}}><option>请选择</option><option value=1 {{#js_compare \"this.data[0].role=\"=\" '1' \"}}selected=selected{{/js_compare}}>系统管理员</option><option value=2 {{#js_compare \"this.data[0].role=\"=\" '2' \"}}selected=selected{{/js_compare}}>产品管理员</option><option value=3 {{#js_compare \"this.data[0].role=\"=\" '3' \"}}selected=selected{{/js_compare}}>销售员</option></select><div class=item-content><div class=item-inner><div class=item-title>用户角色</div><div class=item-after></div></div></div></a></li><li><div class=item-content><div class=item-inner><div class=\"item-title label\">备注</div><div class=item-input><textarea placeholder=note name=note>{{data[0].note}}</textarea></div></div></div></li></ul><div class=content-block-title><input id=l-add-saveUser type=submit class=\"button active\" style=height:40px;line-height:40px; value=确定></div></form></div></div></div></div>"

/***/ }
]);