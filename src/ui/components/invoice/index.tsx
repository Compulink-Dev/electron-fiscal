import { useEffect, useState } from 'react';
import type { Receipt } from '../../../../types/api';


function Invoice() {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReceipts = async () => {
      if (!window.electron) {
        setError('Electron API not available');
        setLoading(false);
        return;
      }
    
      try {
        const response = await window.electron.fetchReceipts();
        if (response.success) {
          setReceipts(response.data || []);
        } else {
          setError(response.error || 'Failed to load receipts');
        }
      } catch (error) {
        setError('Error fetching receipts');
        console.error("Error fetching receipts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReceipts();
  }, []);

  if (loading) return <div className="text-center py-4">Loading receipts...</div>;
  if (error) return <div className="text-red-500 text-center py-4">Error: {error}</div>;
  if (receipts.length === 0) return <div className="text-center py-4">No receipts found</div>;

  return (
    <div className="invoice-container p-4">
      <h1 className="text-2xl font-bold mb-4">Invoice Records</h1>
      <div className="receipts-list grid gap-4">
        {receipts.map((receipt) => (
          <div key={receipt._id} className="receipt-card border p-4 rounded-lg shadow-md">
            <div className="receipt-header mb-3">
              <h2 className="text-lg font-semibold">Invoice #: {receipt.invoiceNo}</h2>
              <p>Type: {receipt.receiptType}</p>
              <p>Date: {new Date(receipt.receiptDate).toLocaleDateString()}</p>
            </div>

            <div className="buyer-info mb-3">
              <h3 className="font-semibold">Buyer: {receipt.buyerData.buyerRegisterName}</h3>
              {receipt.buyerData.buyerTradeName && <p>Trade Name: {receipt.buyerData.buyerTradeName}</p>}
              {receipt.buyerData.buyerTIN && <p>TIN: {receipt.buyerData.buyerTIN}</p>}
            </div>

            <table className="items-table w-full border-collapse border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">Item</th>
                  <th className="border p-2">Quantity</th>
                  <th className="border p-2">Price</th>
                  <th className="border p-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {receipt.receiptLines.map((line, index) => (
                  <tr key={index} className="border-t">
                    <td className="border p-2">{line.receiptLineName}</td>
                    <td className="border p-2">{line.receiptLineQuantity}</td>
                    <td className="border p-2">${line.receiptLinePrice?.toFixed(2)}</td>
                    <td className="border p-2">${line.receiptLineTotal.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="receipt-total mt-3 font-bold text-lg">
              Total: ${receipt.receiptTotal.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Invoice;
