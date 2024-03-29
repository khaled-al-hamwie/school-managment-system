const nowDate = new Date().toISOString();
module.exports = {
    displayName: {
        name: "UNIT",
        color: "blue",
    },
    moduleFileExtensions: ["js", "json", "ts"],
    rootDir: "src",
    testRegex: ".*\\.spec\\.ts$",
    transform: {
        "^.+\\.(t|j)s$": "ts-jest",
    },
    collectCoverageFrom: ["**/*.(t|j)s"],
    coverageDirectory: "../coverage",
    testEnvironment: "node",
    moduleNameMapper: {
        "src/(.*)": "<rootDir>/$1",
    },
    reporters: [
        "default",
        [
            "jest-html-reporters",
            {
                publicPath: "./reports",
                filename: nowDate + "-" + "report.html",
                openReport: true,
                darkTheme: true,
            },
        ],
    ],
    verbose: true,
};
