const fs = require('fs-extra');
const yaml = require('js-yaml');
const Handlebars = require('handlebars');

async function generate() {
    // 创建目录
    await fs.ensureDir('dist/css');
    await fs.ensureDir('dist/icons');
    
    // 复制静态文件
    await fs.copy('src/static/css', 'dist/css');
    if (await fs.pathExists('icons')) {
        await fs.copy('icons', 'dist/icons');
    }
    
    // 读取数据
    const bookmarks = yaml.load(await fs.readFile('bookmarks.yaml', 'utf8'));
    const categories = [...new Set(bookmarks.links.map(link => link.category))];
    
    // 生成页面
    const template = Handlebars.compile(await fs.readFile('src/templates/index.html', 'utf8'));
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
    
    await fs.writeFile('dist/index.html', template(data));
}

generate().catch(console.error); 