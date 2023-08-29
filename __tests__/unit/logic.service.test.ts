/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pacs002, Pacs008, Pain001, Pain013 } from '@frmscoe/frms-coe-lib/lib/interfaces';
import { databaseManager, dbInit, loggerService, nodeCache, runServer, server } from '../../src';
import { handleTransaction } from '../../src/services/logic.service';

const getMockRequestInvalid = () => {
  const quote = JSON.parse(
    '{"TxTp":"invalid mock request","CstmrCdtTrfInitn":{"GrpHdr":{"MsgId":"2669e349-500d-44ba-9e27-7767a16608a0","CreDtTm":"2021-10-07T09:25:31.000Z","NbOfTxs":1,"InitgPty":{"Nm":"IvanReeseRussel-Klein","Id":{"PrvtId":{"DtAndPlcOfBirth":{"BirthDt":"1967-11-23","CityOfBirth":"Unknown","CtryOfBirth":"ZZ"},"Othr":{"Id":"+27783078685","SchmeNm":{"Prtry":"MSISDN"}}}},"CtctDtls":{"MobNb":"+27-783078685"}}},"PmtInf":{"PmtInfId":"b51ec534-ee48-4575-b6a9-ead2955b8069","PmtMtd":"TRA","ReqdAdvcTp":{"DbtAdvc":{"Cd":"ADWD","Prtry":"Advicewithtransactiondetails"}},"ReqdExctnDt":{"Dt":"2021-10-07","DtTm":"2021-10-07T09:25:31.000Z"},"Dbtr":{"Nm":"IvanReeseRussel-Klein","Id":{"PrvtId":{"DtAndPlcOfBirth":{"BirthDt":"1957-10-05","CityOfBirth":"Unknown","CtryOfBirth":"ZZ"},"Othr":{"Id":"+27783078685","SchmeNm":{"Prtry":"MSISDN"}}}},"CtctDtls":{"MobNb":"+27-783078685"}},"DbtrAcct":{"Id":{"Othr":{"Id":"+27783078685","SchmeNm":{"Prtry":"PASSPORT"}}},"Nm":"IvanRussel-Klein"},"DbtrAgt":{"FinInstnId":{"ClrSysMmbId":{"MmbId":"dfsp001"}}},"CdtTrfTxInf":{"PmtId":{"EndToEndId":"b51ec534-ee48-4575-b6a9-ead2955b8069"},"PmtTpInf":{"CtgyPurp":{"Prtry":"TRANSFER"}},"Amt":{"InstdAmt":{"Amt":{"Amt":"50431891779910900","Ccy":"USD"}},"EqvtAmt":{"Amt":{"Amt":"50431891779910900","Ccy":"USD"},"CcyOfTrf":"USD"}},"ChrgBr":"DEBT","CdtrAgt":{"FinInstnId":{"ClrSysMmbId":{"MmbId":"dfsp002"}}},"Cdtr":{"Nm":"AprilSamAdamson","Id":{"PrvtId":{"DtAndPlcOfBirth":{"BirthDt":"1923-04-26","CityOfBirth":"Unknown","CtryOfBirth":"ZZ"},"Othr":{"Id":"+27782722305","SchmeNm":{"Prtry":"MSISDN"}}}},"CtctDtls":{"MobNb":"+27-782722305"}},"CdtrAcct":{"Id":{"Othr":{"Id":"+27783078685","SchmeNm":{"Prtry":"MSISDN"}}},"Nm":"AprilAdamson"},"Purp":{"Cd":"MP2P"},"RgltryRptg":{"Dtls":{"Tp":"BALANCEOFPAYMENTS","Cd":"100"}},"RmtInf":{"Ustrd":"PaymentofUSD49932566118723700.89fromIvantoApril"},"SplmtryData":{"Envlp":{"Doc":{"Cdtr":{"FrstNm":"Ivan","MddlNm":"Reese","LastNm":"Russel-Klein","MrchntClssfctnCd":"BLANK"},"Dbtr":{"FrstNm":"April","MddlNm":"Sam","LastNm":"Adamson","MrchntClssfctnCd":"BLANK"},"DbtrFinSvcsPrvdrFees":{"Ccy":"USD","Amt":"499325661187237"},"Xprtn":"2021-10-07T09:30:31.000Z"}}}}},"SplmtryData":{"Envlp":{"Doc":{"InitgPty":{"InitrTp":"CONSUMER","Glctn":{"Lat":"-3.1291","Long":"39.0006"}}}}}}}',
  );
  return quote;
};

