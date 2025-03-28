export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
  }
  
  export interface Receipt {
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