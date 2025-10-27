import child_process from 'child_process';
import { promisify } from 'util';

/**
 * Эта функция может быть полезна для вызова консольных команд из кода средствами nodejs
 */
export const exec = promisify(child_process.exec);
