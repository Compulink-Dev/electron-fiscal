import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function Header() {
    return (_jsxs("header", { children: [_jsx("button", { id: "close", onClick: () => window.electron.sendFrameAction('CLOSE') }), _jsx("button", { id: "minimize", onClick: () => window.electron.sendFrameAction('MINIMIZE') }), _jsx("button", { id: "maximize", onClick: () => window.electron.sendFrameAction('MAXIMIZE') })] }));
}
export default Header;