const getMockRequest001 = (): Pain001 => {
  const quote = JSON.parse(
    '{"TxTp":"pain.001.001.11","CstmrCdtTrfInitn":{"GrpHdr":{"MsgId":"2669e349-500d-44ba-9e27-7767a16608a0","CreDtTm":"2021-10-07T09:25:31.000Z","NbOfTxs":1,"InitgPty":{"Nm":"IvanReeseRussel-Klein","Id":{"PrvtId":{"DtAndPlcOfBirth":{"BirthDt":"1967-11-23","CityOfBirth":"Unknown","CtryOfBirth":"ZZ"},"Othr":{"Id":"+27783078685","SchmeNm":{"Prtry":"MSISDN"}}}},"CtctDtls":{"MobNb":"+27-783078685"}}},"PmtInf":{"PmtInfId":"b51ec534-ee48-4575-b6a9-ead2955b8069","PmtMtd":"TRA","ReqdAdvcTp":{"DbtAdvc":{"Cd":"ADWD","Prtry":"Advicewithtransactiondetails"}},"ReqdExctnDt":{"Dt":"2021-10-07","DtTm":"2021-10-07T09:25:31.000Z"},"Dbtr":{"Nm":"IvanReeseRussel-Klein","Id":{"PrvtId":{"DtAndPlcOfBirth":{"BirthDt":"1957-10-05","CityOfBirth":"Unknown","CtryOfBirth":"ZZ"},"Othr":{"Id":"+27783078685","SchmeNm":{"Prtry":"MSISDN"}}}},"CtctDtls":{"MobNb":"+27-783078685"}},"DbtrAcct":{"Id":{"Othr":{"Id":"+27783078685","SchmeNm":{"Prtry":"PASSPORT"}}},"Nm":"IvanRussel-Klein"},"DbtrAgt":{"FinInstnId":{"ClrSysMmbId":{"MmbId":"dfsp001"}}},"CdtTrfTxInf":{"PmtId":{"EndToEndId":"b51ec534-ee48-4575-b6a9-ead2955b8069"},"PmtTpInf":{"CtgyPurp":{"Prtry":"TRANSFER"}},"Amt":{"InstdAmt":{"Amt":{"Amt":"50431891779910900","Ccy":"USD"}},"EqvtAmt":{"Amt":{"Amt":"50431891779910900","Ccy":"USD"},"CcyOfTrf":"USD"}},"ChrgBr":"DEBT","CdtrAgt":{"FinInstnId":{"ClrSysMmbId":{"MmbId":"dfsp002"}}},"Cdtr":{"Nm":"AprilSamAdamson","Id":{"PrvtId":{"DtAndPlcOfBirth":{"BirthDt":"1923-04-26","CityOfBirth":"Unknown","CtryOfBirth":"ZZ"},"Othr":{"Id":"+27782722305","SchmeNm":{"Prtry":"MSISDN"}}}},"CtctDtls":{"MobNb":"+27-782722305"}},"CdtrAcct":{"Id":{"Othr":{"Id":"+27783078685","SchmeNm":{"Prtry":"MSISDN"}}},"Nm":"AprilAdamson"},"Purp":{"Cd":"MP2P"},"RgltryRptg":{"Dtls":{"Tp":"BALANCEOFPAYMENTS","Cd":"100"}},"RmtInf":{"Ustrd":"PaymentofUSD49932566118723700.89fromIvantoApril"},"SplmtryData":{"Envlp":{"Doc":{"Cdtr":{"FrstNm":"Ivan","MddlNm":"Reese","LastNm":"Russel-Klein","MrchntClssfctnCd":"BLANK"},"Dbtr":{"FrstNm":"April","MddlNm":"Sam","LastNm":"Adamson","MrchntClssfctnCd":"BLANK"},"DbtrFinSvcsPrvdrFees":{"Ccy":"USD","Amt":"499325661187237"},"Xprtn":"2021-10-07T09:30:31.000Z"}}}}},"SplmtryData":{"Envlp":{"Doc":{"InitgPty":{"InitrTp":"CONSUMER","Glctn":{"Lat":"-3.1291","Long":"39.0006"}}}}}}}',
  );
  return quote;
};

