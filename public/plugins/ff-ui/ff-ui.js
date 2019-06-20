// FileName: ff-ui
// ProjectName: express-typescript
// 作者: 区区电脑
// CreateTime: 2019/6/13

(function (w) {
    const FFUIName = 'ff-ui';
    const getRandom = function () {
        return parseInt(Math.random() * 1000000000);
    };
    let FFUI = {};

    // 消息提示
    let Alert = {
        AlertType: {
            success: 'success',
            warning: 'warning',
            error: 'error',
            normal: 'normal'
        },
        AlertPosition: {
            top: 'top',
            bottom: 'bottom',
            center: 'center'
        }
    };
    Alert.show = function (options) {
        let message = options.message || FFUIName;
        let type = options.type || Alert.AlertType.normal;
        let position = options.position || Alert.AlertPosition.top;
        let alertView = document.createElement('div');
        let id = getRandom();
        alertView.id = `alertView_${id}`;
        alertView.className = `ff-alert ff-alert-${type} ff-alert-${position}`;
        alertView.innerHTML = message;
        alertView.style.zIndex = 10;
        document.body.appendChild(alertView);
        let timeoutShow = setTimeout(function () {
            let width = alertView.clientWidth;
            alertView.style.width = width + 'px';
            if (position === Alert.AlertPosition.top) {
                if (document.body.clientWidth <= 768) {
                    width = document.body.clientWidth;
                }
                alertView.style.width = width + 'px';
                alertView.style.transform = 'translateY(0px)';
                alertView.style.left = (document.body.clientWidth - width) / 2 + 'px';
            } else if (position === Alert.AlertPosition.center) {
                alertView.style.transform = 'scale(1)';
                alertView.style.left = (document.body.clientWidth - width - 10) / 2 + 'px';
            } else if (position === Alert.AlertPosition.bottom) {
                alertView.style.transform = 'translateY(-50px)';
                alertView.style.left = (document.body.clientWidth - width - 10) / 2 + 'px';
            }
            clearTimeout(timeoutShow);
            timeoutShow = null;
        }, 10);
        let timeoutHide = setTimeout(function () {
            let timeoutAnimation = setTimeout(function () {
                alertView.remove();
                clearTimeout(timeoutHide);
                clearTimeout(timeoutAnimation);
                timeoutHide = null;
                timeoutAnimation = null;
            }, 500);
            if (position === Alert.AlertPosition.top) {
                alertView.style.transform = 'translateY(-200px)';
            } else if (position === Alert.AlertPosition.center) {
                alertView.style.transform = 'scale(0)';
            } else if (position === Alert.AlertPosition.bottom) {
                alertView.style.transform = 'translateY(200px)';
            }
        }, 3000);
    };

    FFUI.Alert = Alert;
    FFUI.alert = function (options) {
        if (typeof options === 'string') {
            Alert.show({
                message: options
            })
        } else {
            Alert.show(options)
        }
    };
    // 询问弹框
    let Confirm = {};
    Confirm.show = function (options) {
        let title = options.title || FFUIName;
        let message = options.message || FFUIName;
        let cover = options.cover || false;
        let callback = options.callback || console.error('FFUI.Confirm.callback is undefined');
        // coverView
        let coverView = document.createElement('div');
        let id = getRandom();
        coverView.id = `coverView_${id}`;
        coverView.style.position = 'fixed';
        coverView.style.top = 0;
        coverView.style.left = 0;
        coverView.style.bottom = 0;
        coverView.style.right = 0;
        coverView.style.zIndex = 10;
        coverView.style.display = 'flex';
        coverView.style.justifyContent = 'center';
        coverView.style.alignItems = 'center';
        coverView.style.backgroundColor = 'rgba(0, 0, 0, 0)';
        coverView.style.transition = 'all .3s';

        // content
        let contentView = document.createElement('div');
        contentView.style.width = '300px';
        contentView.style.padding = '10px';
        contentView.style.borderRadius = '2px';
        contentView.style.backgroundColor = '#ffffff';
        contentView.style.display = 'flex';
        contentView.style.flexDirection = 'column';
        contentView.style.justifyContent = 'flex-between';
        contentView.style.marginTop = '-200px';
        contentView.style.boxShadow = '0 0 5px 0 rgba(0, 0, 0, .3)';
        contentView.style.transition = 'all .3s';
        contentView.style.transform = 'scale(0)';
        // title
        let titleView = document.createElement('span');
        titleView.style.lineHeight = '40px';
        titleView.style.fontSize = '16px';
        titleView.style.textAlign = 'left';
        titleView.style.color = '#000000';
        titleView.innerHTML = title;
        // message
        let messageView = document.createElement('span');
        messageView.style.lineHeight = '30px';
        messageView.style.fontSize = '14px';
        messageView.style.textAlign = 'left';
        messageView.style.whiteSpace = 'pre-wrap';
        messageView.style.display = 'inline-block';
        messageView.style.maxWidth = '100%';
        messageView.style.color = 'gray';
        messageView.innerHTML = message;
        // buttonGroup
        let buttonGroup = document.createElement('div');
        buttonGroup.style.width = '100%';
        buttonGroup.style.textAlign = 'right';
        buttonGroup.style.marginTop = '20px';
        // button
        let buttonSure = document.createElement('div');
        buttonSure.className = 'ff-button ff-button-primary';
        buttonSure.innerHTML = '确定';
        buttonSure.style.margin = '0 10px';
        let buttonCancel = document.createElement('div');
        buttonCancel.className = 'ff-button';
        buttonCancel.innerHTML = '取消';
        buttonSure.onclick = function () {
            callback(true);
            hide();
        };
        buttonCancel.onclick = function () {
            callback(false);
            hide();
        };
        buttonGroup.appendChild(buttonCancel);
        buttonGroup.appendChild(buttonSure);
        contentView.appendChild(titleView);
        contentView.appendChild(messageView);
        contentView.appendChild(buttonGroup);
        coverView.appendChild(contentView);
        document.body.appendChild(coverView);
        let showTimeout = setTimeout(function () {
            if (cover) {
                coverView.style.backgroundColor = 'rgba(0, 0, 0, .3)';
            } else {
                coverView.style.backgroundColor = 'rgba(0, 0, 0, 0)'
            }
            contentView.style.transform = 'scale(1.0)';
            clearTimeout(showTimeout);
            showTimeout = null;
        }, 1);
        function hide() {
            coverView.style.backgroundColor = 'rgba(0, 0, 0, 0)';
            contentView.style.transform = 'scale(.5)';
            let hideTimeout = setTimeout(function () {
                coverView.remove();
                clearTimeout(hideTimeout);
                hideTimeout = null;
            }, 100)
        }
    };
    FFUI.Confirm = Confirm;
    FFUI.confirm = Confirm.show;
    // 加载动画

    w.$FFUI = FFUI;
})(window);


