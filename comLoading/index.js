;
(function () {
   var scriptUrl = document.getElementById("loading-script").src;
   var srcArr = scriptUrl.split("flagPath=");
    var indexCss = srcArr[1]+"index.css";
    document.write('<link rel="stylesheet" href=' + indexCss + '>');
    var commonLoading = {
        template: '<transition name="com-loading-fade">' +
            '<div v-show="visible" class="com-loading-mask">' +
            '<p class="com-loading-text">{{ text }}</p>' +
            '</div>' +
            '</transition>',
        data: function () {
            return {
                text: '',
                visible: false
            }
        }
    };
    var LoadingConstructor = Vue.extend(commonLoading);

    let loadingFlag = undefined;

    LoadingConstructor.prototype.close = function () {
        // 如果loading 有引用，则去掉引用
        if (loadingFlag) {
            loadingFlag = undefined
        }
        // 先将组件隐藏
        this.visible = false
        // 延迟300毫秒，等待loading关闭动画执行完之后销毁组件
        setTimeout(() => {
            // 移除挂载的dom元素
            if (this.$el && this.$el.parentNode) {
                this.$el.parentNode.removeChild(this.$el)
            }
            // 调用组件的$destroy方法进行组件销毁
            this.$destroy()
        }, 300)
    }

    var Loading = (options = {}) => {
        // 如果组件已渲染，则返回即可
        if (loadingFlag) {
            return loadingFlag
        };
        // 要挂载的元素
        const parent = document.body
        // 组件属性
        const opts = {
            text: '',
            ...options
        };
        // 通过构造函数初始化组件 相当于 new Vue()
        const instance = new LoadingConstructor({
            el: document.createElement('div'),
            data: opts
        });
        // 将loading元素挂在到parent上面
        parent.appendChild(instance.$el)
        // 显示loading
        Vue.nextTick(() => {
            instance.visible = true
        });
        // 将组件实例赋值给loading
        loadingFlag = instance
        return instance
    }
    Vue.prototype.$loadingsg = Loading;
})();