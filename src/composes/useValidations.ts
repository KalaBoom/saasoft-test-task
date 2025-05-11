import { type Account } from "@/types/account";
import { TypeAccountEnum } from "@/enum/typeAccountEnum";
import {ref, type Ref} from "vue";

export const useValidations = () => {
  const invalidMarkSet: Ref<Set<number>> = ref(new Set());
  const invalidLoginSet: Ref<Set<number>> = ref(new Set());
  const invalidPasswordSet: Ref<Set<number>> = ref(new Set());

  const hasInInvalidMark = (id: number) => invalidMarkSet.value.has(id);
  const hasInInvalidLogin = (id: number) => invalidLoginSet.value.has(id);
  const hasInInvalidPassword = (id: number) => invalidPasswordSet.value.has(id);

  const fabValidationCheckFn = (checkInvalidFn: (item: Account) => boolean, collection: Ref<Set<number>>) => {
    return (item: Account) => {
      if (checkInvalidFn(item)) {
        collection.value.add(item.id);
        return false;
      }
      collection.value.delete(item.id);
      return true;
    };
  };

  const checkInvalidMark = (item: Account) => !(item.mark && item.mark.length <= 50);
  const checkInvalidLogin = (item: Account) => !(item.login && item.login.length <= 100);
  const checkInvalidPassword = (item: Account) => !(item.type === TypeAccountEnum.ldap || (item.password && item.password.length <= 100));
  const checkInvalidationAllField = (item: Account): boolean => checkInvalidMark(item) || checkInvalidLogin(item) || checkInvalidPassword(item);
  
  const validationMark = fabValidationCheckFn(checkInvalidMark, invalidMarkSet);
  const validationLogin = fabValidationCheckFn(
    checkInvalidLogin,
    invalidLoginSet
  );
  const validationPassword = fabValidationCheckFn(
    checkInvalidPassword,
    invalidPasswordSet
  );
  

  return {
    hasInInvalidMark,
    hasInInvalidLogin,
    hasInInvalidPassword,
    validationMark,
    validationLogin,
    validationPassword,
    checkInvalidationAllField
  };
};
