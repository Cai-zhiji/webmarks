# 个人书签导航生成器

一个简单的静态书签导航生成器，通过 YAML 配置管理书签和笔记，自动构建并部署到 GitHub Pages。

## 功能特点

- 通过 YAML 文件管理书签和笔记
- 支持自定义图标（可选）
- 按分类组织书签
- 支持笔记功能
- 自动构建和部署到 GitHub Pages
- 响应式布局

## 使用方法

1. Fork 本仓库
2. 启用 GitHub Pages（Settings -> Pages -> Build and deployment -> GitHub Actions）
3. 修改 `src/bookmarks.yaml` 添加你的书签和笔记
4. 推送到 main 分支，GitHub Actions 会自动构建并部署

## 配置说明

`src/bookmarks.yaml` 示例：

```yaml
links:
  - title: GitHub
    url: https://github.com
    description: 全球最大的代码托管平台
    category: 开发工具
    icon: icons/github.png  # 可选，自定义图标

  - title: VS Code
    url: https://code.visualstudio.com
    description: 最爱的代码编辑器
    category: 开发工具
    # 不配置 icon 则不显示图标

notes:
  - title: 关于我
    content: 个人介绍或其他内容

  - title: 技术笔记
    content: 一些技术笔记内容
```

### 自定义图标

1. 在 `icons` 目录下放置你的图标文件
2. 在 YAML 中通过相对路径引用：`icon: icons/example.png`

## 本地开发

```bash
# 安装依赖
npm install

# 构建
npm run build

# 构建结果在 dist 目录
```

## 目录结构

```
.
├── .github/workflows/    # GitHub Actions 配置
├── src/
│   ├── static/          # 静态资源
│   │   └── css/        # 样式文件
│   ├── templates/       # HTML 模板
│   ├── bookmarks.yaml   # 数据文件
│   └── generate.js      # 生成器脚本
├── icons/               # 自定义图标目录
└── package.json
```

## 自动部署

- 推送到 main 分支会自动触发构建和部署
- 构建状态可在 Actions 标签页查看
- 部署完成后可通过 GitHub Pages URL 访问

## 技术栈

- Node.js
- Handlebars（模板引擎）
- GitHub Actions
- GitHub Pages

## License

MIT 