import { defineStore } from "pinia";

import { fetchWrapper } from "../helpers/fetch-wrapper";

export const useImagesStore = defineStore({
    id: "images",
    state: () => ({
        image: null
    }),
    actions: {
        async saveImage(image) {
            try {
                this.image = await fetchWrapper.post(`${import.meta.env.VITE_API_URL}/images/save`, image);
                return this.image;
            } catch (error) {
                console.log(error);
            }
        }
    }
});