// FileName: index.js
// ProjectName: FFAdmin
// 作者: 区区电脑 GYFlash
// CreateTime: 2019-06-20 10:32

$FFAdmin.init(['element', 'form'], function (ui) {
    console.log(ui);
    ////// 展开收缩
    function hasAppClass () {
        let appClass = '';
        if (window.document.body.clientWidth >= 768) {
            appClass = 'layadmin-side-shrink';
        } else {
            appClass = 'layadmin-side-spread-sm';
        }
        if ($('#LAY_app').hasClass(appClass)) {
            return true;
        } else {
            return false;
        }
    }
    function sideReChange () {
        let appClass = '';
        if (window.document.body.clientWidth >= 768) {
            appClass = 'layadmin-side-shrink';
        } else {
            appClass = 'layadmin-side-spread-sm';
        }
        if (hasAppClass()) {
            $('#LAY_app').removeClass(appClass);
        } else {
            $('#LAY_app').addClass(appClass);
        }
        if ($('#LAY_app_flexible').attr('class') === 'layui-icon layui-icon-shrink-right') {
            $('#LAY_app_flexible').attr('class', 'layui-icon layui-icon-spread-left');
        } else {
            $('#LAY_app_flexible').attr('class', 'layui-icon layui-icon-shrink-right');
        }
    }
    $FFAdmin.addEvent('refresh', function () {
        window.location.reload();
    });
    if (window.document.body.clientWidth >= 768) {
        $('#LAY_app_flexible').attr('class', 'layui-icon layui-icon-shrink-right');
    } else {
        $('#LAY_app_flexible').attr('class', 'layui-icon layui-icon-spread-left');
    }
    window.onresize = function () {
        if (window.document.body.clientWidth >= 768) {
            $('#LAY_app_flexible').attr('class', 'layui-icon layui-icon-shrink-right');
        } else {
            $('#LAY_app_flexible').attr('class', 'layui-icon layui-icon-spread-left');
        }
    };
    $FFAdmin.addEvent('shade', function () {
        $FFAdmin.emitEvent('flexible')
    });
    $FFAdmin.addEvent('flexible', function () {
        console.log('flexible');
        sideReChange();
    });
    $FFAdmin.emitEventsAll();
    ///// tips
    let tips;
    $('a').on({
        mouseenter:function(){
            let that = this;
            let tipsName = $(this).attr('lay-tips');

            if (tipsName && hasAppClass() && window.document.body.clientWidth >= 768) {
                tips =layer.tips(tipsName,that);
            }
            // tips =layer.tips(tipsName,that,{tips:[2,'#fff'],time:0,area: 'auto',maxWidth:500});
        },
        mouseleave:function(){
            if (tips) {
                layer.close(tips);
            }
        }
    });
    ///// 侧边栏
    $('#LAY-system-side-menu a').click(function () {
        if (hasAppClass()&& window.document.body.clientWidth >= 768) {
            $FFAdmin.emitEvent('flexible')
        } else {
        }
    });
})
