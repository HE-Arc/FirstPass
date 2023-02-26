import { defineStore } from "pinia";

export const useAlertStore = defineStore({
    id: "alert",
    state: () => ({
        alert: null,
    }),
    actions: {
        success(message) {
            this.alert = { message, type: "alert-success" };
            console.log(this.alert);
        },
        error(message) {
            this.alert = { message, type: "alert-danger" };
            console.log(this.alert);
        },
        clear() {
            this.alert = null;
        },
    },
});
