import { useState } from "react";

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState(300000);
  const [downPayment, setDownPayment] = useState(20);
  const [loanTerm, setLoanTerm] = useState(30);
  const [interestRate, setInterestRate] = useState(6.5);
  const [zipCode, setZipCode] = useState("");
  const [creditScore, setCreditScore] = useState("740+");
  const [propertyTax, setPropertyTax] = useState(250);
  const [pmi, setPmi] = useState(0);
  const [hoaFees, setHoaFees] = useState(0);

  // Calculate loan amount
  const loanAmount = homePrice - (homePrice * (downPayment / 100));

  // Calculate monthly mortgage payment (Principal & Interest)
  const monthlyInterestRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;
  const monthlyPrincipalAndInterest = loanAmount > 0
    ? (loanAmount * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments))
    : 0;

  const totalMonthlyPayment =
    monthlyPrincipalAndInterest + propertyTax + pmi + hoaFees;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Mortgage Calculator</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label>Home Price ($)</label>
          <input
            type="number"
            value={homePrice}
            onChange={(e) => setHomePrice(Number(e.target.value))}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label>Down Payment (%)</label>
          <input
            type="number"
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
            className="border p-2 w-full"
          />
          <p className="text-sm">Amount: ${(homePrice * (downPayment / 100)).toFixed(2)}</p>
        </div>

        <div>
          <label>Loan Term (Years)</label>
          <select
            value={loanTerm}
            onChange={(e) => setLoanTerm(Number(e.target.value))}
            className="border p-2 w-full"
          >
            <option value={30}>30</option>
            <option value={20}>20</option>
            <option value={15}>15</option>
            <option value={10}>10</option>
          </select>
        </div>

        <div>
          <label>Interest Rate (%)</label>
          <input
            type="number"
            step="0.01"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label>ZIP Code</label>
          <input
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label>Credit Score</label>
          <select
            value={creditScore}
            onChange={(e) => setCreditScore(e.target.value)}
            className="border p-2 w-full"
          >
            <option value="740+">740+</option>
            <option value="700-719">700-719</option>
            <option value="680-699">680-699</option>
            <option value="660-679">660-679</option>
          </select>
        </div>

        <div>
          <label>Property Tax ($/month)</label>
          <input
            type="number"
            value={propertyTax}
            onChange={(e) => setPropertyTax(Number(e.target.value))}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label>PMI ($/month)</label>
          <input
            type="number"
            value={pmi}
            onChange={(e) => setPmi(Number(e.target.value))}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label>HOA Fees ($/month)</label>
          <input
            type="number"
            value={hoaFees}
            onChange={(e) => setHoaFees(Number(e.target.value))}
            className="border p-2 w-full"
          />
        </div>
      </div>

      <div className="mt-6 p-4 border rounded-lg bg-gray-100 text-black">
        <h2 className="text-xl font-semibold">Estimated Monthly Payment</h2>
        <p className="text-lg font-bold">${totalMonthlyPayment.toFixed(2)}</p>
        <p className="text-sm">Includes Principal, Interest, Taxes, PMI & HOA</p>
      </div>
    </div>
  );
}
