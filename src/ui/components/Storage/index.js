import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/renderer/components/Storage.tsx
import { useEffect, useState } from 'react';
import { ipcRenderer } from 'electron';
export default function Storage() {
    const [receipts, setReceipts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedReceipt, setSelectedReceipt] = useState(null);
    useEffect(() => {
        const fetchReceipts = async () => {
            try {
                const result = await ipcRenderer.invoke('fetch-receipts');
                if (result.success) {
                    setReceipts(result.data);
                }
                else {
                    setError(result.error);
                }
            }
            catch (err) {
                setError('Failed to connect to API');
                console.error(err);
            }
            finally {
                setLoading(false);
            }
        };
        fetchReceipts();
    }, []);
    if (loading) {
        return (_jsx("div", { className: "flex gap-2 items-center justify-center h-screen", children: _jsx("p", { className: "text-sm", children: "Loading receipts..." }) }));
    }
    if (error) {
        return (_jsx("div", { className: "text-red-500 text-center mt-8", children: _jsx("p", { children: error }) }));
    }
    return (_jsxs("div", { className: "p-6", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: "Storage" }), _jsx("hr", { className: "my-4" }), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [_jsx("thead", { className: "bg-gray-50", children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Invoice No" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Receipt Type" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Buyer Name" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Receipt Date" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Total" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Actions" })] }) }), _jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: receipts.map((receipt) => (_jsxs("tr", { children: [_jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: receipt.invoiceNo }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: receipt.receiptType }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: receipt.buyerData.buyerRegisterName || 'N/A' }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: new Date(receipt.receiptDate).toLocaleDateString() }), _jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: ["$", receipt.receiptTotal.toFixed(2)] }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: _jsx("button", { onClick: () => setSelectedReceipt(receipt), className: "text-blue-600 hover:text-blue-900", children: "View" }) })] }, receipt._id))) })] }) }), selectedReceipt && (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4", children: _jsxs("div", { className: "bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-auto", children: [_jsx("h2", { className: "text-xl font-bold mb-4", children: "Invoice Details" }), _jsxs("div", { className: "grid grid-cols-2 gap-4 mb-6", children: [_jsxs("div", { children: [_jsxs("p", { children: [_jsx("strong", { children: "Invoice No:" }), " ", selectedReceipt.invoiceNo] }), _jsxs("p", { children: [_jsx("strong", { children: "Receipt Type:" }), " ", selectedReceipt.receiptType] })] }), _jsxs("div", { children: [_jsxs("p", { children: [_jsx("strong", { children: "Buyer Name:" }), " ", selectedReceipt.buyerData.buyerRegisterName || 'N/A'] }), _jsxs("p", { children: [_jsx("strong", { children: "Receipt Date:" }), " ", new Date(selectedReceipt.receiptDate).toLocaleString()] })] })] }), _jsx("h3", { className: "font-bold mb-2", children: "Line Items" }), _jsx("div", { className: "border rounded", children: _jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [_jsx("thead", { className: "bg-gray-50", children: _jsxs("tr", { children: [_jsx("th", { className: "px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "#" }), _jsx("th", { className: "px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Description" }), _jsx("th", { className: "px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Price" }), _jsx("th", { className: "px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Qty" }), _jsx("th", { className: "px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Total" })] }) }), _jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: selectedReceipt.receiptLines.map((line) => (_jsxs("tr", { children: [_jsx("td", { className: "px-4 py-2 whitespace-nowrap text-sm text-gray-500", children: line.receiptLineNo }), _jsx("td", { className: "px-4 py-2 whitespace-nowrap text-sm text-gray-500", children: line.receiptLineName }), _jsxs("td", { className: "px-4 py-2 whitespace-nowrap text-sm text-gray-500", children: ["$", line.receiptLinePrice.toFixed(2)] }), _jsx("td", { className: "px-4 py-2 whitespace-nowrap text-sm text-gray-500", children: line.receiptLineQuantity }), _jsxs("td", { className: "px-4 py-2 whitespace-nowrap text-sm text-gray-500", children: ["$", line.receiptLineTotal.toFixed(2)] })] }, line.receiptLineNo))) })] }) }), _jsx("div", { className: "mt-6 flex justify-end", children: _jsx("button", { onClick: () => setSelectedReceipt(null), className: "px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600", children: "Close" }) })] }) }))] }));
}
