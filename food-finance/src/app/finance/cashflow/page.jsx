import data, { sidebarData } from "../../../mockData";
import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import CashFlowMain from "@/app/finance/cashflow/CashFlowMain";

export default function CashFlow() {
    return (
        <>
            <div className="flex flex-col min-h-screen bg-slate-100 shadow-md sm:rounded-lg">
                <Header />
                <div className="flex flex-1">
                    <Sidebar data={sidebarData} />
                    <div className="flex-1">
                        <CashFlowMain data={data} />
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}