const NDS = 1.2; // NDS tax
const TAX_PROFIT = 0.18; // profit tax

const eqCost = 1200; // full cost of equipment with NDS
const leftCostAfterLeasing = 0.01; // % of all sum that should be paid after leasing is finished
const firstPayPart = 0.15; // % of whole sum
const depositProfit = 0.0791; // % for deposit profit per year

const leasePeriod = 12; // months of leasing
const ammortizationPeriod = 60; // months of credit

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

// console.log(arrProfitTaxEconomy);

const quartalDepositProfitPart = depositProfit / 4;

const ammortizationPeriodQuartal = ammortizationPeriod / 3
const arrDepositProfit = new Array(ammortizationPeriodQuartal);

arrDepositProfit[0] = 0;
for (let i = 1; i < ammortizationPeriodQuartal; i++) {
    let depositQuartalSum = arrProfitTaxEconomy.slice((i-1) * 3, i * 3).reduce((a, b) => a + b, 0);
    arrDepositProfit[i] = calcDepositProfit(depositQuartalSum, ammortizationPeriodQuartal - i, quartalDepositProfitPart);
}

console.log(arrDepositProfit.reduce((a, b) => a + b, 0));