'use client';
import React, { useEffect, useState, useRef } from "react";
import CashFlowTable from "../../components/table/CashFlowTable";
import SearchInput from "@/app/components/inputs/searchInput/SearchInput";
import DateDropdown from "@/app/components/dropdowns/DateDropdown";
import data, { favorecidos, months, planoContas } from "@/mockData";
import DateInput from "@/app/components/inputs/searchInput/DateInput";
import SearchDateInput from "@/app/components/inputs/searchInput/SearchDateInput";
import DateButton from "@/app/components/buttons/DateButton";
import Link from "next/link";
import SearchDataDropdown from "@/app/components/dropdowns/SearchDataDropdown";

function CashFlowMain() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [accountPlan, setAccountPlan] = useState('');
  const [initialAmount, setInitialAmount] = useState('');
  const [finalAmount, setFinalAmount] = useState('');
  const [initialEmissionDate, setInitialEmissionDate] = useState('');
  const [finalEmissionDate, setFinalEmissionDate] = useState('');
  const [initialDueDate, setInitialDueDate] = useState('');
  const [finalDueDate, setFinalDueDate] = useState('');
  const [beneficiary, setBeneficiary] = useState('');
  const [status, setStatus] = useState('');
  const [centerCost, setCenterCost] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const calendarRef = useRef(null);
  const dropdownRef = useRef(null);

  const onShowCalendar = () => {
    setShowCalendar(true);
  };

  const onHideCalendar = () => {
    setShowCalendar(false);
  };

  const handleClickOutside = (event) => {
    if (
      calendarRef.current && !calendarRef.current.contains(event.target) &&
      dropdownRef.current && !dropdownRef.current.contains(event.target)
    ) {
      setShowCalendar(false);
    }
  };

  const handleInputChange = (setter, field) => (value) => {
    setter(value);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const extractAccountsInLevel3 = (accountsPlan) => {
    const result = [];
    const traverse = (node) => {
        if (Array.isArray(node)) {
            node.forEach(traverse);
        } else if (node.nivel === 3 && node.contas) {
            result.push(...node.contas);
        } else {
            for (const key in node) {
                traverse(node[key]);
            }
        }
    };
    traverse(accountsPlan);
    return result;
  };

  const level3AccountsPlan = extractAccountsInLevel3(planoContas);

  const handleInitialAmountChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    const formattedValue = formatCurrency(value);
    setInitialAmount(formattedValue);
  };

  const handleFinalAmountChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    const formattedValue = formatCurrency(value);
    setFinalAmount(formattedValue);
  };

  const formatCurrency = (value) => {
    if (!value) return '';
    while (value.length < 3) {
        value = '0' + value;
    }
    const number = parseFloat(value) / 100;
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(number);
};

  return (
    <section className="lg:pl-2 my-5 z-10">
      <div className="mx-4 my-2">
        <h1 className="text-2xl font-semibold text-gray-800">Fluxo de Caixa</h1>
        <div className="flex px-2 py-2">
          <Link href="/finance" className="text-gray-600">Home</Link>
          <p className="text-gray-600 mx-2 ">/</p>
          <Link href="/finance/cashflow" className="text-gray-900 font-semibold">Fluxo de Caixa</Link>
        </div>
      </div>
      <div className="grid grid-cols-3 grid-flow-col border px-5 py-5 mx-5 my-5 bg-white shadow-md sm:rounded-lg">
        <div className="grid">
          <div className="flex flex-row text-black mx-4 border border-gray-100 shadow-sm rounded-md p-2 h-24 w-96">
            <div className="pt-1">
              Valor Inicial:
              <input
                type="text"
                value={initialAmount}
                placeholder='R$ 0,00'
                onChange={handleInitialAmountChange}
                className="border rounded-md px-4 py-1 mx-1 w-40 justify-end"
              />
            </div>
            <div className="pt-1">
              Valor Final:
              <input
                type="text"
                value={finalAmount}
                placeholder='R$ 0,00'
                onChange={handleFinalAmountChange}
                className="border rounded-md px-4 py-1 mx-1 w-40 justify-end"
              />
            </div>
          </div>
          <div className="flex-row z-30 my-2 mx-4 py-2 h-24 w-96 bg-white border border-gray-100 rounded-lg shadow-sm text-black">
            <SearchDateInput
              onInitialDateChange={(initialDate) => setInitialDueDate(initialDate)}
              onFinalDateChange={(finalDate) => setFinalDueDate(finalDate)}
              initialDate={initialDueDate}
              finalDate={finalDueDate}
              title="Data Vencimento"
            />
          </div>
          <div className="flex-row z-30 my-2 mx-4 py-2 h-24 w-96 bg-white border border-gray-100 rounded-lg shadow-sm text-black">
            <SearchDateInput
              onInitialDateChange={(initialDate) => setInitialEmissionDate(initialDate)}
              onFinalDateChange={(finalDate) => setFinalEmissionDate(finalDate)}
              initialDate={initialEmissionDate}
              finalDate={finalEmissionDate}
              title="Data Emissão"
            />
          </div>
        </div>
        <div className="grid">
          <div className="flex flex-col text-black mx-4 border border-gray-100 shadow-sm rounded-md p-2 h-24">
            <SearchDataDropdown
              data={level3AccountsPlan}
              value={accountPlan}
              onChange={handleInputChange(setAccountPlan)}
              title={'Plano de Contas'}
            />
          </div>
          <div className="flex flex-col text-black mx-4 border border-gray-100 shadow-sm rounded-md p-2 h-24">
            <SearchDataDropdown
              data={['Fulano LTDA', 'Fulano de Tal LTDA']}
              value={beneficiary}
              onChange={handleInputChange(setBeneficiary)}
              title={'Favorecido'}
            />
          </div>
          <div className="flex flex-col text-black mx-4 border border-gray-100 shadow-sm rounded-md p-2 h-24">
            <SearchDataDropdown
              data={['Em Aberto', 'Pago', 'Inadimplente']}
              value={status}
              onChange={handleInputChange(setStatus)}
              title={'Status'}
            />
          </div>
        </div>
        <div className="grid">
          <div className="flex flex-col text-black mx-4 border border-gray-100 shadow-sm rounded-md p-2 h-24">
            <SearchDataDropdown
              data={['Loja 1', 'Loja 2']}
              value={centerCost}
              onChange={handleInputChange(setCenterCost)}
              title={'Centro de Custo'}
            />
          </div>
          <div className="flex flex-col text-black mx-4 border border-gray-100 shadow-sm rounded-md p-2 h-24">
            <SearchDataDropdown
              data={['Bank 1', 'Bank 2', 'Bank 3']}
              value={bankAccount}
              onChange={handleInputChange(setBankAccount)}
              title={'Conta Bancária'}
            />
          </div>
        </div>
        <div className="flex">
          <button className="bg-green-500 mx-1 my-2 h-12 w-20 text-white font-bold rounded-lg">Buscar</button>
          <button className="bg-blue-600 mx-1 my-2 h-12 w-20 text-white font-bold rounded-lg">exportar</button>
        </div>
      </div>
      <div className="flex flex-col border px-5 py-5 mx-5 bg-white shadow-md sm:rounded-lg min-h-screen">
        <div className="flex flex-col lg:flex-row items-center justify-between mb-5">
          <div className="flex justify-between relative mb-5 lg:mb-0">
            <div ref={dropdownRef}>
              <DateDropdown data={months} onShowCalendar={onShowCalendar} onHideCalendar={onHideCalendar} />
              {showCalendar && (
                <div className="absolute flex flex-col sm:flex-row z-30 my-2 mx-2 py-2 bg-white border rounded-lg shadow-xl min-w-fit" ref={calendarRef}>
                  <DateInput />
                  <DateInput />
                  <DateButton />
                </div>
              )}
            </div>
          </div>
          <div className="w-full lg:w-auto">
            <SearchInput />
          </div>
        </div>
        <div className="w-full overflow-x-auto">
          <CashFlowTable data={data} />
        </div>
      </div>
    </section>
  );
}

export default CashFlowMain;
