import WeatherHeader from "./WeatherHeader.vue";

describe("Given WeatherHeader", () => {
  ~describe("Computed", () => {
    it("Should searchInput get return value", () => {
      const localThis = {
        value: 1,
      };

      const fn = WeatherHeader.computed.searchInput.get.call(localThis);

      expect(fn).toBe(localThis.value);
    });

    it("Should searchInput set emit input with payload", () => {
      const localThis = {
        $emit: jest.fn(),
      };

      const newValue = "test";
      const expected = "input";

      WeatherHeader.computed.searchInput.set.call(localThis, newValue);

      const [emitName, payload] = localThis.$emit.mock.calls[0];

      expect(emitName).toBe(expected);
      expect(payload).toBe(newValue);
    });
  });
  describe("Methods", () => {
    it("Should handleButtonClick emit with payload", () => {
      const localThis = {
        $emit: jest.fn(),
        searchInput: "test",
      };

      const index = 1;

      WeatherHeader.methods.handleButtonClick.call(localThis, index);

      const [emitName, payload] = localThis.$emit.mock.calls[0];

      expect(emitName).toBe("handleInputClick");
      expect(payload).toBe(localThis.searchInput);
    });
  });
});
