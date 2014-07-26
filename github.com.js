(function() {

    // homepage: https://github.com/

    var modifier = {

        preDefinedBodyClasses: {
            'Dashboard': 'page-dashboard',
            'Profile': 'page-profile',
            'Repo': 'vis-public'
        },

        pageClasses: [],

        curPage: '',

        initDashboard: function () {
            // dashboard page

            var self = this;

            this.dashboard = {};

            this.dashboard.currentNewsCnt = 0;
            this.dashboard.elNews = document.querySelector('#dashboard .news');

            this.updateDashboardNewsCnt();
            this.handleNews(0);

            MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

            var observer = new MutationObserver(function(mutations, observer) {
                self.updateDashboardNewsCnt();
            });

            observer.observe(this.dashboard.elNews, {
                subtree: true,
                attributes: true
            });

            Object.observe(this.dashboard, function (changed) {
                if (changed[0].name === 'currentNewsCnt') {
                    self.handleNews(changed[0].oldValue);
                }
            });
        },

        updateDashboardNewsCnt: function () {
            this.dashboard.currentNewsCnt = this.dashboard.elNews.querySelectorAll('.alert').length;
        },

        handleNews: function (startIndex) {
            var $el, cls, methodName, 
                raw, user, avatar;
            var self = this;
            var endIndex = this.dashboard.currentNewsCnt;
            var elTitles = document.querySelectorAll('.alert'); // .slice(startIndex, endIndex);
            var avatarPool = [];
            var userElemMap = {};
            // var userNames = [];
            var storedAvt = localStorage.getItem('dotjs_avatar_info') || '';
            var storedAvtInfo = {};
            var unstoredAvt = {};
            var opts = {};

            try {
                storedAvtInfo = JSON.stringify(storedAvt);
            } catch (e) {
                storedAvtInfo = {};
            }

            // collect user names and elements
            for (var i = startIndex, len = endIndex; i < len; i += 1) {
                $el = $(elTitles[i]);
                avatarPool = avatarPool.concat(this.handleSingleNews($el));
            }

            // build user <=> elem arr map
            avatarPool.forEach(function (raw, key) {
                user = raw.user;
                $el = raw.$el;
                opts.user = user;

                // insert img tag before $el
                $img = $(self.getImgHTMLStr(opts));
                $img.insertBefore($el);
                $el.css('paddingLeft', '24px');

                if (userElemMap.hasOwnProperty(user)) {
                    userElemMap[user].push(raw.$el);
                } else {
                    userElemMap[user] = [raw.$el];
                }
            });

            // get user avatars
            for (user in userElemMap) {
                if (storedAvtInfo.hasOwnProperty(user)) {
                    avatar = storedAvtInfo[user];
                    userElemMap[user].forEach(function ($el) {
                        $img = $el.prev();
                        $img.attr('src', avatar);
                    });
                } else {
                    unstoredAvt[user] = userElemMap[user];
                }
            }
        },

        getImgHTMLStr: function (opts) {
            var str = [
                '<img class="dotjs-avatar" ',
                ' src="http://api.iryan.net/github-avatar/',
                opts.user, '"',
                ' width="20" height="20" ',
                ' style="position: absolute; box-shadow: 0 1px 0 #fff; border-radius: 3px;',
                '" />'
            ].join('');

            return str;
        },

        handleSingleNews: function ($el) {

            var res = [];
            var $elUserName = $el.find('.title a:eq(0)');
            var userNameTxt = $elUserName.text();
            var sourceRepo = $el.find('.title a:eq(1)');
            var sourceUserNameTxt = sourceRepo.text().split('/')[0];

            res.push({
                $el: $elUserName,
                user: userNameTxt 
            });

            if (sourceUserNameTxt !== userNameTxt) {
                res.push({
                    $el: sourceRepo,
                    user: sourceUserNameTxt
                });
            }

            // hide opensource news avatar.
            $el.find('.details img').hide();

            // console.log(res);
            return res;
        },

        initProfile: function () {
            // profile page
        },

        initRepo: function () {
            // repo related pages.
        },

        initCurPage: function () {
            if (!this.curPage) {
                return false;
            }

            var methodName = 'init' + this.curPage;

            this[methodName]();
        },

        getCurPage: function () {
            var key, curPage = '';

            for (key in this.preDefinedBodyClasses) {
                if ($.inArray(this.preDefinedBodyClasses[key], this.pageClasses) > -1) {
                    curPage = key;
                    break;
                }
            }

            return key;
        },

        init: function () {
            this.pageClasses = document.body.className.split(' ');
            this.curPage = this.getCurPage();
            this.initCurPage();
        }
    };

    modifier.init();


})();