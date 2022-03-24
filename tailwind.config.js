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
        red: withOpacity('--color-red'),
        blue: withOpacity('--color-blue'),
        yellow: withOpacity('--color-yellow'),
        greenish: withOpacity('--color-greenish'),
        twitter: withOpacity('--color-twitter'),
        facebook: withOpacity('--color-facebook'),
        linkedin: withOpacity('--color-linkedin'),
        "blue-accent": withOpacity('--color-blue-accent'),
        "purple-accent": withOpacity('--color-purple-accent'),
        "green-accent": withOpacity('--color-green-accent'),
        "primary-accent": withOpacity('--color-primary-accent'),
        "table-head": withOpacity('--color-table-head'),
        "table-text": withOpacity('--color-table-text'),
      },
      inset: {
        "3/5": "60%",
      }
    },
  },
  plugins: [],
}
