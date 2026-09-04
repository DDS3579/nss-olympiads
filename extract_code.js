import { runCli } from 'repomix';

async function extractThreeFolders() {
  const rootDir = process.cwd();
  
  // Define the target directories you want to extract/pack
  const targetDirs = ['components', 'app', 'lib'];
  
  // Configure CLI options for Repomix
  const options = {
    output: 'combined-output.xml',
    style: 'xml',
    compress: false,
    quiet: false,
    // Use include patterns to explicitly focus on the specified folders
    include: targetDirs.map(dir => `${dir}/**/*`).join(','),
  };

  try {
    console.log('Packing specified folders with Repomix...');
    const result = await runCli(['.'], rootDir, options);
    console.log('Successfully generated packed file!');
    console.log(`Total files processed: ${result.packResult?.totalFiles || 0}`);
  } catch (error) {
    console.error('Error running Repomix:', error);
  }
}

extractThreeFolders();
