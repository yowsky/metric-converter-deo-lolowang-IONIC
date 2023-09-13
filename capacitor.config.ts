import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'metric-converter',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
