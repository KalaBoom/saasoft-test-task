<template>
    <main class="main">
        <div class="main__head">
            <h1>Учётные записи</h1>
            <i class="pi pi-plus icon" @click="addAccount"></i>
        </div>
        <div class="main__info">
            <i class="pi pi-info-circle"></i>
            Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
        </div>
        <div class="main__body">
            <AccountsTable />
        </div>
    </main>
</template>

<script setup lang="ts">
import AccountsTable from '@/components/AccountsTable.vue';
import { useAccountStore } from "@/stores/account.ts";

const { addAccount } = useAccountStore();
</script>

<style lang="scss">
.main {
    &__head {
        display: flex;
        align-items: center;
        gap: 15px;
        .icon {
            cursor: pointer;
            padding: 5px;
            border: 1px solid black;
            border-radius: 5px;
            font-size: 16px;
        }
    }
    &__info {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        background-color: #EEF4FA;
        border-radius: 5px;
        padding: 5px 10px;
        margin-bottom: 20px;
    }
}
</style>