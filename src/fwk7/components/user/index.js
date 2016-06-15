
var myApp = A.myApp;

$$(".view").append(require("./index.html"));

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

    A.templates.tUserInfo = Template7.compile(require('./tUserInfo.tpl'));

}


module.exports = {
    init: init
}
