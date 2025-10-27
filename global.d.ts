/**
 * Этот файл нужен только для typescript
 * чтобы описать интерфейс пакета my-package
 * сама реализация нам запуска миграций не нужна
 */
declare module 'my-package' {
    const myFunc: (value: string) => string; 
    const myFuncNew: (params: { name: string }) => string; 

    return {
        myFunc,
        myFuncNew,
    }
}