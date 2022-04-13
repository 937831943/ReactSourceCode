// 深度优先遍历
let root = {
    key: 'A1',
    children: [
        {
            key: 'B1',
            children: [
                {
                    key: 'C1',
                    children: []
                },
                {
                    key: 'C2',
                    children: []
                }
            ]
        },
        {
            key: 'B2',
            children: [
                {
                    key: 'C3',
                    children: []
                },
                {
                    key: 'C4',
                    children: []
                }
            ]
        }
    ]
}
// 这种遍历是递归调用，执行栈会越来越深，而且不能中断，此方法为React16版本之前的协调算法
function walk (ele) {
    console.log(ele.key);
    ele.children.forEach(element => {
        walk(element)
    });
}
walk(root)