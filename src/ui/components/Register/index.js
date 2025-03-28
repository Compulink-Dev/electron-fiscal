import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from "react";
import { useStatistics } from "../../useStatistics";
import { Login } from "../Login";
function App() {
    const staticData = useStaticData();
    const statistics = useStatistics(10);
    const [activeView, setActiveView] = useState('CPU');
    const cpuUsages = useMemo(() => statistics.map((stat) => stat.cpuUsage), [statistics]);
    const ramUsages = useMemo(() => statistics.map((stat) => stat.ramUsage), [statistics]);
    const storageUsages = useMemo(() => statistics.map((stat) => stat.storageUsage), [statistics]);
    const activeUsages = useMemo(() => {
        switch (activeView) {
            case 'CPU':
                return cpuUsages;
            case 'RAM':
                return ramUsages;
            case 'STORAGE':
                return storageUsages;
        }
    }, [activeView, cpuUsages, ramUsages, storageUsages]);
    useEffect(() => {
        return window.electron.subscribeChangeView((view) => setActiveView(view));
    }, []);
    return (_jsxs("div", { className: "App", children: [_jsx(Header, {}), _jsx("div", { className: "main", children: _jsxs("div", { children: [_jsx(SelectOption, { onClick: () => setActiveView('CPU'), title: "CPU", view: "CPU", subTitle: staticData?.cpuModel ?? '', data: cpuUsages }), _jsx(SelectOption, { onClick: () => setActiveView('RAM'), title: "RAM", view: "RAM", subTitle: (staticData?.totalMemoryGB.toString() ?? '') + ' GB', data: ramUsages }), _jsx(SelectOption, { onClick: () => setActiveView('STORAGE'), title: "STORAGE", view: "STORAGE", subTitle: (staticData?.totalStorage.toString() ?? '') + ' GB', data: storageUsages })] }) }), _jsx(Login, {})] }));
}
function SelectOption(props) {
    return (_jsx("button", { className: "selectOption", onClick: props.onClick, children: _jsxs("div", { className: "selectOptionTitle", children: [_jsx("div", { children: props.title }), _jsx("div", { children: props.subTitle })] }) }));
}
function Header() {
    return (_jsxs("header", { children: [_jsx("button", { id: "close", onClick: () => window.electron.sendFrameAction('CLOSE') }), _jsx("button", { id: "minimize", onClick: () => window.electron.sendFrameAction('MINIMIZE') }), _jsx("button", { id: "maximize", onClick: () => window.electron.sendFrameAction('MAXIMIZE') })] }));
}
function useStaticData() {
    const [staticData, setStaticData] = useState(null);
    useEffect(() => {
        (async () => {
            setStaticData(await window.electron.getStaticData());
        })();
    }, []);
    return staticData;
}
export default App;
