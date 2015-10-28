#更新记录　CHANGELOG

## v1.1.1（2015.10.28）
* 删除发布到 NPM 的无关内容。

## v1.1.0（2015.10.22）
* 升级 API 兼容 PostCSS 5.0；
* 增加支持 `overflow-wrap` 兼容性处理；
* 增加支持 `will-change` 兼容性处理；
* 分割任务；
* 切换到 eslint 进行代码检查。

## v1.0.5（2015.9.22）
* 修复人为设置 `position: aboslute || fixed` 或 `float: left` 与 `display: block` 共存时的代码误清理问题。

## v1.0.0（2015.6.14）
* 稳定测试通过发布到 npm。

## v0.2.1（2015.5.18）
* 增加测试用例。

## v0.2.0（2015.5.18）
* 切换至 PostCSS 插件模式。

## v0.1.0（2015.5.15）
*. 去除用不到的功能；
*. 优化 `insertDecl()`，支持一次添加多个属性；
*. 优化任务名和顺序；
*. 使用 declFlag 替换原标识；
*. 增加 IE6 双倍边距 bug 修正；
*. 增加 IE6 `overflow: hidden` 失效 bug 修正。
