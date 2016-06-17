var myApp = A.myApp;

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
            require.ensure([],function(){
                var md = require("./components/" + page.split("-")[0] + "/index.js");
                md.init();
                $$(".view[data-page=" + page + "]").show();
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
    var customer = require('./components/customer/index.js');
    customer.init();
    var name = 'alan';
    var tpl = `<li>${name}</li>`;
    console.log(tpl);
    //__inline('view-linker.js');
    //__inline('view-product.js');
    //__inline('view-order.js');
//    require('./components/user/index.js');
}


A.getRole().then(init);