const getMockRequest013 = (): Pain013 => {
  const quoteReply = JSON.parse(
    '{"TxTp":"pain.013.001.09","CdtrPmtActvtnReq":{"GrpHdr":{"MsgId":"42665509efd844da90caf468e891aa52256","CreDtTm":"2021-12-03T12:40:16.000Z","NbOfTxs":1,"InitgPty":{"Nm":"April Blake Grant","Id":{"PrvtId":{"DtAndPlcOfBirth":{"BirthDt":"1968-02-01","CityOfBirth":"Unknown","CtryOfBirth":"ZZ"},"Othr":{"Id":"+27730975224","SchmeNm":{"Prtry":"MSISDN"}}}},"CtctDtls":{"MobNb":"+27-730975224"}}},"PmtInf":{"PmtInfId":"5ab4fc7355de4ef8a75b78b00a681ed2254","PmtMtd":"TRA","ReqdAdvcTp":{"DbtAdvc":{"Cd":"ADWD","Prtry":"Advice with transaction details"}},"ReqdExctnDt":{"DtTm":"2021-12-03T12:40:14.000Z"},"XpryDt":{"DtTm":"2021-11-30T10:38:56.000Z"},"Dbtr":{"Nm":"April Blake Grant","Id":{"PrvtId":{"DtAndPlcOfBirth":{"BirthDt":"1968-02-01","CityOfBirth":"Unknown","CtryOfBirth":"ZZ"},"Othr":{"Id":"+27730975224","SchmeNm":{"Prtry":"MSISDN"}}}},"CtctDtls":{"MobNb":"+27-730975224"}},"DbtrAcct":{"Id":{"Othr":{"Id":"+27730975224","SchmeNm":{"Prtry":"MSISDN"}}},"Nm":"April Grant"},"DbtrAgt":{"FinInstnId":{"ClrSysMmbId":{"MmbId":"dfsp001"}}},"CdtTrfTxInf":{"PmtId":{"EndToEndId":"2c516801007642dfb892944dde1cf845"},"PmtTpInf":{"CtgyPurp":{"Prtry":"TRANSFER BLANK"}},"Amt":{"InstdAmt":{"Amt":{"Amt":31020.89,"Ccy":"USD"}},"EqvtAmt":{"Amt":{"Amt":31020.89,"Ccy":"USD"},"CcyOfTrf":"USD"}},"ChrgBr":"DEBT","CdtrAgt":{"FinInstnId":{"ClrSysMmbId":{"MmbId":"dfsp002"}}},"Cdtr":{"Nm":"Felicia Easton Quill","Id":{"PrvtId":{"DtAndPlcOfBirth":{"BirthDt":"1935-05-08","CityOfBirth":"Unknown","CtryOfBirth":"ZZ"},"Othr":{"Id":"+27707650428","SchmeNm":{"Prtry":"MSISDN"}}}},"CtctDtls":{"MobNb":"+27-707650428"}},"CdtrAcct":{"Id":{"Othr":{"Id":"+27707650428","SchmeNm":{"Prtry":"MSISDN"}}},"Nm":"Felicia Quill"},"Purp":{"Cd":"MP2P"},"RgltryRptg":{"Dtls":{"Tp":"BALANCE OF PAYMENTS","Cd":"100"}},"SplmtryData":{"Envlp":{"Doc":{"PyeeRcvAmt":{"Amt":{"Amt":30713.75,"Ccy":"USD"}},"PyeeFinSvcsPrvdrFee":{"Amt":{"Amt":153.57,"Ccy":"USD"}},"PyeeFinSvcsPrvdrComssn":{"Amt":{"Amt":30.71,"Ccy":"USD"}}}}}}},"SplmtryData":{"Envlp":{"Doc":{"InitgPty":{"Glctn":{"Lat":"-3.1609","Long":"38.3588"}}}}}}}',
  );
  return quoteReply;
};

