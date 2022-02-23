function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !==undefined) {
      return `hsla(var(${variableName}), ${opacityValue})`
    }
    return `hsl(var(${variableName}))`
  }
}

module.exports = {
  darkMode: "class", // or 'media' or 'class'
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: withOpacity('--color-primary'),
        grey: withOpacity('--color-grey'),
        "primary-accent": withOpacity('--color-primary-accent'),
        "table-head": withOpacity('--color-table-head'),
        "table-text": withOpacity('--color-table-text'),
      },
    },
  },
  plugins: [],
}
