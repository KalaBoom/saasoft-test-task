import { ref, computed, type Ref } from "vue";
import { defineStore } from "pinia";
import { type Account, type SavedAccount } from "@/types/account";
import { TypeAccountEnum } from "@/enum/typeAccountEnum";
import {
  LOCAL_STORE_KEY
} from "@/config";

export const useAccountStore = defineStore("account", () => {
  const accounts: Ref<Array<Account>> = ref([]);
  const savedAccounts: Ref<Array<SavedAccount>> = ref([]);

  const getAccounts = computed(() => accounts.value);
  const getTypesAccounts = computed(() => [
    { label: "LDAP", value: TypeAccountEnum.ldap },
    { label: "Локальная", value: TypeAccountEnum.local },
  ]);

  const getUnicId = () => {
    return new Date().getTime();
  };

  const addAccount = () => {
    accounts.value.push({
      id: getUnicId(),
      mark: "",
      type: TypeAccountEnum.ldap,
      login: "",
      password: null,
    });
  };

  const removeAccount = (item: Account) => {
    accounts.value = accounts.value.filter((i) => i.id !== item.id);
    savedAccounts.value = savedAccounts.value.filter(i => i.id !== item.id);
    savedInStorageAccounts();
  };

  const saveAccount = (item: Account) => {
    const account: SavedAccount = {
      ...item,
      mark: item.mark.split(';').map(i => ({text: i}))
    }
    const indexItem = savedAccounts.value.findIndex(i => i.id === item.id);
    if (indexItem === -1) {
      savedAccounts.value.push(account);
    } else {
      savedAccounts.value[indexItem] = account;
    }

    savedInStorageAccounts();
  };

  const savedInStorageAccounts = () => {
    localStorage.setItem(LOCAL_STORE_KEY, JSON.stringify(savedAccounts.value));
  };

  const getFromStorageAccounts = () => {
    const storage = localStorage.getItem(LOCAL_STORE_KEY) || null;
    if (!storage) {
      return [];
    }
    const accounts: Array<SavedAccount> = JSON.parse(storage);
    return accounts;
  };

  const initAccounts = () => {
    savedAccounts.value = getFromStorageAccounts();
    accounts.value = savedAccounts.value.map(i => ({
      ...i,
      mark: i.mark.map(i => i.text).join(';')
    }));
  };

  return {
    initAccounts,
    getAccounts,
    getTypesAccounts,
    addAccount,
    removeAccount,
    saveAccount
  };
});
