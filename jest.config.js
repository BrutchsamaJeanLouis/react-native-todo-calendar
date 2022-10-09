module.exports = {
  preset: 'jest-expo',
  transformIgnorePatterns: [
    // 'node_modules/(?!(jest-)?react-native|@react-native|react-(native|universal|navigation)-(.*)|@react-native-community/(.*)|@react-navigation/(.*)|bs-platform|(@[a-zA-Z]+/)?(bs|reason|rescript)-(.*)+)'
  ],
  transform: {
    '\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js'
  },
  verbose: true
}
