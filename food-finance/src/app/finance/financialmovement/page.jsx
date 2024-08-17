'use client'
import NewFinancialMovementForm from "@/app/components/forms/NewFinancialMovementForm";
import Header from "@/app/components/header/Header";
import Sidebar from "@/app/components/sidebar/Sidebar";
import Footer from "@/app/components/footer/Footer";
import { sidebarData } from "../../../mockData";

function FinancialMovementPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-100 shadow-md sm:rounded-lg">
            <Header />
            <div className="flex flex-1 flex-col lg:flex-row">
                <Sidebar data={sidebarData} className="w-full lg:w-1/4" />
                <div className="flex-1">
                  <NewFinancialMovementForm />
                </div>
            </div>
            <Footer />
    </div>
  );
}

export default FinancialMovementPage;