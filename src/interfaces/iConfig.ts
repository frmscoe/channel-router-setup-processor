export interface IConfig {
  maxCPU: number;
  redis: {
    auth: string;
    db: number;
    host: string;
    port: number;
    timeout: number;
  };
  dbURL: string;
  dbName: string;
  dbUser: string;
  dbPassword: string;
  dbCertPath: string;
  restPort: number;
  logstashHost: string;
  logstashPort: number;
  arangoHost: string;
  arangoPort: number;
  functionName: string;
  apmLogging: boolean;
  apmSecretToken: string;
  apmURL: string;
  nodeEnv: string;
}
