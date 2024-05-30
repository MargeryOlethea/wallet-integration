import { chainInfoMap } from "@/constants/chainInfoMap";
import { useWallet } from "./useWallet";
import { ValidatorData } from "@/types/validator.types";
import { DelegationData } from "@/types/delegatios.types";

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

  const getDelegationByDelegator = async () => {
    const response = await fetch(
      `${baseUrl}/cosmos/staking/v1beta1/delegations/${userAddress}`,
    );
    const myDelegations: DelegationData = await response.json();

    return myDelegations;
  };

  const getValidatorsInfoByDelegator = async () => {
    const response = await fetch(
      `${baseUrl}/cosmos/staking/v1beta1/delegators/${userAddress}/validators`,
    );
    const myValidators: ValidatorData = await response.json();

    return myValidators;
  };
  return {
    getValidatorsList,
    getDelegationByDelegator,
    getValidatorsInfoByDelegator,
  };
};
