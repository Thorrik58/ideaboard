module.exports = {
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "rules": {
        "react/react-in-jsx-scope": "off"
    },
    "globals": {
        "React": "writable"
    },
    "parserOptions": {
        "ecmaVersion": 9,
        "ecmaFeatures": {
          "jsx": true
        },
        "sourceType": "module"
    },
    "env": {
        "browser": true,
        "node": true
    },
}