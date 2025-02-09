const fs = require('fs');
const path = require('path');

// 获取命令行参数中的目录路径
const directoryPath = process.argv[2];

if (!directoryPath) {
    console.error('请提供目录路径！');
    console.log('使用方法: node deleteXmlFiles.js <目录路径>');
    process.exit(1);
}

// 确保目录存在
if (!fs.existsSync(directoryPath)) {
    console.error('目录不存在！');
    process.exit(1);
}

try {
    // 读取目录中的所有文件
    const files = fs.readdirSync(directoryPath);
    
    let deletedCount = 0;
    
    // 遍历所有文件
    files.forEach(file => {
        if (path.extname(file).toLowerCase() === '.xml') {
            const filePath = path.join(directoryPath, file);
            
            // 删除XML文件
            fs.unlinkSync(filePath);
            console.log(`已删除: ${filePath}`);
            deletedCount++;
        }
    });
    
    console.log(`\n操作完成！共删除 ${deletedCount} 个XML文件。`);
} catch (error) {
    console.error('发生错误:', error.message);
    process.exit(1);
}
