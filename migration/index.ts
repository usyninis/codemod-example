import { transformCode } from './transform-code';
import { processDirectory } from './utils/process-directory';

const runMigration = () => {
    console.log('start migration');

    const currentDirectory = `${process.cwd()}/src`;

    console.log('migration dir', currentDirectory);
    
    processDirectory(currentDirectory, transformCode);

    console.log('migration completed!');
};


runMigration();