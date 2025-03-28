import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Header from './components/header';
function MainLayout({ children }) {
    return (_jsxs("div", { className: "flex flex-col h-screen overflow-hidden", children: [_jsx("header", { className: "fixed top-0 left-0 right-0 z-50", children: _jsx(Header, {}) }), _jsxs("main", { className: "flex-1 pt-14 overflow-y-auto", children: [" ", children] })] }));
}
export default MainLayout;
