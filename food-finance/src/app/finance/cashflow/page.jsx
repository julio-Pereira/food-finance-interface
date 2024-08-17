'use client';
import data, { sidebarData } from "../../../mockData";
import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import CashFlowMain from "@/app/finance/cashflow/CashFlowMain";
function CashFlow() {
    return (
        <div className="flex flex-col min-h-screen bg-slate-100 shadow-md sm:rounded-lg">
            <Header />
            <div className="flex flex-1 flex-col lg:flex-row">
                <Sidebar data={sidebarData} className="w-full lg:w-1/4" />
                <div className="flex-1">
                    <CashFlowMain />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default CashFlow;