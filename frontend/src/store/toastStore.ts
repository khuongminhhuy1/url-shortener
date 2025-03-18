import { defineStore } from "pinia";
import { useToast } from "vue-toastification";

export const useToastStore = defineStore("toast", () => {
  const toast = useToast(); 

  // Show success toast
  const showSuccess = (message: string) => {
    toast.success(message, { timeout: 3000 });
  };

  // Show error toast
  const showError = (message: string) => {
    toast.error(message, { timeout: 5000 });
  };

  return { showSuccess, showError };
});
