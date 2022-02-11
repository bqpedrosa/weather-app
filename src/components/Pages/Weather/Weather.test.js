import Weather from "./Weather.vue";

describe("Given Weather", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Mounted", () => {
    it("Should mounted call methods with payloads", async () => {
      const localThis = {
        handleTypeOfWeather: jest.fn(),
        getUserLocation: jest.fn(),
        getCurrentWeather: jest.fn(),
        userLocation: "location",
        $route: {
          query: {
            weather: "today",
          },
        },
      };

      await Weather.mounted.call(localThis);

      expect(localThis.handleTypeOfWeather).toHaveBeenLastCalledWith(
        localThis.$route.query.weather
      );
      expect(localThis.getUserLocation).toHaveBeenCalledTimes(1);
      expect(localThis.getCurrentWeather).toHaveBeenLastCalledWith(
        localThis.userLocation
      );
    });
  });

  describe("Methods", () => {
    it.each(["today", "forecast"])(
      "Should handleTypeOfWeather set typeOfweather if weather is %s",
      (expected) => {
        const localThis = {
          typeOfWeather: "test",
        };

        Weather.methods.handleTypeOfWeather.call(localThis, expected);

        expect(localThis.typeOfWeather).toBe(expected);
      }
    );

    it.each(["test", false, null, undefined, 1, -1])(
      "Should handleTypeOfWeather push route if payload is %s",
      (payload) => {
        const localThis = {
          $router: {
            push: jest.fn(),
          },
        };

        Weather.methods.handleTypeOfWeather.call(localThis, payload);

        const expected = { query: { weather: "today" } };

        expect(localThis.$router.push).toHaveBeenLastCalledWith(expected);
      }
    );

    it("Should handleDeleteButton call deleteCity with payload", () => {
      const localThis = {
        deleteCity: jest.fn(),
      };

      Weather.methods.handleDeleteButton.call(localThis, "test");

      expect(localThis.deleteCity).toHaveBeenLastCalledWith("test");
    });

    it("Should handleItemClick call $router and set typeOfWeather with payload", () => {
      const localThis = {
        typeOfWeather: "test",
        $router: {
          push: jest.fn(),
        },
      };

      const value = "Test 2";

      Weather.methods.handleItemClick.call(localThis, value);

      const payload = {
        query: { weather: value.toLowerCase() },
      };

      expect(localThis.$router.push).toHaveBeenLastCalledWith(payload);
      expect(localThis.typeOfWeather).toBe(value.toLowerCase());
    });

    it("Should handleInputClick call getCurrentWeather and set cityChosen", async () => {
      const localThis = {
        getCurrentWeather: jest.fn(),
        cityChosen: "test",
      };

      const newValue = "Test 2";

      await Weather.methods.handleInputClick.call(localThis, newValue);

      const payload = {
        city: newValue,
      };

      expect(localThis.cityChosen).toBe("");
      expect(localThis.getCurrentWeather).toHaveBeenLastCalledWith(payload);
    });
  });
});
