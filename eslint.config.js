module.exports = {
  rules: {
    "no-restricted-imports": [
      "error",
      {
        paths: [
          {
            name: "react-native",
            importNames: ["Text", "View"],
            message: "Import Text and View from tamagui instead of react-native",
          },
        ],
      },
    ],
  },
};
