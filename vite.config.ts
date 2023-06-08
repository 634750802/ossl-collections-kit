import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import osslCollectionsKit from './plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    osslCollectionsKit({
      databaseUrl: 'mysql://username:password@host:4000',
      repositoryPath: '/path/to/ossinsight-lite',
      collectionName: 'contribution-time-distribution'
    })],
});
