;
(function () {
    // 3. mixins插件
    Vue.mixin({
        filters: {
            $_filterType: (num) => {
              return num.toFixed(2)
            }
        }
    })
})();