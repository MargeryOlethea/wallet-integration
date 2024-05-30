import { chainInfoMap } from "@/constants/chainInfoMap";
import { useWallet } from "./useWallet";
import { ValidatorData } from "@/types/validator.types";

export const useStakingApi = () => {
  const { userAddress, chainId } = useWallet();
  const baseUrl = (chainId && chainInfoMap[chainId].rest) || "";

  const getValidatorsList = async (paginationOffset: number) => {
    const validatorStatus = "BOND_STATUS_BONDED";
    const paginationLimit = 10;

    const response = await fetch(
      `${baseUrl}/cosmos/staking/v1beta1/validators?status=${validatorStatus}&pagination.limit=${paginationLimit}&pagination.offset=${paginationOffset}`,
    );
    const validatorsList: ValidatorData = await response.json();

    return { validatorsList, paginationLimit };
  };

  const getValidatorsByDelegator = async () => {
    const response = await fetch(
      `${baseUrl}/cosmos/staking/v1beta1/delegators/${userAddress}`,
    );
    const myValidatorsList: ValidatorData = await response.json();

    return myValidatorsList;
  };

  return { getValidatorsList, getValidatorsByDelegator };
};
