/*
* @description Table自由选中組件，请自行设置table的td样式为 user-select: none
* @author MO(772332013@qq.com)
* @update 2021/02/07
* @param selector
* @example new TableSelect('.table')
*/

class TableSelect  {
    constructor (selector) {
        // 记录选择器
        this.selector = selector
        this.el = document.querySelector(selector)
        // 初始化
        this.init()
    }
    init () {
        // 鼠标状态
        this.mouseStatus = false
        // 开始和结束的td下标
        this.startIndex = this.endIndex = 0
        // 创建style标签，插入可选中的选择器样式
        this.createStyleEl()
        // 绑定鼠标事件
        this.bindEv()
    }
    isFocus (path) {
        // 检测是否在选择器元素上
        let result = false
        for(let item of path) {
            if(item === this.el) result = true
        }
        return result
    }
    createStyleEl () {
        // 创建style标签
        this.style = document.createElement('style')
        document.head.appendChild(this.style)
    }
    setEnable () {
        // 设置可选中的选择器样式

        let str = []
        let min = Math.min(this.startIndex, this.endIndex)
        let max = Math.max(this.startIndex, this.endIndex)

        for(let i = min; i < max + 1; i++) {
            str.push(`${this.selector} td:nth-child(${i}){user-select:unset!important}`)
        }
        this.style.innerHTML = str.join('')
    }
    bindEv () {
        // 鼠标按下的时候
        window.addEventListener('mousedown', ({ button, path, srcElement, target }) => {
            // 仅监听左键事件，如果鼠标在选择器元素上，开始操作
            if(button == 0 && this.isFocus(path)) {
                this.mouseStatus = true
                this.startIndex = this.endIndex = (target || srcElement).cellIndex + 1
                this.setEnable()
            }
        }, false)

        window.addEventListener('mousemove', ({ path, srcElement, target }) => {
            // 当开始监听之后，如果鼠标在选择器元素上，开始操作
            if(this.mouseStatus && this.isFocus(path)) {
                let endIndex = (target || srcElement).cellIndex + 1
                if(!Number.isNaN(endIndex) && endIndex != this.endIndex) {
                    this.endIndex = endIndex
                    this.setEnable()
                }
            }
        }, false)

        window.addEventListener('mouseup', () => {
            // 释放鼠标
            this.mouseStatus = false
        }, false)
    }
}
