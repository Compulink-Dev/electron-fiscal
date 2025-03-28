import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
function Invoice() {
    const [receipts, setReceipts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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
                }
                else {
                    setError(response.error || 'Failed to load receipts');
                }
            }
            catch (error) {
                setError('Error fetching receipts');
                console.error("Error fetching receipts:", error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchReceipts();
    }, []);
    if (loading)
        return _jsx("div", { className: "text-center py-4", children: "Loading receipts..." });
    if (error)
        return _jsxs("div", { className: "text-red-500 text-center py-4", children: ["Error: ", error] });
    if (receipts.length === 0)
        return _jsx("div", { className: "text-center py-4", children: "No receipts found" });
    return (_jsxs("div", { className: "invoice-container p-4", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: "Invoice Records" }), _jsx("div", { className: "receipts-list grid gap-4", children: receipts.map((receipt) => (_jsxs("div", { className: "receipt-card border p-4 rounded-lg shadow-md", children: [_jsxs("div", { className: "receipt-header mb-3", children: [_jsxs("h2", { className: "text-lg font-semibold", children: ["Invoice #: ", receipt.invoiceNo] }), _jsxs("p", { children: ["Type: ", receipt.receiptType] }), _jsxs("p", { children: ["Date: ", new Date(receipt.receiptDate).toLocaleDateString()] })] }), _jsxs("div", { className: "buyer-info mb-3", children: [_jsxs("h3", { className: "font-semibold", children: ["Buyer: ", receipt.buyerData.buyerRegisterName] }), receipt.buyerData.buyerTradeName && _jsxs("p", { children: ["Trade Name: ", receipt.buyerData.buyerTradeName] }), receipt.buyerData.buyerTIN && _jsxs("p", { children: ["TIN: ", receipt.buyerData.buyerTIN] })] }), _jsxs("table", { className: "items-table w-full border-collapse border", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-gray-100", children: [_jsx("th", { className: "border p-2", children: "Item" }), _jsx("th", { className: "border p-2", children: "Quantity" }), _jsx("th", { className: "border p-2", children: "Price" }), _jsx("th", { className: "border p-2", children: "Total" })] }) }), _jsx("tbody", { children: receipt.receiptLines.map((line, index) => (_jsxs("tr", { className: "border-t", children: [_jsx("td", { className: "border p-2", children: line.receiptLineName }), _jsx("td", { className: "border p-2", children: line.receiptLineQuantity }), _jsxs("td", { className: "border p-2", children: ["$", line.receiptLinePrice?.toFixed(2)] }), _jsxs("td", { className: "border p-2", children: ["$", line.receiptLineTotal.toFixed(2)] })] }, index))) })] }), _jsxs("div", { className: "receipt-total mt-3 font-bold text-lg", children: ["Total: $", receipt.receiptTotal.toFixed(2)] })] }, receipt._id))) })] }));
}
export default Invoice;
