/**
 * 此脚本用于下载Leaflet默认的标记图标
 * 运行: node download-leaflet-icons.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const ICONS = [
  {
    name: 'marker-icon.png',
    url: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png'
  },
  {
    name: 'marker-icon-2x.png',
    url: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png'
  },
  {
    name: 'marker-shadow.png',
    url: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
  }
];

// 确保目标目录存在
const targetDir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// 下载文件函数
function downloadFile(url, filePath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filePath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
        console.log(`✅ 已下载: ${filePath}`);
      });
    }).on('error', (err) => {
      fs.unlink(filePath, () => {}); // 删除不完整的文件
      reject(err);
    });
  });
}

// 下载所有图标
async function downloadIcons() {
  try {
    for (const icon of ICONS) {
      const filePath = path.join(targetDir, icon.name);
      await downloadFile(icon.url, filePath);
    }
    console.log('✅ 所有图标下载完成!');
  } catch (error) {
    console.error('下载图标时出错:', error);
  }
}

downloadIcons(); 