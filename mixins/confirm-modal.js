export default {
  data() {
    return {
      showConfirmModal: false,
      confirmText: "",
      confirmAction: () => {}
    };
  },
  methods: {
    setConfirmModal(text, action, preCondition) {
      if (preCondition) {
        return action();
      }
      this.showConfirmModal = true;
      this.confirmText = text;
      this.confirmAction = action;
    },
    closeModal() {
      this.showConfirmModal = false;
      this.showIntroModal = false;
      this.showWelcomeModal = false;
    },
    keydownHandler(event) {
      if (event.key === "Escape") {
        this.closeModal();
      }
    }
  },
  mounted() {
    document.addEventListener("keydown", this.keydownHandler);
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.keydownHandler);
  },
  provide() {
    return {
      setConfirmModal: this.setConfirmModal,
      closeModal: this.closeModal
    };
  }
};
