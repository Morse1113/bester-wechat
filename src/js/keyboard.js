import Vue from 'vue'
let keyboard = {
  bind: function (el) { // el是绑定视图区的父元素
    Vue.nextTick(function () {
      var inputs =     document.querySelectorAll('input', el);
      for (var i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('focus',  keyboard.changeBodyHeight)//focus的时候改变body的高度
      }
    });
  },
  unbind: function (el) {
    var inputs = document.querySelectorAll('input', el);
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].removeEventListener('focus', keyboard.changeBodyHeight)//失去焦点的时候再次改变body的高度
    }
  },
  changeBodyHeight: function () {
    document.body.style.height = document.body.scrollHeight + 'px';
  },
  priority: 1000
};
export default keyboard;