const getMockRequest002 = (): Pacs002 => {
  const transferRes = JSON.parse(
    '{"TxTp":"pacs.002.001.12","FIToFIPmtSts":{"GrpHdr":{"MsgId":"30bea71c5a054978ad0da7f94b2a40e9789","CreDtTm":"2021-12-03T15:24:27.000Z"},"TxInfAndSts":{"OrgnlInstrId":"5ab4fc7355de4ef8a75b78b00a681ed2255","OrgnlEndToEndId":"2c516801007642dfb892944dde1cf845897","TxSts":"ACCC","ChrgsInf":[{"Amt":{"Amt":307.14,"Ccy":"USD"},"Agt":{"FinInstnId":{"ClrSysMmbId":{"MmbId":"dfsp001"}}}},{"Amt":{"Amt":153.57,"Ccy":"USD"},"Agt":{"FinInstnId":{"ClrSysMmbId":{"MmbId":"dfsp001"}}}},{"Amt":{"Amt":30.71,"Ccy":"USD"},"Agt":{"FinInstnId":{"ClrSysMmbId":{"MmbId":"dfsp002"}}}}],"AccptncDtTm":"2021-12-03T15:24:26.000Z","InstgAgt":{"FinInstnId":{"ClrSysMmbId":{"MmbId":"dfsp001"}}},"InstdAgt":{"FinInstnId":{"ClrSysMmbId":{"MmbId":"dfsp002"}}}}}}',
  );
  return transferRes;
};

const getMockRequest008 = (): Pacs008 => {
  const transfer = JSON.parse(
    '{"TxTp":"pacs.008.001.10","FIToFICstmrCdt":{"GrpHdr":{"MsgId":"8cc4f6ffb4fd4e31b42aec0ed5d600a0123","CreDtTm":"2021-12-03T15:24:25.000Z","NbOfTxs":1,"SttlmInf":{"SttlmMtd":"CLRG"}},"CdtTrfTxInf":{"PmtId":{"InstrId":"5ab4fc7355de4ef8a75b78b00a681ed2879","EndToEndId":"2c516801007642dfb892944dde1cf845789"},"IntrBkSttlmAmt":{"Amt":{"Amt":31020.89,"Ccy":"USD"}},"InstdAmt":{"Amt":{"Amt":31020.89,"Ccy":"USD"}},"ChrgBr":"DEBT","ChrgsInf":{"Amt":{"Amt":307.14,"Ccy":"USD"},"Agt":{"FinInstnId":{"ClrSysMmbId":{"MmbId":"dfsp001"}}}},"InitgPty":{"Nm":"April Blake Grant","Id":{"PrvtId":{"DtAndPlcOfBirth":{"BirthDt":"1968-02-01","CityOfBirth":"Unknown","CtryOfBirth":"ZZ"},"Othr":{"Id":"+27730975224","SchmeNm":{"Prtry":"MSISDN"}}}},"CtctDtls":{"MobNb":"+27-730975224"}},"Dbtr":{"Nm":"April Blake Grant","Id":{"PrvtId":{"DtAndPlcOfBirth":{"BirthDt":"1968-02-01","CityOfBirth":"Unknown","CtryOfBirth":"ZZ"},"Othr":{"Id":"+27730975224","SchmeNm":{"Prtry":"MSISDN"}}}},"CtctDtls":{"MobNb":"+27-730975224"}},"DbtrAcct":{"Id":{"Othr":{"Id":"+27730975224","SchmeNm":{"Prtry":"MSISDN"}}},"Nm":"April Grant"},"DbtrAgt":{"FinInstnId":{"ClrSysMmbId":{"MmbId":"dfsp001"}}},"CdtrAgt":{"FinInstnId":{"ClrSysMmbId":{"MmbId":"dfsp002"}}},"Cdtr":{"Nm":"Felicia Easton Quill","Id":{"PrvtId":{"DtAndPlcOfBirth":{"BirthDt":"1935-05-08","CityOfBirth":"Unknown","CtryOfBirth":"ZZ"},"Othr":{"Id":"+27707650428","SchmeNm":{"Prtry":"MSISDN"}}}},"CtctDtls":{"MobNb":"+27-707650428"}},"CdtrAcct":{"Id":{"Othr":{"Id":"+27707650428","SchmeNm":{"Prtry":"MSISDN"}}},"Nm":"Felicia Quill"},"Purp":{"Cd":"MP2P"}},"RgltryRptg":{"Dtls":{"Tp":"BALANCE OF PAYMENTS","Cd":"100"}},"RmtInf":{"Ustrd":"Payment of USD 30713.75 from April to Felicia"},"SplmtryData":{"Envlp":{"Doc":{"Xprtn":"2021-11-30T10:38:56.000Z"}}}}}',
  );
  return transfer;
};

