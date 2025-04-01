const https = require('https');
const fs = require('fs');
const path = require('path');

// 中国著名景点图片URLs（请确保这些URL可以访问）
const imageUrls = [
  {
    name: 'great-wall.png',
    url: 'https://www.chinahighlights.com/travelguide/image/greatwall/greatwall-body3.jpg'
  },
  {
    name: 'terracotta-army.png',
    url: 'https://www.chinahighlights.com/travelguide/article-images/terracotta-army-1.jpg'
  },
  {
    name: 'forbidden-city.png',
    url: 'https://www.chinahighlights.com/travelguide/image/forbiddencity/forbidden-city-top-view.jpg'
  },
  {
    name: 'li-river.png',
    url: 'https://www.chinahighlights.com/guilin/attraction/images/li-river-cruise.jpg'
  },
  {
    name: 'yellow-mountain.png',
    url: 'https://www.chinahighlights.com/huangshan/attraction/images/huangshan-scenic-area.jpg'
  },
  {
    name: 'zhangjiajie.png',
    url: 'https://www.chinahighlights.com/zhangjiajie/attraction/images/zhangjiajie-national-forest-park.jpg'
  },
  {
    name: 'potala-palace.png',
    url: 'https://www.chinahighlights.com/travelguide/image/tibet/potala-palace.jpg'
  },
  {
    name: 'three-gorges.png',
    url: 'https://www.chinahighlights.com/yangtze/three-gorges/image/three-gorges.jpg'
  },
  {
    name: 'reed-flute-cave.png',
    url: 'https://www.chinahighlights.com/guilin/attraction/images/reed-flute-cave.jpg'
  },
  {
    name: 'west-lake.png',
    url: 'https://www.chinahighlights.com/hangzhou/attraction/images/leifeng-pagoda-west-lake.jpg'
  },
  {
    name: 'leshan-buddha.png',
    url: 'https://www.chinahighlights.com/leshan/attraction/image/leshan-grand-buddha.jpg'
  },
  {
    name: 'jiuzhaigou.png',
    url: 'https://www.chinahighlights.com/jiuzhaigou/attraction/images/jiuzhaigou-valley.jpg'
  }
];

// 确保目标目录存在
const imagesDir = path.join(process.cwd(), 'public', 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// 下载函数
function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    console.log(`Downloading ${filename} from ${url}...`);
    
    const filePath = path.join(imagesDir, filename);
    const file = fs.createWriteStream(filePath);
    
    https.get(url, response => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download image: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${filename} successfully.`);
        resolve(filePath);
      });
    }).on('error', err => {
      fs.unlink(filePath, () => {}); // 删除可能的部分文件
      reject(err);
    });
    
    file.on('error', err => {
      fs.unlink(filePath, () => {}); // 删除可能的部分文件
      reject(err);
    });
  });
}

// 下载所有图片
async function downloadAllImages() {
  console.log('Starting to download China attractions images...');
  
  try {
    const promises = imageUrls.map(image => downloadImage(image.url, image.name));
    await Promise.all(promises);
    console.log('All images downloaded successfully!');
  } catch (error) {
    console.error('Error downloading images:', error);
  }
}

// 执行下载
downloadAllImages(); 