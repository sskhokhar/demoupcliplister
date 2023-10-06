module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testRegex: "(test/.*|(\\.|/)(test|spec))\\.unit\\.ts?$",
  moduleFileExtensions: ["ts", "js", "json", "node"],
  moduleDirectories: ["node_modules", "<rootDir>"],
};
