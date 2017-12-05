module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true,
        "mocha": true
    },
    "extends": ["eslint:recommended", "plugin:react/recommended"],
    "parserOptions": {
        "ecmaVersions": 6,
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "jsx"
    ],
    "rules": {
        "jsx/uses-factory": [1, {"pragma": "JSX"}],
        "jsx/mark-used-vars": 1,
        "jsx/no-undef": 0,
        "react/prop-types": 0,
        "no-console": 0,
        "space-before-blocks": 0,
        "arrow-spacing": 1,
        "keyword-spacing": 1,
        "spaced-comment": 1,
        "space-before-function-paren": 1,
        "semi": 0,
        "quotes": 0,
        "no-multiple-empty-lines": 1,
        "react/jsx-uses-react": 1,
        "react/jsx-uses-vars": 1
    }
};