const networkMap =
  '[[{"messages":[{"id":"001@1.0","host":"http://gateway.openfaas:8080","cfg":"1.0","txTp":"pain.001.001.11","channels":[{"id":"001@1.0","host":"http://gateway.openfaas:8080/function/off-channel-aggregation-decisioning-processor","cfg":"1.0","typologies":[{"id":"028@1.0","host":"http://gateway.openfaas:8080/function/off-typology-processor","cfg":"1.0","rules":[{"id":"003@1.0","host":"http://gateway.openfaas:8080/function/off-rule-003","cfg":"1.0"},{"id":"028@1.0","host":"http://gateway.openfaas:8080/function/off-rule-028","cfg":"1.0"}]}]}]},{"id":"002@1.0","host":"http://gateway.openfaas:8080","cfg":"1.0","txTp":"pain.013.001.09","channels":[{"id":"001@1.0","host":"http://gateway.openfaas:8080/function/off-channel-aggregation-decisioning-processor","cfg":"1.0","typologies":[{"id":"028@1.0","host":"http://gateway.openfaas:8080/function/off-typology-processor","cfg":"1.0","rules":[{"id":"003@1.0","host":"http://gateway.openfaas:8080/function/off-rule-003","cfg":"1.0"},{"id":"028@1.0","host":"http://gateway.openfaas:8080/function/off-rule-028","cfg":"1.0"}]},{"id":"029@1.0","host":"http://gateway.openfaas:8080/function/off-typology-processor","cfg":"1.0","rules":[{"id":"003@1.0","host":"http://gateway.openfaas:8080/function/off-rule-003","cfg":"1.0"},{"id":"028@1.0","host":"http://gateway.openfaas:8080/function/off-rule-028","cfg":"1.0"}]}]},{"id":"002@1.0","host":"http://gateway.openfaas:8080/function/off-channel-aggregation-decisioning-processor","cfg":"1.0","typologies":[{"id":"030@1.0","host":"http://gateway.openfaas:8080/function/off-typology-processor","cfg":"1.0","rules":[{"id":"003@1.0","host":"http://gateway.openfaas:8080/function/off-rule-003","cfg":"1.0"},{"id":"028@1.0","host":"http://gateway.openfaas:8080/function/off-rule-028","cfg":"1.0"}]},{"id":"031@1.0","host":"http://gateway.openfaas:8080/function/off-typology-processor","cfg":"1.0","rules":[{"id":"003@1.0","host":"http://gateway.openfaas:8080/function/off-rule-003","cfg":"1.0"},{"id":"028@1.0","host":"http://gateway.openfaas:8080/function/off-rule-028","cfg":"1.0"}]}]}]},{"id":"004@1.0.0","host":"https://gateway.openfaas:8080/function/off-transaction-aggregation-decisioning-processor-rel-1-1-0","cfg":"1.0.0","txTp":"pacs.002.001.12","channels":[{"id":"001@1.0.0","host":"https://gateway.openfaas:8080/function/off-channel-aggregation-decisioning-processor-rel-1-1-0","cfg":"1.0.0","typologies":[{"id":"028@1.0.0","host":"https://gateway.openfaas:8080/function/off-typology-processor-rel-1-0-0","cfg":"1.0.0","rules":[{"id":"018@1.0","host":"https://gateway.openfaas:8080/function/off-rule-018-rel-1-0-0","cfg":"1.0.0"}]}]}]},{"id":"005@1.0.0","host":"https://gateway.openfaas:8080/function/off-transaction-aggregation-decisioning-processor-rel-1-1-0","cfg":"1.0.0","txTp":"pacs.008.001.10","channels":[{"id":"001@1.0.0","host":"https://gateway.openfaas:8080/function/off-channel-aggregation-decisioning-processor-rel-1-1-0","cfg":"1.0.0","typologies":[{"id":"028@1.0.0","host":"https://gateway.openfaas:8080/function/off-typology-processor-rel-1-0-0","cfg":"1.0.0","rules":[{"id":"018@1.0","host":"https://gateway.openfaas:8080/function/off-rule-018-rel-1-0-0","cfg":"1.0.0"}]}]}]}]}]]';

