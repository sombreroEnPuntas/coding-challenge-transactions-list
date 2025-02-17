import { formatEther } from "ethers";

export const formatWeiToETH = (wei?: string) =>
  parseFloat(formatEther(wei || "0")).toLocaleString("en", {
    minimumFractionDigits: 4,
  });

// Source: https://github.com/gpxl-dev/truncate-eth-address/blob/main/src/index.ts
// Captures 0x + 4 characters, then the last 4 characters.
const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;

/**
 * Truncates an ethereum address to the format 0x0000…0000
 * @param address Full address to truncate
 * @returns Truncated address
 */
export const truncateEthAddress = (address: string) => {
  const match = address.match(truncateRegex);
  if (!match) return address;
  return `${match[1]}…${match[2]}`;
};
