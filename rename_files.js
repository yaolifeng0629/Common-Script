const fs = require('fs');
const path = require('path');

// 指定要重命名文件的目录路径
const directoryPath = process.argv[2];

if (!directoryPath) {
    console.error('请提供目录路径作为参数！');
    console.error('使用方法: node rename_files.js <目录路径>');
    process.exit(1);
}

// 确保目录存在
if (!fs.existsSync(directoryPath)) {
    console.error('指定的目录不存在！');
    process.exit(1);
}

// 读取目录中的所有文件
fs.readdir(directoryPath, (err, files) => {
    if (err) {
        console.error('读取目录失败:', err);
        return;
    }

    files.forEach(file => {
        const oldPath = path.join(directoryPath, file);

        // 检查是否是文件
        if (fs.statSync(oldPath).isFile()) {
            // 使用正则表达式匹配 lesson 后面的数字
            const match = file.match(/lesson\d+/i);
            
            if (match) {
                // 获取匹配到的 lesson 部分
                const newName = match[0] + path.extname(file);
                const newPath = path.join(directoryPath, newName);

                // 重命名文件
                fs.rename(oldPath, newPath, err => {
                    if (err) {
                        console.error(`重命名文件 ${file} 失败:`, err);
                    } else {
                        console.log(`成功重命名: ${file} -> ${newName}`);
                    }
                });
            }
        }
    });
});
