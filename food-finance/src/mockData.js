import { Description } from "@headlessui/react";

const data = [
    {
        "Data Vencimento": '01/02/2024',
        "Data Emissão": '20/01/2024',
        "Plano de contas (Nível III)": 'Vendas de Produtos',
        "Descrição": 'VENDAS STONE',
        "Favorecido": 'Fulano LTDA',
        "Tipo Pagamento": 'Boleto',
        "Centro de Custo": 'Loja 1',
        "Conta Bancária": 'Bank 1',
        "Status": 'Em aberto',
        "Total": "1.000,00"
    }, {
        "Data Vencimento": '02/02/2024',
        "Data Emissão": '15/01/2024',
        "Plano de contas (Nível II)": 'Vendas de Produtos',
        "Descrição": 'VENDAS STONE',
        "Favorecido": 'Fulano de Tal LTDA',
        "Tipo Pagamento": 'Boleto',
        "Centro de Custo": 'Loja 1',
        "Conta Bancária": 'Bank 1',
        "Status": 'Pago',
        "Total": '500,25'
    }
];

export const sidebarData = [
    {
        "title": 'Financeiro',
        "subTitles": [
            {
                'section': 'Dashboard',
                'endpoint': '/finance/dashboard'
            },
            {
                'section': 'Fluxo de Caixa',
                'endpoint': '/finance/cashflow'
            },
            {
                'section': 'Movimentação Financeira',
                'endpoint': '/finance/financialmovement'
            },
            {
                'section': 'Relatórios',
                'endpoint': '/finance/report'
            },
        ]
    },
    {
        "title": 'Recursos Humanos',
        "subTitles": [
            {
                'section': 'Dashboard',
                'endpoint': '/hr/dashboard'
            },
            {
                'section': 'Gestão de Equipe',
                'endpoint': '/hr/team-management'
            },
            {
                'section': 'Folha de Pagamento',
                'endpoint': '/hr/payroll'
            },
            {
                'section': 'Gorjetas',
                'endpoint': '/hr/tips'
            },
            {
                'section': 'Relatórios',
                'endpoint': '/hr/reports'
            }
        ]
    }
];

export const months = [
    "Today",
    "Yesterday",
    "Last 7 days",
    "Last 15 days",
    "Last 30 days",
    "Last 90 days",
    "Custom..."
];

export const files = [
    "Excel",
    "CSV",
    "PDF",
    "TXT"
]

export const planoContasReceitas1NivelUm = [
    "1 - Receita com Vendas",
    "2 - Receita Financeiras",
];


export const planoContasReceitas1NivelDois = [
    "1.01 - Vendas de Produtos",
    "1.02 - Vendas de Serviços",
];

export const planoContasReceitas1NivelTres = [
    "1.01.01 - Vendas de Produtos em Loja",
    "1.01.02 - Vendas de Produtos Online",
    "1.01.03 - Vendas de Produtos B2B",
];

export const planoContasDespesas1NivelUm = [
    "3 - Despesas Operacionais",
    "4 - Despesas Financeiras",
];

export const planoContasDespesas1NivelDois = [
    "3.01 - Despesas com Pessoal",
    "3.02 - Despesas com Aluguel",
];

export const planoContasDespesas1NivelTres = [
    "3.01.01 - Salários",
    "3.01.02 - Comissões",
    "3.01.03 - Benefícios",
];

export const planoContas = [{
        receitas_operacionais: [{
            nivel: 1,
            contas: [{
                receitas_vendas: [{
                    nivel: 2,
                    vendas_produtos: [{
                        nivel: 3,
                        contas: [
                            "1.01.01 - Vendas de Produtos em Loja",
                            "1.01.02 - Vendas de Produtos Online",
                            "1.01.03 - Vendas de Produtos B2B"
                        ]
                    }],
                    vendas_serviços: [{
                        nivel: 3,
                        contas: [
                            "1.02.01 - Consultoria",
                            "1.02.02 - Cursos",
                            "1.02.03 - Treinamentos"
                        ]
                    }],
                }],
            }]
        }],
}];

export const favorecidos = [
    "Fulano LTDA",
    "Fulano de Tal LTDA",
    "Fulano da Silva LTDA"
];

export default data;