/**
 * @name Fiber
 * React16中新的协调引擎，其目的是使 Virtual DOM 可以进行增量式渲染。
 */
class update { // 更新
    constructor(playload, nextUpdate) {
        this.playload = playload // 数据
        this.nextUpdate = nextUpdate // 指向下一个节点的指针
    }
}
class updateQueue { // 更新队列
    constructor() {
        this.baseState = null // 初始状态
        this.firstUpdate = null // 第一个更新
        this.lastUpdate = null // 最后一个更新
    }
    enqueueUpdate (update) {
        if (this.firstUpdate === null) {
            this.firstUpdate = this.lastUpdate = update
        } else {
            // 上一个最后一个节点的nextUpdate指向自己
            this.lastUpdate.nextUpdate = update
            // 让最后一个节点指向自己
            this.lastUpdate = update
        }
    }
    forceUpdate () {
        let currentState = this.baseState || {} // 初始状态
        let currentUpdate = this.firstUpdate
        while (currentUpdate) {
            // 判断SetState的参数类型
            let nextState = currentUpdate.playload
            if (typeof currentUpdate.playload === 'function') {
                nextState = currentUpdate.playload(currentState)
            }
            // 将新旧状态进行合并
            currentState = { ...currentState, ...nextState }
            // 找下一个节点
            currentUpdate = currentUpdate.nextUpdate
        }
        // 完成合并后将更新的链表清空
        this.firstUpdate = this.lastUpdate = null
        this.baseState = currentState
        return currentState
    }
}
/**
 * @example 计数器
 * @State { number: 0 }
 * @update
 *  setState({ number: 1 })
 *  setState(state => ({ number: state.number + 1 })
 */
const queue = new updateQueue();
queue.enqueueUpdate(new update({ name: "What's is Fiber" }))
queue.enqueueUpdate(new update({ number: 0 }))
queue.enqueueUpdate(new update(state => ({ number: state.number + 1 })))
queue.enqueueUpdate(new update(state => ({ number: state.number + 1 })))
queue.forceUpdate()
console.log(queue.baseState);
