<template>
  <table class="accounts-table">
    <thead>
      <tr>
        <th>Метки</th>
        <th>Тип записи</th>
        <th>Логин</th>
        <th>Пароль</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in accounts">
        <td>
          <InputText v-model="item.mark" :invalid="hasInInvalidMark(item.id)" @blur="onBlurMark(item)" />
        </td>
        <td>
          <Select
            v-model="item.type"
            :options="getTypesAccounts"
            optionLabel="label"
            optionValue="value"
            @change="onChangeType(item)"
          />
        </td>
        <td :colspan="item.type === TypeAccountEnum.ldap ? 2 : 1">
          <InputText v-model="item.login" :invalid="hasInInvalidLogin(item.id)" @blur="onBlurLogin(item)" />
        </td>
        <td v-if="item.type !== TypeAccountEnum.ldap">
          <InputText
            v-model="item.password"
            :invalid="hasInInvalidPassword(item.id)"
            @blur="onBlurPassword(item)"
          />
        </td>
        <td>
          <i class="pi pi-trash" @click="removeAccount(item)"></i>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import InputText from "primevue/inputtext";
import Select from "primevue/select";
import { useAccountStore } from "@/stores/account.ts";
import { TypeAccountEnum } from "@/enum/typeAccountEnum.ts";
import { useValidations } from "@/composes/useValidations.ts";
import { type Account } from "@/types/account";

const accountStore = useAccountStore();
const { removeAccount, getTypesAccounts, saveAccount, initAccounts } = accountStore;
const {
  hasInInvalidMark,
  hasInInvalidLogin,
  hasInInvalidPassword,
  validationMark,
  validationLogin,
  validationPassword,
  checkInvalidationAllField
} = useValidations();

const accounts = computed(() => accountStore.getAccounts);

const saveItem = (item: Account) => {
  if (!checkInvalidationAllField(item)) {
    saveAccount(item)
  }
};

const fabOnBlurFn = (validationFn: (item: Account) => boolean) => {
  return (item: Account) => {
    validationFn(item)
    saveItem(item);
  }
};

const onBlurMark = fabOnBlurFn(validationMark);
const onBlurLogin = fabOnBlurFn(validationLogin);
const onBlurPassword = fabOnBlurFn(validationPassword);
const onChangeType = (item: Account) => {
  if (item.type === TypeAccountEnum.ldap && item.password) {
    item.password = null;
  }
  saveItem(item);
};

initAccounts();
</script>

<style lang="scss">
.accounts-table {
  border-spacing: 10px;
  th {
    text-align: left;
  }
  .pi.pi-trash {
    cursor: pointer;
  }

  .p-select,
  .p-inputtext {
    width: 100%;
  }
}
</style>
