// 模拟JSX
let A1 = { type: 'div', key: 'A1' }
let B1 = { type: 'div', key: 'B1', return: A1 }
let B2 = { type: 'div', key: 'B2', return: A1 }
let C1 = { type: 'div', key: 'C1', return: B1 }
let C2 = { type: 'div', key: 'C2', return: B1 }
A1.child = B1
B1.sibling = B2
B1.child = C1
C1.sibling = C2

/**
 * 从顶点开始，如果有大儿子，先遍历大儿子
 */
let rootFiber = A1
let nextUnitOfWork = null // 下一执行单元

function workLoop (deadline) {
    // 如果有待执行的执行单元，就执行，然后会返回下一个执行单元
    while ((deadline.timeRemaining() || deadline.didTimeout) && nextUnitOfWork) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    }
    if (!nextUnitOfWork) {
        console.log('render阶段结束了');
        console.log(Date.now() - startTime);
    } else {
        requestIdleCallback(workLoop, { timeout: 1000 })
    }
}
function performUnitOfWork (fiber) {
    beginWork(fiber) // 处理当前fiber
    if (fiber.child) { // 如果有儿子，返回大儿子
        return fiber.child
    }
    // 如果没有儿子，说明此fiber深度优先遍历的深度已完成，广度逐层遍历开始
    while (fiber) {
        completeUnitOfWork(fiber)
        if (fiber.sibling) {
            return fiber.sibling
        }
        fiber = fiber.return
    }
}
function sleep (dely) {
    for (let start = Date.now(); Date.now() - start <= dely;) { }
}
function completeUnitOfWork (fiber) {
    console.log('结束', fiber.key);
}
function beginWork (fiber) {
    sleep(20)
    console.log('开始', fiber.key);
}

nextUnitOfWork = rootFiber
let startTime = Date.now()
requestIdleCallback(workLoop, { timeout: 1000 })