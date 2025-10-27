import fs from 'fs';
import jscodeshift from 'jscodeshift';

// Трансформер для замены старых вызовов на новые
export function transformCode(filePath: string) {
  try {
    // Читаем содержимое файла
    const sourceCode = fs.readFileSync(filePath, 'utf8');

    // Парсим AST дерева нашего файла
    const astRoot = jscodeshift(sourceCode);
    let isChanged = false;

    // перебираем объявления импорта и меняем myFunc на myFuncNew
    astRoot.find(jscodeshift.ImportDeclaration).forEach(path => {
        path.node.specifiers?.forEach((specifier) => {
            if (specifier.type === "ImportSpecifier" && specifier.imported.name === "myFunc" && specifier.local) {
                // Меняем импорт myFunc на myFuncNew
                specifier.local.name = "myFuncNew";
            }
        });
        isChanged = true;
    });

    // Замещаем вызовы myFunc() на myFuncNew()
    astRoot.find(jscodeshift.CallExpression).forEach(path => {
      if (
        path.node.callee.type === "Identifier" &&
        path.node.callee.name === "myFunc"
      ) {
        // Изменяем имя вызываемой функции
        path.node.callee.name = "myFuncNew";
        
        // запоминаем строку аргумента
        let argValue = 'value' in path.node.arguments[0] ? (path.node.arguments[0].value ?? '') : '';

        // заменяем сигнатуру вызова функции
        path.node.arguments = [
          jscodeshift.objectExpression([
            jscodeshift.property("init", jscodeshift.identifier("name"), jscodeshift.literal(argValue))
          ])
        ];

        isChanged = true;
      }
    });

    // Получаем обновленный код
    const updatedCode = astRoot.toSource();

    // Сохраняем обратно в файл
    fs.writeFileSync(filePath, updatedCode);

    if (isChanged) {
        console.log(`Файл ${filePath} успешно обработан.`);
    }
  } catch (err) {
    console.error(`Ошибка обработки файла ${filePath}:`, err);
  }
}
