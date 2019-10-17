
import Vue from 'vue';
import store from '@/store'

// v-dialogDrag: 弹窗拖拽+全屏
Vue.directive('dialogDrag', {
    bind(el, binding, vnode, oldVnode) {
        //初始非全屏
        let isFullScreen = false;
        //当前宽高
        let nowWidth = 0;
        let nowHight = 0;
        //当前顶部高度
        let nowMarginTop = 0;
        const dialogHeaderEl = el.querySelector('.el-dialog__header');
        const dragDom = el.querySelector('.el-dialog');
        const elTitle = el.querySelector('.el-dialog__title');
        // 增加全屏按钮
        var newHtml = elTitle.innerHTML + "<button type='button' aria-label='Max' class='el-dialog__headerbtn'><img id='el-dialog__max' style='position:absolute;right:34px;width:12px;top:2px'  src='../static/dialog/max.png' class='el-dialog__max'/></button>"
        elTitle.innerHTML = newHtml;

        dialogHeaderEl.style.cursor = 'move';
        const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null);
        let moveDown = (e) => {
            // 鼠标按下，计算当前元素距离可视区的距离
            const disX = e.clientX - dialogHeaderEl.offsetLeft;
            const disY = e.clientY - dialogHeaderEl.offsetTop;
            let styL, styT;
            // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
            if (sty.left.includes('%')) {
                styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100);
                styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100);
            } else {
                styL = +sty.left.replace(/\px/g, '');
                styT = +sty.top.replace(/\px/g, '');
            };
            document.onmousemove = function (e) {
                // 通过事件委托，计算移动的距离
                const l = e.clientX - disX;
                const t = e.clientY - disY;
                // 移动当前元素 
                dragDom.style.left = `${l + styL}px`;
                dragDom.style.top = `${t + styT}px`;
            };
            document.onmouseup = function (e) {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        }
        dialogHeaderEl.onmousedown = moveDown;
        //全屏
        const toMax = el.querySelector('#el-dialog__max');
        toMax.onclick = (e) => {
            if (store.state.dialogfullscreen) {
                store.dispatch('dialogfullScreen', false);
            } else {
                store.dispatch('dialogfullScreen', true);
            }
        }
    }
})


// v-countRunning:数字动态增长
Vue.directive('countRunning', {
    bind(el, binding, vnode, oldVnode) {
        var timer = null;
        const targetDomCount = el.getAttribute('data-target')
        let nowCount = parseInt(el.innerHTML);
        timer = setInterval(() => {
            if (nowCount < targetDomCount) {
                nowCount++;
            } else {
                clearInterval(timer);
                timer = null;
            }
            el.innerHTML = nowCount;
        }, 80)

    }
})
 

