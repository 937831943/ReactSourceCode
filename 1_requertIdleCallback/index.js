/** 
 * @name requestIdleCallback
 * 用来申请时间切片
 */

function sleep (dely) { // 睡眠功能 模拟任务执行所耗时间
    let startTime = Date.now()
    while (Date.now() - startTime <= dely) { }
}

const works = [ // 事件队列， 单个函数模拟为最小执行单元不可拆分
    () => {
        console.log('第一个任务开始');
        sleep(20)
        console.log('第一个任务结束');
    },
    () => {
        console.log('第二个任务开始');
        sleep(20)
        console.log('第二个任务结束');
    },
    () => {
        console.log('第三个任务开始');
        sleep(20)
        console.log('第三个任务结束');
    },
]

window.requestIdleCallback(workLoop, { timeout: 1000 })

function workLoop (deadline) { // requestIdleCallback中的callback函数
    // deadline 是一个对象 有两个属性
    // timeRemaining() 可以返回此帧还剩下多少时间供调用者使用
    // didTimeout 此callback任务是否超时
    console.log(`本帧剩余时间为${parseInt(deadline.timeRemaining())}`);
    // 如果此帧的剩余时间超过0，或者此已经超时了 依次执行任务
    // 如果没有剩余时间，且未超时，就需要放弃执行任务控制权，执行权交还给浏览器
    while ((deadline.timeRemaining() || deadline.didTimeout) && works.length) {
        performUnitOfWork()
    }
    // 说明还有未执行的任务
    if (works.length) {
        window.requestIdleCallback(workLoop, { timeout: 1000 })
    }
}

function performUnitOfWork () {
    works.shift()()
}


