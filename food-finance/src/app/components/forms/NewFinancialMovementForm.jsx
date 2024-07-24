import React, { useState } from 'react';
import DateInput from '../inputs/searchInput/DateInput';
import ChartAccountsDropdown from '../dropdowns/ChartAccountsDropdown';
import { planoContas, favorecidos } from '@/mockData';

function NewFinancialMovementForm() {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');

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

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Submitted:', amount, description);
    };

    const level3 = extractNivel3Contas(planoContas);

    return (
        <div className="flex flex-col px-4 py-4 border min-h-screen">
            <form onSubmit={handleSubmit} className="grid-flow-row justify-start min-h-svh ">
                <div className="grid grid-flow-col px-2 my-2 max-w-96">
                    <label className="text-black justify-start">
                        Data de Emissão:
                        <DateInput />
                    </label>
                    <label className="text-black justify-start">
                        Data de Vencimento:
                        <DateInput />
                    </label>
                </div>
                <div className="grid grid-flow-row px-2 my-2 w-auto justify-between">
                    <label className="text-black flex justify-between px-2 my-2">
                        Plano de Contas:
                        <ChartAccountsDropdown
                            data={level3}
                        />
                    </label>
                    <label className="text-black flex justify-between px-2 my-2">
                        Favorecido:
                        <ChartAccountsDropdown
                            data={favorecidos}
                        />
                    </label>
                    <label className="text-black flex justify-between px-2 my-2">
                        Tipo de Pagamento:
                        <ChartAccountsDropdown
                            data={['Boleto', 'Cartão de Crédito', 'Dinheiro', 'Transferência']}
                        />
                    </label>
                    <label className="text-black flex justify-between px-2 my-2">
                        Centro de Custo:
                        <ChartAccountsDropdown
                            data={['Loja 1', 'Loja 2', 'Loja 3', 'Loja 4']}
                        />
                    </label>
                    <label className="text-black flex justify-between px-2 my-2">
                        Conta Bancária:
                        <ChartAccountsDropdown
                            data={['Bank 1', 'Bank 2', 'Bank 3', 'Bank 4']}
                        />
                    </label>
                    <label className="text-black flex justify-between px-2 my-2">
                        Status:
                        <ChartAccountsDropdown
                            data={['Em aberto', 'Pago', 'Inadimplente']}
                        />
                    </label>
                    <label className="text-black flex justify-between px-2 my-2">
                        Total:
                        <input
                            type="number"
                            value={amount}
                            className="rounded-md px-2 py-1 mx-2 w-96 justify-end"
                        />
                    </label>
                    <label className="text-black flex justify-between px-2 my-2">
                        Descrição:
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="rounded-md px-2 py-1 mx-2 w-96 justify-end"
                        />
                    </label>
                </div>
                <div className="flex justify-start">
                    <button className="text-black border px-4 py-2" type="submit">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default NewFinancialMovementForm;
