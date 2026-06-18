# 准大学生工具箱

一个使用原生 HTML、CSS 和 JavaScript 制作的移动端友好网站。无需构建工具，功能和数据存储均在浏览器前端完成。

## 本地运行

推荐使用 Python 启动静态服务器：

```powershell
python -m http.server 8000
```

然后在浏览器打开：<http://localhost:8000>

停止服务器：在运行命令的终端中按 `Ctrl + C`。

如果电脑没有 Python，也可以安装 VS Code 的 Live Server 扩展，然后右键 `index.html`，选择 **Open with Live Server**。

## 数据说明

预算、清单、学习计划和投资复盘都保存在浏览器的 `localStorage` 中。清除当前站点的浏览器数据会同时清除这些记录。
