import React, { useState, useContext } from 'react';
import DateInput from '../inputs/searchInput/DateInput';
import DataDropdown from '../dropdowns/DataDropdown';
import { planoContas, favorecidos } from '@/mockData';
import TableDataContext from '@/app/context/TableDataContext';

function NewFinancialMovementForm() {
    const [amount, setAmount] = useState('');
    const [totalAmount, setTotalAmount] = useState('');
    const [balance, setBalance] = useState('');
    const [description, setDescription] = useState('');
    const [formData, setFormData] = useState([]);
    const [emissionDate, setEmissionDate] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [beneficiary, setBeneficiary] = useState('');
    const [accountPlan, setAccountPlan] = useState('');
    const [paymentType, setPaymentType] = useState('');
    const [costCenter, setCostCenter] = useState('');
    const [bankAccount, setBankAccount] = useState('');
    const [status, setStatus] = useState('');
    const [isFormDisabled, setIsFormDisabled] = useState(false);
    const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);
    const [isTotalAmountDisabled, setIsTotalAmountDisabled] = useState(false);
    const [hasFormBeenSubmitted, setHasFormBeenSubmitted] = useState(false);
    const [mandatoryFields, setMandatoryFields] = useState({
        emissionDate: false,
        dueDate: false,
        beneficiary: false,
        accountPlan: false,
        paymentType: false,
        costCenter: false,
        bankAccount: false,
        status: false,
        amount: false,
    });

    const { setTableData } = useContext(TableDataContext);

    const extractNivel3Contas = (planoContas) => {
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
        traverse(planoContas);
        return result;
    };

    const handleAmountChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        const formattedValue = formatCurrency(value);
        setAmount(formattedValue);
        setMandatoryFields({ ...mandatoryFields, amount: !formattedValue });
    };

    const handleTotalAmountChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        const formattedValue = formatCurrency(value);
        setBalance(formattedValue);
    };

    const handleInputChange = (setter, field) => (value) => {
        setter(value);
        setMandatoryFields({ ...mandatoryFields, [field]: !value });
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

    const checkMandatoryFields = () => {
        const allMandatoryFieldsFilled = emissionDate && dueDate && beneficiary && accountPlan && paymentType && costCenter && bankAccount && status && amount;
        const balanceValue = parseFloat(balance.replace(/[R$.,]/g, '').replace(',', '.')) / 100;
        setSaveButtonDisabled(!(allMandatoryFieldsFilled && balanceValue === 0));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const mandatoryCheck = {
            emissionDate: !emissionDate,
            dueDate: !dueDate,
            beneficiary: !beneficiary,
            accountPlan: !accountPlan,
            paymentType: !paymentType,
            costCenter: !costCenter,
            bankAccount: !bankAccount,
            status: !status,
            amount: !amount,
        };

        setMandatoryFields(mandatoryCheck);

        if (Object.values(mandatoryCheck).some(value => value)) {
            alert("Please fill all mandatory fields.");
            return;
        }

        const amountValue = parseFloat(amount.replace(/[R$.,]/g, '').replace(',', '.')) / 100;
        const remainingBalance = parseFloat(balance.replace(/[R$.,]/g, '').replace(',', '.')) / 100;

        if (amountValue === 0 || remainingBalance < amountValue) {
            alert("Please ensure the values are valid.");
            return;
        }

        if (amountValue <= remainingBalance) {
            const newRow = {
                emissionDate,
                dueDate,
                beneficiary,
                accountPlan,
                paymentType,
                costCenter,
                bankAccount,
                status,
                amount,
                description,
                totalAmount,
            };
            setFormData(prevFormData => [...prevFormData, newRow]);
            const newBalance = formatCurrency(((remainingBalance - amountValue) * 100).toString());
            setBalance(newBalance);

            if (parseFloat(newBalance.replace(/[R$.,]/g, '').replace(',', '.')) / 100 === 0) {
                setSaveButtonDisabled(false);
            }

            // Set form submitted flag to true to disable the total amount input
            setHasFormBeenSubmitted(true);

            // Clear the form
            setEmissionDate('');
            setDueDate('');
            setBeneficiary('');
            setAccountPlan('');
            setPaymentType('');
            setCostCenter('');
            setBankAccount('');
            setStatus('');
            setAmount('');
            setDescription('');
            setMandatoryFields({
                emissionDate: false,
                dueDate: false,
                beneficiary: false,
                accountPlan: false,
                paymentType: false,
                costCenter: false,
                bankAccount: false,
                status: false,
                amount: false,
            }); // Reset mandatory fields
        }
    };

    const handleSaveAllRows = () => {
        setTableData(formData);
        setFormData([]); // Clear the form data after saving

        // Reset the form submission flag and re-enable the total amount input
        setHasFormBeenSubmitted(false);
        setSaveButtonDisabled(true);
    };

    const level3 = extractNivel3Contas(planoContas);

    return (
        <div className="flex flex-col px-4 py-4 border min-h-screen">
            <div className="text-black flex px-2 my-2 w-50">
                Saldo total:
                <input
                    type="text"
                    value={balance}
                    placeholder='R$ 0,00'
                    onChange={handleTotalAmountChange}
                    disabled={isTotalAmountDisabled || hasFormBeenSubmitted} // Disable if form has been submitted
                    className={`rounded-md px-2 py-1 mx-2 w-96 bg-white bg-gray-100 ${mandatoryFields.balance ? 'border border-red-500' : ''}`}
                />
            </div>
            <div className="grid grid-flow-col bg-slate-100 border border-gray-200 rounded-md w-1/2 py-2 shadow-md">
                <form onSubmit={handleSubmit} className="grid-flow-row px-2">
                    <div className="grid grid-flow-col my-2 mx-2 w-1/2">
                        <label className="text-black justify-start">
                            Emissão:
                            <DateInput
                                value={emissionDate}
                                onChange={setEmissionDate}
                                className={mandatoryFields.emissionDate ? 'border border-red-500' : ''}
                            />
                        </label>
                        <label className="text-black justify-center">
                            Vencimento:
                            <DateInput
                                value={dueDate}
                                onChange={setDueDate}
                                className={mandatoryFields.dueDate ? 'border border-red-500' : ''}
                            />
                        </label>
                    </div>
                    <div className="grid grid-flow-row px-2 my-2 w-auto justify-between">
                        <label className="text-black flex justify-between px-2 my-2">
                            Favorecido:
                            <DataDropdown
                                data={favorecidos}
                                value={beneficiary}
                                onChange={handleInputChange(setBeneficiary, 'beneficiary')}
                                mandatory={mandatoryFields.beneficiary}
                            />
                        </label>
                        <label className="text-black flex justify-between px-2 my-2">
                            Plano de Contas:
                            <DataDropdown
                                data={level3}
                                value={accountPlan}
                                onChange={handleInputChange(setAccountPlan, 'accountPlan')}
                                mandatory={mandatoryFields.accountPlan}
                            />
                        </label>
                        <label className="text-black flex justify-between px-2 my-2">
                            Tipo de Pagamento:
                            <DataDropdown
                                data={['Boleto', 'Cartão de Crédito', 'Dinheiro', 'Transferência']}
                                value={paymentType}
                                onChange={handleInputChange(setPaymentType, 'paymentType')}
                                mandatory={mandatoryFields.paymentType}
                            />
                        </label>
                        <label className="text-black flex justify-between px-2 my-2">
                            Centro de Custo:
                            <DataDropdown
                                data={['Loja 1', 'Loja 2', 'Loja 3', 'Loja 4']}
                                value={costCenter}
                                onChange={handleInputChange(setCostCenter, 'costCenter')}
                                mandatory={mandatoryFields.costCenter}
                            />
                        </label>
                        <label className="text-black flex justify-between px-2 my-2">
                            Conta Bancária:
                            <DataDropdown
                                data={['Bank 1', 'Bank 2', 'Bank 3', 'Bank 4']}
                                value={bankAccount}
                                onChange={handleInputChange(setBankAccount, 'bankAccount')}
                                mandatory={mandatoryFields.bankAccount}
                            />
                        </label>
                        <label className="text-black flex justify-between px-2 my-2">
                            Status:
                            <DataDropdown
                                data={['Em aberto', 'Pago', 'Inadimplente']}
                                value={status}
                                onChange={handleInputChange(setStatus, 'status')}
                                mandatory={mandatoryFields.status}
                            />
                        </label>
                        <label className="text-black flex justify-between px-2 my-2">
                            Total:
                            <input
                                type="text"
                                value={amount}
                                placeholder='R$ 0,00'
                                onChange={handleAmountChange}
                                className={`rounded-md px-4 py-1 mx-1 w-96 justify-end ${mandatoryFields.amount ? 'border border-red-500' : ''}`}
                            />
                        </label>
                        <label className="text-black flex justify-between px-2 my-2">
                            Descrição:
                            <textarea
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="resize-none rounded-md px-2 py-1 mx-1 w-96 justify-end"
                            ></textarea>
                        </label>
                    </div>
                    <div className="flex justify-center">
                        <button
                            className="text-white border rounded-lg bg-blue-600 px-4 py-2"
                            type="submit"
                            disabled={isFormDisabled}
                        >
                            Incluir movimento
                        </button>
                    </div>
                </form>
            </div>
            <div className="mt-4">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Emissão</th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vencimento</th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Favorecido</th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plano de Contas</th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo de Pagamento</th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Centro de Custo</th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conta Bancária</th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {formData.map((row, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{row.emissionDate}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.dueDate}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.beneficiary}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.accountPlan}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.paymentType}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.costCenter}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.bankAccount}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.status}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.amount}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center mt-4">
                <button
                    onClick={handleSaveAllRows}
                    disabled={saveButtonDisabled}
                    className={saveButtonDisabled ? "text-white border rounded-lg bg-gray-600 px-4 py-2" : "text-white border rounded-lg bg-green-600 px-4 py-2"}
                >
                    Salvar
                </button>
            </div>
        </div>
    );
}

export default NewFinancialMovementForm;
