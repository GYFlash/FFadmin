// FileName: FFAdmin
// ProjectName: FFAdmin
// 作者: 区区电脑
// CreateTime: 2019/6/17
(function (w) {
    let FFAdmin = {};
    FFAdmin.init = function (models, callback) {
        let ui = {};
        layui.use(models, function () {
            for (let key in models) {
                ui[models[key]] = layui[models[key]];
            }
            if (callback) {
                callback(ui);
            }
        });
    };

    let layer;

    layui.use(['layer'], function () {
        layer = layui.layer;
    });
    FFAdmin.Name = 'FFAdmin';
    FFAdmin.Host = '';
    FFAdmin.Url = {
        adminLogin: { type: 'post', path: '/api/login' },
        adminRegister: { type: 'post', path: '/api/register' },
        adminGetUsers: { type: 'post', path: '/api/getUsers' },
        adminSetMenu: { type: 'post', path: '/api/set-menu' },
        adminGetMenu: { type: 'get', path: '/api/get-menu' },
        adminDelMenu: { type: 'post', path: '/api/del-menu' },
        // adminSetUserInfo: { type: 'post', path: '/api/set-user-info' },
        adminGetMyInfo: { type: 'post', path: '/api/get-my-info'},
        adminSetMyInfo: { type: 'post', path: '/api/set-my-info'},
        adminSetUserManager: { type: 'post', path: '/api/set-user-manager'},
        fileUpload: {type: 'post', path: '/api/file-upload'}
    };
    FFAdmin.Icons = [];
    /**
     * 消息悬浮框
     * @param options
     */
    FFAdmin.message = function (options) {
        console.log(options);
        if (typeof options === "string") {
            layer.msg(options);
        } else {
            let message = options.message || FFAdmin.Name;
            let type = options.type || '';
            layer.msg(options.message, { icon: type === 'success' ? 1 : 5});
        }
    };
    /**
     * 网络请求
     * @param options
     * @private
     */
    FFAdmin.request = function (options) {
        let _this = this;
        let url = options.url.path || '';
        let data = options.data || {};
        let type = options.url.type || 'get';
        let useToken = options.useToken || false;
        let success = options.success || function () { console.log('success 方法未定义，请求路径：' + options.url.path) };
        $.ajax({
            url: this.Host + url,
            beforeSend: function(request) {
                request.setRequestHeader("restype","json");
                if (useToken) {
                    request.setRequestHeader('token', window.localStorage.getItem('express_token'));
                }
            },
            data: data,
            type: type,
            success: function (res) {
                if (res.code == '000') {
                    success(res)
                } else {
                    _this.message(res.message);
                    if (res.code == '201') {
                        setTimeout(function () {
                            window.location = '/admin/login';
                        }, 1000);
                    }
                    success(res)
                }
            }
        })
    };
    /**
     * 文件上传
     * @param callback
     */
    FFAdmin.fileUpload = function (callback) {
        console.log('%c%s', 'color: green;', '添加文件按钮点击了');
        let _this = this;
        let tempId = parseInt(Math.random() * 1000000000);
        let input = document.createElement('input');
        let form = document.createElement('form');
        input.type = 'file';
        input.name = 'file';
        input.id = tempId;
        // form.style.display = 'none'
        form.id = 'form_' + tempId;
        form.enctype = 'multipart/form-data';
        form.appendChild(input);
        form.style.width = '1px';
        form.style.height = '1px';
        form.style.display = 'none';
        document.body.appendChild(form);
        input.onchange = function () {
            let formData = new FormData(form);
            // document.body.removeChild(form);
            let reader = new FileReader();
            reader.readAsDataURL(input.files[0]);
            reader.onload = (result) => {
                $.ajax({
                    url: _this.host + _this.url.fileUpload.path,
                    beforeSend: function(request) {
                        request.setRequestHeader("restype","json");
                        request.setRequestHeader('token', window.localStorage.getItem('express_token'));
                    },
                    data: formData,
                    type: _this.url.fileUpload.type,
                    processData: false,
                    contentType: false,
                    success: function (res) {
                        if (res.code == '000') {
                            _this.message({
                                message: res.message,
                                type: 'success'
                            });
                            callback(res)
                        } else {
                            _this.message({
                                message: res.message
                            });
                            if (res.code == '201') {
                                setTimeout(function () {
                                    window.location = '/admin/login';
                                }, 1000);
                            }
                            callback(res)
                        }
                    }
                })
            }
        };
        input.click()
    };
    //// 事件
    const FFEvent = {
        events: [],
        addEvent: function (eventName, eventBody) {
            if (!this.events[eventName]) {
                this.events[eventName] = []
            } else {}
            this.events[eventName].push(eventBody);
        },
        emitEvent: function (eventName, options) {
            let events = this.events[eventName];
            if (!events || events.length <= 0) {
                console.log('%c%s', 'color: orange;', '暂未添加该事件的监听器：eventName = ' + eventName);
                return;
            }
            for (let index in events) {
                let event = events[index];
                event(options);
            }
        },
        removeEvent: function (eventName) {
            let events = this.events[eventName];
            if (!events) {
                console.log('%c%s', 'color: orange;', '暂未添加该事件的监听器：eventName = ' + eventName);
                return;
            }
            events = [];
            delete this.events[eventName];
        }
    };
    /**
     * 添加事件监听
     * @param eventName
     * @param eventBody
     */
    FFAdmin.addEvent = function (eventName, eventBody) {
        FFEvent.addEvent(eventName, eventBody);
    };
    /**
     * 触发事件
     * @param eventName
     * @param options
     */
    FFAdmin.emitEvent = function (eventName, options) {
        FFEvent.emitEvent(eventName, options);
    };
    /**
     * 移除事件监听
     * @param eventName
     */
    FFAdmin.removeEvent = function (eventName) {
        FFEvent.removeEvent(eventName);
    };
    /**
     * 对所有标签绑定的事件名进行触发事件绑定
     */
    FFAdmin.emitEventsAll = function () {
        let eventBtns = document.getElementsByClassName('ff-event');
        for (let i = 0; i < eventBtns.length; i++) {
            let event = $(eventBtns[i]).attr('event-name');
            if (getBindedEvents(event)) {
                // let timeout = setTimeout(function () {
                //     eventsAll[event] = null;
                //     clearTimeout(timeout);
                //     timeout = null;
                // }, 1000)
            } else {
                eventBtns[i].onclick = function () {
                    FFAdmin.emitEvent(event);
                }
            }
        }
        // $('.ff-event').click(function () {
        //     let event = $(this).attr('event-name');
        //     if (getBindedEvents(event)) {
        //         let timeout = setTimeout(function () {
        //             eventsAll[event] = null;
        //             clearTimeout(timeout);
        //             timeout = null;
        //         }, 1000)
        //     } else {
        //         FFAdmin.emitEvent(event);
        //     }
        // });
    };
    const eventsAll = {};
    function getBindedEvents (name) {
        if (eventsAll[name]) {
            return true
        } else {
            eventsAll[name] = name;
            return false
        }
    }
    w.$FFAdmin = FFAdmin;
})(window);
