<template>
  <div class="notification-alert" v-if="notificationMessage">
    <label class="notification-alert__text">
      {{ notificationMessage }}
    </label>
    <div class="notification-alert__close">
      <button class="notification-alert__close-btn" @click="handleAlertClose">
        Close
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Notification",

  computed: {
    ...mapState({
      notificationMessage: (state) => state.notificationMessage.message,
    }),
  },

  methods: {
    ...mapActions({ resetMessage: "notificationMessage/resetMessage" }),
    handleAlertClose() {
      this.resetMessage();
    },
  },
};
</script>

<style lang="scss" scoped>
.notification-alert {
  display: flex;
  min-height: 40px;
  height: auto;
  background: var(--gray-dark);
  margin: 32px;
}

.notification-alert__text {
  padding: 8px;
  display: inherit;
  align-self: center;
  flex: 2;
  color: var(--white);
}

.notification-alert__close {
  padding-right: 8px;
  display: inherit;
  align-self: center;
}

.notification-alert__close-btn {
  cursor: pointer;
}
</style>
