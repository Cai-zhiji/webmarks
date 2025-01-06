const fs = require('fs-extra');
const yaml = require('js-yaml');
const Handlebars = require('handlebars');
const path = require('path');

async function generate() {
    const rootDir = path.join(__dirname, '..');
    const distDir = path.join(rootDir, 'dist');
    
    // 创建目录
    await fs.ensureDir(path.join(distDir, 'css'));
    await fs.ensureDir(path.join(distDir, 'icons'));
    
    // 复制静态文件
    await fs.copy(path.join(__dirname, 'static/css'), path.join(distDir, 'css'));
    const iconsDir = path.join(rootDir, 'icons');
    if (await fs.pathExists(iconsDir)) {
        await fs.copy(iconsDir, path.join(distDir, 'icons'));
    }
    
    // 读取数据
    const bookmarks = yaml.load(
        await fs.readFile(path.join(__dirname, 'bookmarks.yaml'), 'utf8')
    );
    const categories = [...new Set(bookmarks.links.map(link => link.category))];
    
    // 生成页面
    const template = Handlebars.compile(
        await fs.readFile(path.join(__dirname, 'templates/index.html'), 'utf8')
    );
    const data = {
        categories: [
            { name: '全部', link: '#' },
            ...categories.map(cat => ({ name: cat, link: `#${cat}` })),
            { name: '笔记', link: '#notes' }
        ],
        categoryLinks: categories.map(category => ({
            category,
            links: bookmarks.links.filter(link => link.category === category)
        })),
        notes: bookmarks.notes
    };
    
    await fs.writeFile(path.join(distDir, 'index.html'), template(data));
}

generate().catch(console.error); 