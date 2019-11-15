## dillPlugin 动态链接库(webpack 内置的)

优化打包速度 对运行速度没有帮助

## 如何打包第三方库

dll 功能在开发之前，抽离好，打好包
暂时存在个小问题

## tree-shaking(webpack 内置的)

默认只支持 es6 的树摇晃，去除没有用的代码
去除没有用的文件(副作用) // "sideEffects":true //但是会有额外的副作用 ==> // "sideEffects":['**/*.css']
只在生产环境下被调用 // optimization: { usedExports:true } //提示的作用
静态导入 //import {} from 'xxx' ; 动态的 //require ('xxx')

## scope-hoisting(webpack 内置的)

只在生产环境下 1) 减少作用域 2) 预计算
