function initTableHeight(){
    //拿到父窗口的centerTabs高度(这是iframe子页面拿到父窗口元素的方法，需要根据自己项目所使用的框架自行修改元素的id)
    //var panelH = $("#contain", parent.document).height();
    //var panelH1 = $("#dhmenu", parent.document).height();
    //拿到顶部工具栏高度
    var toolBarH = $("#tablebox").height();
    var height = toolBarH - 70;
    //var toolBarH1 = $("#titlebox").height();
    //var toolBarH2 = $("#tabletopbox").height();
    //计算表格container该设置的高度
    //var height = panelH - panelH1-toolBarH-toolBarH1-toolBarH2 - 150;
    //console.log(panelH)
    //console.log(toolBarH)
    //console.log(toolBarH1)
    //console.log(toolBarH2)
    //console.log(height)
    var container = $(".fixed-table-container").css({"height": height});
}