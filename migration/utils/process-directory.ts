import fs from 'fs';
import path from 'path';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

// Функция для рекурсивного обхода директорий и применения трансформации
export function processDirectory(dirPath: string, transformCode: (filePath: string) => void) {
  const files = fs.readdirSync(dirPath);

  for (let file of files) {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);

    // Пропускаем символические ссылки для избежания бесконечной рекурсии
    if (stat.isSymbolicLink()) {
      continue;
    }

    if (stat.isDirectory()) {
      processDirectory(fullPath, transformCode); // Рекурсия для вложенных папок
    } else if (extensions.find((extension) => fullPath.endsWith(extension))) {
      transformCode(fullPath); // Применяем нашу трансформацию для всех extensions
    }
  }
}