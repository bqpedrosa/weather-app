import WeatherCurrent from "./WeatherCurrent.vue";

describe("Given WeatherCurrent", () => {
  describe("Methods", () => {
    it("Should handleDeleteButton emit with payload", () => {
      const localThis = {
        $emit: jest.fn(),
      };

      const index = 1;

      WeatherCurrent.methods.handleDeleteButton.call(localThis, index);

      const [emitName, payload] = localThis.$emit.mock.calls[0];

      expect(emitName).toBe("handleDeleteButton");
      expect(payload).toBe(index);
    });
  });
});