beforeAll(async () => {
  await dbInit();
  await runServer();
});

afterAll((done) => {
  done();
});

describe('Logic Service', () => {
  let debugLog = '';
  let loggerSpy: jest.SpyInstance;
  let debugLoggerSpy: jest.SpyInstance;
  let errorLoggerSpy: jest.SpyInstance;
  let responseSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.spyOn(databaseManager, 'getNetworkMap').mockImplementation(() => {
      return Promise.resolve(JSON.parse(networkMap));
    });

    jest.spyOn(databaseManager, 'setJson').mockImplementation((): Promise<any> => {
      return Promise.resolve<string>('');
    });

    loggerSpy = jest.spyOn(loggerService, 'log');
    errorLoggerSpy = jest.spyOn(loggerService, 'error');
    debugLoggerSpy = jest.spyOn(loggerService, 'debug');

    /* eslint-disable */

    // Clear NodeCache
    nodeCache.flushAll();
  });

  describe('Handle Transaction', () => {
    it('should handle successful request for Pain013', async () => {
      const expectedReq = { transaction: getMockRequest013() };
      responseSpy = jest.spyOn(server, 'handleResponse').mockImplementation(jest.fn());

      server.handleResponse = (reponse: unknown): Promise<void> => {
        return Promise.resolve();
      };

      await handleTransaction(expectedReq);

      const result = debugLog;

      expect(loggerSpy).toBeCalledTimes(3);
      expect(loggerSpy).toBeCalledWith('Successfully sent to 003@1.0');
      expect(loggerSpy).toBeCalledWith('Successfully sent to 028@1.0');
      expect(errorLoggerSpy).toBeCalledTimes(0);
      expect(debugLoggerSpy).toBeCalledTimes(1);
      expect(result).toBeDefined;
    });

    it('should handle successful request for Pain001', async () => {
      const expectedReq = { transaction: getMockRequest001() };

      server.handleResponse = (reponse: unknown): Promise<void> => {
        return Promise.resolve();
      };

      await handleTransaction(expectedReq);

      const result = debugLog;

      expect(loggerSpy).toBeCalledTimes(3);
      expect(loggerSpy).toBeCalledWith('Successfully sent to 003@1.0');
      expect(loggerSpy).toBeCalledWith('Successfully sent to 028@1.0');
      expect(errorLoggerSpy).toBeCalledTimes(0);
      expect(debugLoggerSpy).toBeCalledTimes(1);
      expect(result).toBeDefined;
    });

    it('should handle successful request for Pacs002', async () => {
      const expectedReq = { transaction: getMockRequest002() };

      server.handleResponse = (reponse: unknown): Promise<void> => {
        return Promise.resolve();
      };

      await handleTransaction(expectedReq);

      const result = debugLog;

      expect(loggerSpy).toBeCalledTimes(2);
      expect(loggerSpy).toBeCalledWith('Successfully sent to 018@1.0');
      expect(errorLoggerSpy).toBeCalledTimes(0);
      expect(debugLoggerSpy).toBeCalledTimes(1);
      expect(result).toBeDefined;
    });

    it('should handle successful request for Pacs008', async () => {
      const expectedReq = { transaction: getMockRequest008() };

      server.handleResponse = (reponse: unknown): Promise<void> => {
        return Promise.resolve();
      };

      await handleTransaction(expectedReq);

      const result = debugLog;

      expect(loggerSpy).toBeCalledTimes(2);
      expect(loggerSpy).toBeCalledWith('Successfully sent to 018@1.0');
      expect(errorLoggerSpy).toBeCalledTimes(0);
      expect(debugLoggerSpy).toBeCalledTimes(1);
      expect(result).toBeDefined;
    });

    it('should handle successful request for Pacs008, has cached map', async () => {
      const expectedReq = { transaction: getMockRequest008() };

      let netMap = JSON.parse(networkMap)[0][0];
      nodeCache.set(expectedReq.transaction.TxTp, netMap);

      const nodeCacheSpy = jest.spyOn(nodeCache, 'get');

      server.handleResponse = (reponse: unknown): Promise<void> => {
        return Promise.resolve();
      };
      await handleTransaction(expectedReq);
      const result = debugLog;

      expect(nodeCacheSpy).toHaveReturnedWith(netMap);
      expect(loggerSpy).toBeCalledTimes(2);
      expect(loggerSpy).toBeCalledWith('Successfully sent to 018@1.0');
      expect(errorLoggerSpy).toBeCalledTimes(0);
      expect(debugLoggerSpy).toBeCalledTimes(2);
      expect(result).toBeDefined;
    });

    it('should handle unsuccessful request - no network map', async () => {
      const expectedReq = { transaction: getMockRequestInvalid() };
      server.handleResponse = (reponse: unknown): Promise<void> => {
        return Promise.resolve();
      };

      await handleTransaction(expectedReq);
      const result = debugLog;

      expect(loggerSpy).toBeCalledTimes(2);
      expect(loggerSpy).toHaveBeenCalledWith('No coresponding message found in Network map');
      expect(errorLoggerSpy).toBeCalledTimes(0);
      expect(debugLoggerSpy).toBeCalledTimes(1);
      expect(result).toBeDefined;
    });

    it('should respond with active cached network map from memory', async () => {
      const expectedReq = { transaction: getMockRequest001() };

      let netMap = JSON.parse(networkMap)[0][0];
      nodeCache.set(expectedReq.transaction.TxTp, netMap);

      const nodeCacheSpy = jest.spyOn(nodeCache, 'get');

      server.handleResponse = (reponse: unknown): Promise<void> => {
        return Promise.resolve();
      };

      await handleTransaction(expectedReq);

      expect(nodeCacheSpy).toHaveReturnedWith(netMap);
      expect(loggerSpy).toBeCalledTimes(3);
      expect(loggerSpy).toBeCalledWith('Successfully sent to 003@1.0');
      expect(loggerSpy).toBeCalledWith('Successfully sent to 028@1.0');
      expect(errorLoggerSpy).toBeCalledTimes(0);
      expect(debugLoggerSpy).toBeCalledTimes(2);
    });

    it('should respond with empty network submap no network map is found', async () => {
      jest.spyOn(databaseManager, 'getNetworkMap').mockImplementation(() => {
        return Promise.resolve(JSON.parse('{}'));
      });

      const expectedReq = { transaction: getMockRequest001() };

      server.handleResponse = (reponse: unknown): Promise<void> => {
        return Promise.resolve();
      };

      await handleTransaction(expectedReq);

      expect(loggerSpy).toBeCalledTimes(3);
      expect(loggerSpy).toBeCalledWith('No network map found in DB');
      expect(loggerSpy).toBeCalledWith('No coresponding message found in Network map');
      expect(errorLoggerSpy).toBeCalledTimes(0);
      expect(debugLoggerSpy).toBeCalledTimes(2);
    });

    it('Should handle failure to post to rule', async () => {
      const expectedReq = { transaction: getMockRequest013() };

      responseSpy = jest.spyOn(server, 'handleResponse').mockRejectedValue(() => {
        throw new Error('Testing purposes');
      });

      await handleTransaction(expectedReq);
      expect(responseSpy).toHaveBeenCalledTimes(2);
      expect(loggerSpy).toBeCalledTimes(1);
      expect(errorLoggerSpy).toBeCalledTimes(2);
      expect(errorLoggerSpy).toBeCalledWith('Failed to send to Rule 003@1.0 with Error: undefined');
      expect(errorLoggerSpy).toBeCalledWith('Failed to send to Rule 028@1.0 with Error: undefined');
      expect(debugLoggerSpy).toBeCalledTimes(1);
    });
  });
});
