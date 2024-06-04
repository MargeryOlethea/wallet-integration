import { chainInfoMap } from "@/constants/chainInfoMap";
import { useWallet } from "./useWallet";
import { ValidatorData } from "@/types/validator.types";
import { DelegationData } from "@/types/delegations.types";

export const useStakingApi = () => {
  const { userAddress, chainId } = useWallet();
  const baseUrl = (chainId && chainInfoMap[chainId].rest) || "";

  const getValidatorsList = async (
    paginationOffset: number | string = 0,
    paginationLimit: number | string = 999,
  ) => {
    const path = "/cosmos/staking/v1beta1/validators";
    const validatorStatus = "BOND_STATUS_BONDED";
    const queryParams = new URLSearchParams({
      status: validatorStatus.toString(),
      "pagination.limit": paginationLimit.toString(),
      "pagination.offset": paginationOffset.toString(),
    }).toString();

    const response = await fetch(baseUrl + path + "?" + queryParams);
    const validatorsList: ValidatorData = await response.json();

    return validatorsList;
  };

  const getDelegationByDelegator = async () => {
    const path = "/cosmos/staking/v1beta1/delegations/" + userAddress;
    const response = await fetch(baseUrl + path);
    const myDelegations: DelegationData = await response.json();

    return myDelegations;
  };

  const getValidatorsInfoByDelegator = async () => {
    const path =
      "/cosmos/staking/v1beta1/delegators/" + userAddress + "/validators";
    const response = await fetch(baseUrl + path);
    const myValidators: ValidatorData = await response.json();

    return myValidators;
  };
  return {
    getValidatorsList,
    getDelegationByDelegator,
    getValidatorsInfoByDelegator,
  };
};
