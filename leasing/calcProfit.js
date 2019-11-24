const NDS = 1.2; // NDS tax
const TAX_PROFIT = 0.18; // profit tax

const finFormat = (num) => {
    let fr = num % 1;
    let dec = Math.floor(num);
    let decStr = dec.toString().split("").reverse();

    let str = fr.toFixed(3).substr(1);
    for (let i = 0; i < decStr.length; i++) {
        str = ((i > 0 && (i + 1) % 3 === 0) ? " " : "") + decStr[i] + str;
    }

    return str;
}

document.getElementById("doCalc").addEventListener("click", () => {
    const eqCost = +document.getElementById("eqCost").value;
    const leftCostAfterLeasing = +document.getElementById("leftCostAfterLeasing").value / 100;
    const firstPayPart = +document.getElementById("firstPayPart").value / 100;
    const depositProfit = +document.getElementById("depositProfit").value / 100;
    const leasePeriod = +document.getElementById("leasePeriod").value;
    const ammortizationPeriod = +document.getElementById("ammortizationPeriod").value;

    if (leasePeriod > ammortizationPeriod) {
        throw new Error("Leasing period can't be bigger then ammortization period");
    }
    
    const calcProfitTaxEconomyFn = ammPerMonth => leasingPay => (leasingPay - ammPerMonth) * TAX_PROFIT;
    const calcDepositProfit = (sum, quartals, profitPart) => sum * Math.pow(1 + profitPart, quartals) - sum;
    
    // Calculations -----------------------------------------------
    const eqCostWithoutNds = eqCost / NDS;
    const firstPay = eqCostWithoutNds * firstPayPart;
    const leaseSum = eqCostWithoutNds - firstPay - eqCostWithoutNds * leftCostAfterLeasing;
    const leaseSumPerMonth = leaseSum / leasePeriod;
    
    // how much will be paid in first month
    const firstMonthLeasingSum = leaseSumPerMonth + firstPay;
    
    // how much will be paid in othe months during leasing
    const otherMonthsLeasingSum = leaseSumPerMonth;
    
    // ammortization costs after leasing ends
    const ammortizationPeriodAfterLeasing = ammortizationPeriod - leasePeriod;
    const afterLeasingPay = eqCostWithoutNds * leftCostAfterLeasing / ammortizationPeriodAfterLeasing; 
    
    const ammortizationPayPerMonth = eqCostWithoutNds / ammortizationPeriod;
    const calcProfitTaxEconomy = calcProfitTaxEconomyFn(ammortizationPayPerMonth);
    
    const arrProfitTaxEconomy = new Array(ammortizationPeriod);

    // first month with first pay
    arrProfitTaxEconomy[0] = calcProfitTaxEconomy(firstMonthLeasingSum);

    for (let i = 1; i < ammortizationPeriod; i++) {
        // is leasing period no ended
        if (i < leasePeriod) {
            arrProfitTaxEconomy[i] = calcProfitTaxEconomy(otherMonthsLeasingSum);
        } else {
            arrProfitTaxEconomy[i] = calcProfitTaxEconomy(afterLeasingPay);
        }
    }

    const quartalDepositProfitPart = depositProfit / 4;

    const ammortizationPeriodQuartal = ammortizationPeriod / 3
    const arrDepositProfit = new Array(ammortizationPeriodQuartal);

    arrDepositProfit[0] = 0;
    for (let i = 1; i < ammortizationPeriodQuartal; i++) {
        let depositQuartalSum = arrProfitTaxEconomy.slice((i-1) * 3, i * 3).reduce((a, b) => a + b, 0);
        arrDepositProfit[i] = calcDepositProfit(depositQuartalSum, ammortizationPeriodQuartal - i, quartalDepositProfitPart);
    }

    const profit = arrDepositProfit.reduce((a, b) => a + b, 0);
    document.getElementById("profit").textContent = finFormat(profit) + " BYN";

    const ammortizationPeriodYears = ammortizationPeriod / 12;
    const profitPart = profit / eqCost;
    const profitPartPerYear = (profitPart / ammortizationPeriodYears) * 100;

    document.getElementById("profitPartPerYear").textContent = profitPartPerYear.toFixed(3) + "%";

    const leasingCostPart = +document.getElementById("leasingCostPart").value;
    const newLeasingCost = leasingCostPart - profitPartPerYear;

    document.getElementById("newLeasingCost").textContent = newLeasingCost.toFixed(3);
}, false);