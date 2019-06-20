// FileName: zui.public
// ProjectName: express-admin
// 作者: 区区电脑
// CreateTime: 2019/4/28
(function (w) {
    var webTool = {
        host: '',
        url: {
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
        },
        zuiIcons: '["icon-resize","icon-expand-full","icon-collapse-full","icon-yinyang","icon-window","icon-window-alt","icon-carousel","icon-spinner-snake","icon-spinner-indicator","icon-check-board","icon-bar-chart","icon-github","icon-dot-circle","icon-cube-alt","icon-cubes","icon-file-pdf","icon-file-word","icon-file-excel","icon-file-powerpoint","icon-file-image","icon-file-archive","icon-file-audio","icon-file-movie","icon-file-code","icon-circle-o-notch","icon-qq","icon-wechat","icon-history","icon-circle-thin","icon-sliders","icon-newspaper-o","icon-calculator","icon-paint-brush","icon-area-chart","icon-pie-chart","icon-line-chart","icon-toggle-off","icon-toggle-on","icon-diamond","icon-venus","icon-mars","icon-server","icon-music","icon-search","icon-envelope","icon-heart","icon-star","icon-star-empty","icon-user","icon-film","icon-th-large","icon-th","icon-th-list","icon-check","icon-times","icon-zoom-in","icon-zoom-out","icon-off","icon-cog","icon-trash","icon-home","icon-file-o","icon-time","icon-download-alt","icon-download","icon-upload","icon-inbox","icon-play-circle","icon-repeat","icon-refresh","icon-list-alt","icon-lock","icon-flag","icon-headphones","icon-volume-off","icon-volume-up","icon-qrcode","icon-barcode","icon-tag","icon-tags","icon-book","icon-bookmark","icon-print","icon-camera","icon-font","icon-bold","icon-italic","icon-header","icon-underline","icon-strikethrough","icon-eraser","icon-align-justify","icon-align-left","icon-list","icon-picture","icon-pencil","icon-map-marker","icon-adjust","icon-tint","icon-edit","icon-share","icon-checked","icon-arrows","icon-step-backward","icon-fast-backward","icon-backward","icon-play","icon-pause","icon-stop","icon-forward","icon-fast-forward","icon-step-forward","icon-eject","icon-chevron-left","icon-chevron-right","icon-plus-sign","icon-minus-sign","icon-remove-sign","icon-check-circle","icon-question-sign","icon-info-sign","icon-remove-circle","icon-check-circle-o","icon-ban-circle","icon-arrow-left","icon-arrow-right","icon-arrow-up","icon-arrow-down","icon-share-alt","icon-resize-full","icon-resize-small","icon-plus","icon-minus","icon-asterisk","icon-exclamation-sign","icon-gift","icon-leaf","icon-eye-open","icon-eye-close","icon-warning-sign","icon-plane","icon-calendar","icon-random","icon-comment","icon-chevron-up","icon-chevron-down","icon-shopping-cart","icon-folder-close","icon-folder-open","icon-resize-v","icon-resize-h","icon-bar-chart-alt","icon-camera-retro","icon-key","icon-cogs","icon-comments","icon-thumbs-o-up","icon-thumbs-o-down","icon-star-half","icon-heart-empty","icon-signout","icon-pushpin","icon-external-link","icon-signin","icon-trophy","icon-upload-alt","icon-lemon","icon-phone","icon-check-empty","icon-bookmark-empty","icon-phone-sign","icon-credit","icon-rss","icon-hdd","icon-bullhorn","icon-bell","icon-certificate","icon-hand-right","icon-hand-left","icon-hand-up","icon-hand-down","icon-circle-arrow-left","icon-circle-arrow-right","icon-circle-arrow-up","icon-circle-arrow-down","icon-globe","icon-wrench","icon-tasks","icon-filter","icon-group","icon-link","icon-cloud","icon-beaker","icon-cut","icon-copy","icon-paper-clip","icon-save","icon-sign-blank","icon-bars","icon-list-ul","icon-list-ol","icon-table","icon-magic","icon-caret-down","icon-caret-up","icon-caret-left","icon-caret-right","icon-columns","icon-sort","icon-sort-down","icon-sort-up","icon-envelope-alt","icon-undo","icon-dashboard","icon-comment-alt","icon-comments-alt","icon-bolt","icon-sitemap","icon-umbrella","icon-paste","icon-lightbulb","icon-exchange","icon-cloud-download","icon-cloud-upload","icon-bell-alt","icon-coffee","icon-file-text-o","icon-building","icon-double-angle-left","icon-double-angle-right","icon-double-angle-up","icon-double-angle-down","icon-angle-left","icon-angle-right","icon-angle-up","icon-angle-down","icon-desktop","icon-laptop","icon-tablet","icon-mobile","icon-circle-blank","icon-quote-left","icon-quote-right","icon-spinner","icon-circle","icon-reply","icon-folder-close-alt","icon-folder-open-alt","icon-expand-alt","icon-collapse-alt","icon-smile","icon-frown","icon-meh","icon-gamepad","icon-keyboard","icon-flag-alt","icon-flag-checkered","icon-terminal","icon-code","icon-reply-all","icon-star-half-full","icon-location-arrow","icon-crop","icon-code-fork","icon-unlink","icon-question","icon-info","icon-shield","icon-calendar-empty","icon-rocket","icon-chevron-sign-left","icon-chevron-sign-right","icon-chevron-sign-up","icon-chevron-sign-down","icon-html5","icon-anchor","icon-unlock-alt","icon-bullseye","icon-ellipsis-h","icon-ellipsis-v","icon-rss-sign","icon-play-sign","icon-minus-sign-alt","icon-plus-sign-alt","icon-check-minus","icon-check-plus","icon-level-up","icon-level-down","icon-check-sign","icon-edit-sign","icon-external-link-sign","icon-share-sign","icon-compass","icon-collapse","icon-collapse-top","icon-expand","icon-dollar","icon-yen","icon-file","icon-file-text","icon-sort-by-alphabet","icon-sort-by-alphabet-alt","icon-sort-by-attributes","icon-sort-by-attributes-alt","icon-sort-by-order","icon-sort-by-order-alt","icon-thumbs-up","icon-thumbs-down","icon-long-arrow-down","icon-long-arrow-up","icon-long-arrow-left","icon-long-arrow-right","icon-apple","icon-windows","icon-android","icon-linux","icon-sun","icon-moon","icon-archive","icon-bug","icon-zhifubao","icon-zhifubao-square","icon-taobao","icon-weibo","icon-renren","icon-chrome","icon-firefox","icon-ie","icon-opera","icon-safari","icon-node","icon-layout","icon-usecase","icon-stack","icon-branch","icon-chat","icon-chat-line","icon-chat-dot","icon-cube","icon-database","icon-chanzhi","icon-chanzhi-pro","icon-zsite","icon-zsite-pro"]',
        /**
         * zui 消息悬浮框
         * @param options
         */
        _message: function (options) {
            console.log(options);
            var type = options.type || 'warning';
            var msg = options.msg || 'hello 区区电脑';
            new $.zui.Messager(msg, {
                type: type,
                close: false
            }).show();
        },
        /**
         * 网络请求
         * @param options
         * @private
         */
        _request: function (options) {
            var _this = this;
            var url = options.url.path || '';
            var data = options.data || {};
            var type = options.url.type || 'get';
            var useToken = options.useToken;
            var success = options.success || function () { console.log('success 方法未定义，请求路径：' + options.url.path) };
            $.ajax({
                url: this.host + url,
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
                        _this._message({
                           msg: res.message
                        });
                        if (res.code == '201') {
                            setTimeout(function () {
                                window.location = '/admin/login';
                            }, 1000);
                        }
                        success(res)
                    }
                }
            })
        },
        _fileUpload: function (callback) {
            console.log('%c%s', 'color: green;', '添加文件按钮点击了');
            var _this = this;
            var tempId = parseInt(Math.random() * 1000000000);
            var input = document.createElement('input');
            var form = document.createElement('form');
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
                var formData = new FormData(form);
                // document.body.removeChild(form);
                var reader = new FileReader();
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
                                _this._message({
                                    msg: res.message,
                                    type: 'success'
                                });
                                callback(res)
                            } else {
                                _this._message({
                                    msg: res.message
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
        }
    };
    w.$wt = webTool;
})(window);
