import Notification from "./Notification.vue";

describe("Given Notification", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Methods", () => {
    it("Should handleAlertClose emit with payload", () => {
      const localThis = {
        resetMessage: jest.fn(),
      };

      Notification.methods.handleAlertClose.call(localThis);

      expect(localThis.resetMessage).toHaveBeenCalledTimes(1);
    });
  });
});
