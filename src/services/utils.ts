"use client";

/**
 * 获取图片的完整路径
 * @param imagePath 图片路径
 * @returns 处理后的完整图片路径
 */
export function getImagePath(imagePath: string | null | undefined): string {
  if (!imagePath) {
    return "/images/placeholder.jpg"; // 默认占位图
  }

  // 如果路径已经包含斜杠，不再添加
  if (imagePath.startsWith("/")) {
    return imagePath;
  }

  // 否则添加斜杠
  return `/${imagePath}`;
} 