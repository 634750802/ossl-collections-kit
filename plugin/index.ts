import { createConnection } from 'mysql2/promise';
import fsp from 'node:fs/promises';
import path from 'node:path';
import type { Plugin } from 'vite';

export type Options = {
  repositoryPath: string
  databaseUrl: string
  collectionName: string
}

export default function osslCollectionsKit ({
  repositoryPath,
  databaseUrl,
  collectionName,
}: Options): Plugin {
  return {
    name: 'ossl-collections-kit',
    version: '1.0.0',

    async resolveId (id) {
      if (id === 'ossl:collection') {
        const dir = path.join(repositoryPath, 'collections', collectionName);
        await fsp.access(dir);
        await fsp.access(path.join(dir, 'config.json'));
        await fsp.access(path.join(dir, 'template.sql'));
        await fsp.access(path.join(dir, 'visualization.js'));
        return id;
      }
    },

    async load (id) {
      if (id === 'ossl:collection') {
        const dir = path.join(repositoryPath, 'collections', collectionName);

        const config = JSON.parse(await fsp.readFile(path.join(dir, 'config.json'), { encoding: 'utf-8' }));
        const sql = await fsp.readFile(path.join(dir, 'template.sql'), { encoding: 'utf-8' });
        const visualize = await fsp.readFile(path.join(dir, 'visualization.js'), { encoding: 'utf-8' });

        const conn = await createConnection({
          uri: `${databaseUrl}/${config.database}`,
          ssl: { minVersion: 'TLSv1.2', rejectUnauthorized: true },
        });
        try {
          const [rows] = await conn.query<any[]>(sql);

          return `// dir: ${dir}

export const config = ${JSON.stringify(config, undefined, 2)};

export const data = ${JSON.stringify(rows)};

${visualize}
`;
        } finally {
          conn.destroy();
        }
      }
    },
  };
}