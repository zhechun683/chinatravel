/**
 * 此脚本用于生成PWA所需的各种尺寸的图标
 * 需要安装sharp: npm install sharp --save-dev
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// 确保icons目录存在
const iconsDir = path.join(__dirname, 'public', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// 源图标 - 请使用512x512或更大尺寸的高质量PNG图像
const sourceIcon = path.join(__dirname, 'public', 'apple-touch-icon.png');

// 需要生成的图标尺寸
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

// 生成普通图标
async function generateIcons() {
  try {
    for (const size of sizes) {
      await sharp(sourceIcon)
        .resize(size, size)
        .toFile(path.join(iconsDir, `icon-${size}x${size}.png`));
      
      console.log(`✅ 生成图标: ${size}x${size}`);
    }

    // 生成可遮罩图标 (maskable)
    await sharp(sourceIcon)
      .resize(512, 512)
      .extend({
        top: 51,
        bottom: 51,
        left: 51,
        right: 51,
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .resize(512, 512)
      .toFile(path.join(iconsDir, 'maskable-icon.png'));
    
    console.log('✅ 生成可遮罩图标: 512x512');
    console.log('✅ 所有图标生成完成!');
  } catch (error) {
    console.error('❌ 生成图标时出错:', error);
  }
}

generateIcons(); 