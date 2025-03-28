// types.d.ts
type Statistics = {
  cpuUsage: number;
  ramUsage: number;
  storageUsage: number;
};

type StaticData = {
  totalStorage: number;
  cpuModel: string;
  totalMemoryGB: number;
};

type View = 'CPU' | 'RAM' | 'STORAGE';

type FrameWindowAction = 'CLOSE' | 'MAXIMIZE' | 'MINIMIZE';

type ApiResponse<T = any> = {
  success: boolean;
  data?: T;
  error?: string;
};

type EventPayloadMapping = {
  statistics: Statistics;
  getStaticData: StaticData;
  changeView: View;
  sendFrameAction: FrameWindowAction;
  fetchReceipts: ApiResponse<Receipt[]>;
};

type UnsubscribeFunction = () => void;

interface Window {
  electron: {
    subscribeStatistics: (
      callback: (statistics: Statistics) => void
    ) => UnsubscribeFunction;
    getStaticData: () => Promise<StaticData>;
    subscribeChangeView: (
      callback: (view: View) => void
    ) => UnsubscribeFunction;
    sendFrameAction: (payload: FrameWindowAction) => void;
    fetchReceipts: () => Promise<ApiResponse<Receipt[]>>;
  };
}

interface Receipt {
  _id: string;
  receiptType: string;
  invoiceNo: string;
  buyerData: {
    buyerRegisterName: string;
    buyerTradeName?: string;
    buyerTIN?: string;
  };
  receiptDate: string;
  receiptLines: Array<{
    receiptLineName: string;
    receiptLineQuantity: number;
    receiptLinePrice: number;
    receiptLineTotal: number;
  }>;
  receiptTotal: number;
}