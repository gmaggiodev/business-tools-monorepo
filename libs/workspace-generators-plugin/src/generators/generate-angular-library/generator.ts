import {
  Tree,
} from '@nx/devkit';
import { GenerateAngularLibraryGeneratorSchema } from './schema';
import { libraryGenerator } from '@nx/angular/generators';

const TYPES = ['ui', 'feature', 'data-access', 'util'];


export async function generateAngularLibraryGenerator(
  tree: Tree,
  options: GenerateAngularLibraryGeneratorSchema
) {

  async function generateLibrary(tree: Tree, options: GenerateAngularLibraryGeneratorSchema, type: string) {
    return libraryGenerator(tree, {
      name: options.name,
      simpleName: true,
      standalone: true,
      buildable: true,
      prefix: `bt-libs-${options.type}`,
      style: 'scss',
      changeDetection: 'OnPush',
      directory: `libs/${options.domain}/${options.type}`,
      tags: `domain:${options.domain},type:${options.type}`,
      importPath: `@bt-libs/${options.domain}/${options.type}/${options.name}`
    });
  }

  if (options.type === 'all'){
    for (const type of TYPES) {
      await generateLibrary(tree, options, type);
    }
  } else {
    await generateLibrary(tree, options, options.type);
  }

  const path = `libs/${options.domain}/${options.type}/${options.name}/src`;

  tree.delete(`${path}/lib/${options.name}`);
  tree.write(`${path}/index.ts`, '');
}

export default generateAngularLibraryGenerator;
