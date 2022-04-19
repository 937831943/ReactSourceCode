import ELEMENT_TEXT from '../constants'
/**
 * 创建元素（虚拟DOM）的方法
 * @param {*} type 元素的类型（标签）（DOM）
 * @param {*} config 配置对象属性key ref
 * @param  {...any} children 放着所有的儿子，这里会做成一个数组
 */
function createRoot (type, config, ...children) {
    delete config._self
    delete config._source
    return {
        type,
        props: {
            ...config,
            children: children.map(ele => {
                let child = ele
                if (typeof child !== 'object') {
                    child = {
                        type: ELEMENT_TEXT,
                        props: { text: ele, children: [] }
                    }
                }
                return child
            })
        }
    }
}
const React = { createRoot }
export default React
