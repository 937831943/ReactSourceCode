import { TAG_ROOT } from '../constants'

/**
 * render 是要把每一个元素渲染到容器内部
 */
function render(element, container) { // container = root DOM节点
    const rootFiber = {
        // 每个Fiber都会有一个tag标识此元素的类型
        tag: TAG_ROOT,
        // 一般情况下如果这个元素是一个原生节点，那么stateNode指向的就是真是DOM元素
        stateNode: container,
        // props.children是一个数组，里面放的是React元素 虚拟DOM
        // 后面会根据每个React元素创建，对应的Fiber
        // 这个Fiber的属性对象里的children属性，里面放的是要渲染的元素
        props: { children: [element] }
    }
    scheduleRoot(rootFiber)
}

/**
 * 从根节点开始渲染和调度 
 * 两个阶段：diff, render 
 * diff阶段：对比新旧的虚拟DOM，进行增量更新或创建。
 * render阶段：这个阶段比较消耗时间，我们可以对任务进行拆分
 *            拆分的维度是虚拟DOM节点，此阶段可以暂停
 * render阶段的成功是 Effect list 知道哪些节点更新，删除或增加
 * commit阶段：进行DOM更新创建阶段，此阶段不能暂停，要一气呵成
 */
let nextUnitOfWork = null // 工作单元
let workInProgressRoot = null // RootFiber应用的根
function scheduleRoot(rootFiber) {
    // rootFiber：{ tag: TAG_ROOT, stateNode: container, props: { children: [element] } }
    workInProgressRoot = rootFiber
    nextUnitOfWork = rootFiber
}
// 循环执行工作
function workLoop(deadline) {
    // 是否让出时间片或者说浏览器控制权
    let shouldYield = false
    while (nextUnitOfWork) {
        // 执行完后 继续处理下个子任务
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
        // 没有时间的话就要交出浏览器控制权
        shouldYield = deadline.timeRemaining() < 1
    }
    if (nextUnitOfWork) {
        console.log('render阶段结束');
    }
    requestIdleCallback(workLoop, { timeout: 500 })
}
/**
 * React告诉浏览器，现在WorkLoop里有任务，在浏览器当前帧渲染完毕后有空余时间执行
 * React源码内部里有个优先级概念 -- ExpirationTimes
 */
requestIdleCallback(workLoop, { timeout: 500 })

const ReactDOM = { render }
export default ReactDOM