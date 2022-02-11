import NavigationBar from "./NavigationBar.vue";

describe("Given NavigationBar", () => {
  describe("Data", () => {
    it("Should data return activeIndex", () => {
      const fn = NavigationBar.data();

      const expected = {
        activeIndex: 0,
      };

      expect(fn).toStrictEqual(expected);
    });
  });

  describe("Computed", () => {
    it.each([
      [0, ["test", "test 2"], "test"],
      [1, ["test", "test 2"], "test 2"],
      [-1, ["test", "test 2"], "test 3"],
      [-1, [], "test"],
      [undefined, undefined, null],
      [undefined, null, null],
    ])(
      "Should getItemIndex return %s if 'getAllItems' equals %s and 'activeItem' equals %s",
      (expected, getAllItems, activeItem) => {
        const localThis = {
          getAllItems,
          activeItem,
        };

        const fn = NavigationBar.computed.getItemIndex.call(localThis);

        expect(fn).toBe(expected);
      }
    );
  });
  describe("Methods", () => {
    it.each([
      [1, "test item", 2],
      [0, null, 0],
      [-1, undefined, 0],
    ])(
      "Should handleItemClick set activeIndex and emit 'handleNavigationBarItemClick'",
      (activeIndex, item, index) => {
        const localThis = {
          activeIndex,
          $emit: jest.fn(),
        };

        NavigationBar.methods.handleItemClick.call(localThis, item, index);

        const [emitName, payload] = localThis.$emit.mock.calls[0];

        expect(localThis.activeIndex).toBe(index);
        expect(emitName).toBe("handleNavigationBarItemClick");
        expect(payload).toBe(item);
      }
    );

    it.each([
      [false, null, -1, 2, 1],
      [true, null, -1, 2, 2],
      [false, null, -1, 2, 1],
      [false, null, -1, 1, 2],
      [false, null, undefined, 1, 2],
      [true, "test", 1, 1, 1],
      [false, "test", 2, 1, 1],
    ])(
      "Should handleActiveIndex return %s if 'activeItem' equals %s, 'getItemIndex' equals %s, 'activeIndex' equals %s and 'index' equals %s",
      (expected, activeItem, getItemIndex, activeIndex, index) => {
        const localThis = {
          activeItem,
          activeIndex,
          getItemIndex,
        };

        const fn = NavigationBar.methods.handleActiveIndex.call(
          localThis,
          index
        );

        expect(fn).toBe(expected);
      }
    );
  });
});
