userDataTable = $('#userDataTable').DataTable({
    "bLengthChange": false,
    "bServerSide": true,
    "bFilter": false,
    "bProcessing": true,
    "bSort": true,
    "sAjaxSource": CONSTANT_PATH + "/user/queryUsers",
    "fnServerParams": function (aDataSet) {
        aDataSet.push({"name": "userRole", "value": $("#roles").val()}, {
            "name": "userNo",
            "value": $("#userNo1").val()
        }, {"name": "userName", "value": $("#userName").val()}, {
            "name": "createStartDt",
            "value": $("#createStartDt").val()
        }, {"name": "createEndDt", "value": $("#createEndDt").val()});
    },
    "fbServerData": function (sSource, aDataSet) {
        $.ajax({"dataType": "json", "type": "GET", "url": sSource, "data": aDataSet});
    },
    "aoColumns": [{"mDataProp": "userNo"}, {"mDataProp": "userName"}, {"mDataProp": "ext1"}, {"mDataProp": "createDate"}, {"mDataProp": "locked"}],
    "aoColumnDefs": [
        {orderable: false, targets: [1, 2, 3, 4]},
        {
            "aTargets": [0], "mRender": function (data, type, full) {
            return (full.locked) ? data + "&nbsp;<span class='label label-danger'><i class='icon-lock'></i></span>" : data;
        }
        },
        {
            "aTargets": [4], "mRender": function (data, type, full) {
            var lockAction = (data) ? "<i class='icon-lock-open'></i> 解封用户" : "<i class='icon-lock'></i> 禁封用户";
            var operation = "<div class='btn-group'><a class='btn btn-default btn-sm'  id='query'  data-id='" + full.userId + "'data-json='" + JSON.stringify(full) + "'><i class='fa fa-file-text-o'></i>  用户详情</a><a href='#' type='button' class='btn btn-default btn-sm dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'><span class='caret'></span></a><ul class='dropdown-menu'>";
            operation += "<li><a id='reset' data-value='" + full.userNo + "' data-id='" + full.userId + "'><i class='icon-puzzle'></i>  重置密码</a></li>";
            operation += "<li><a id='alterRole' data-value='" + full.userNo + "' data-id='" + full.userId + "'><i class='icon-users'></i> 变更角色</a></li>";
            operation += "<li><a id='lock' data-value='" + data + "' data-type='" + full.userName + "' data-id='" + full.userId + "'>" + lockAction + "</a></li>";
            return operation + "<li><a id='dltRole' data-name='" + full.userName + "' data-id='" + full.userId + "'><i class='fa fa-remove'></i> 删除用户</a></li></ul></div>";
        }
        }, {
            "aTargets": [1, 2, 3], "mRender": function (data, type, full) {
                if (data != null && data != "")return data; else return "<font color='font-red-mint'>尚未设置</font>";
            }
        }],
    "oLanguage": {"sUrl": CONSTANT_PATH + "/resources/assets/plugins/dataTables/txt/page.txt"}
});