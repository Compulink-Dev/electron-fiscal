// src/renderer/components/Storage.tsx
import React, { useEffect, useState } from 'react';
import { ipcRenderer } from 'electron';

interface Receipt {
  _id: string;
  receiptType: string;
  invoiceNo: string;
  receiptDate: string;
  receiptTotal: number;
  buyerData: {
    buyerRegisterName: string;
  };
  receiptLines: {
    receiptLineNo: number;
    receiptLineName: string;
    receiptLinePrice: number;
    receiptLineQuantity: number;
    receiptLineTotal: number;
  }[];
}

export default function Storage() {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedReceipt, setSelectedReceipt] = useState<Receipt | null>(null);

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const result = await ipcRenderer.invoke('fetch-receipts');
        
        if (result.success) {
          setReceipts(result.data);
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError('Failed to connect to API');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReceipts();
  }, []);

  if (loading) {
    return (
      <div className="flex gap-2 items-center justify-center h-screen">
        <p className="text-sm">Loading receipts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mt-8">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Storage</h1>
      <hr className="my-4" />

      {/* Simple table display - you can enhance this with your DataTable component */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Invoice No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Receipt Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Buyer Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Receipt Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {receipts.map((receipt) => (
              <tr key={receipt._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {receipt.invoiceNo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {receipt.receiptType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {receipt.buyerData.buyerRegisterName || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(receipt.receiptDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${receipt.receiptTotal.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => setSelectedReceipt(receipt)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Receipt Details Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Invoice Details</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p><strong>Invoice No:</strong> {selectedReceipt.invoiceNo}</p>
                <p><strong>Receipt Type:</strong> {selectedReceipt.receiptType}</p>
              </div>
              <div>
                <p><strong>Buyer Name:</strong> {selectedReceipt.buyerData.buyerRegisterName || 'N/A'}</p>
                <p><strong>Receipt Date:</strong> {new Date(selectedReceipt.receiptDate).toLocaleString()}</p>
              </div>
            </div>

            <h3 className="font-bold mb-2">Line Items</h3>
            <div className="border rounded">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {selectedReceipt.receiptLines.map((line) => (
                    <tr key={line.receiptLineNo}>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{line.receiptLineNo}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{line.receiptLineName}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">${line.receiptLinePrice.toFixed(2)}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{line.receiptLineQuantity}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">${line.receiptLineTotal.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedReceipt(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}