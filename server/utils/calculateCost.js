function calculateCost(weight, packageType) {
  const baseCost = 50; // BDT
  const weightCharge = weight > 1 ? (weight - 1) * 20 : 0;

  const extra = packageType === "Fragile" ? 30 : 0;

  return baseCost + weightCharge + extra;
}
module.exports = calculateCost;