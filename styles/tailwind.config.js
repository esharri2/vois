const easing = "linear";
const colors = {
  darkPurp: "#020122",
  paradisePink: "#EE4266",
  paradisePinkMedium: "#eb264f",
  paradisePinkDark: "#8b0c27",
  paradisePinkDarkest: "#6f0a1f",
  honeydew: "#F3FCF0",
  honeydewMedium: "#d2f3c6",
  charcoal: "#495159",
  gray: "#dcdcdc",
};

module.exports = {
  darkMode: "class",
  purge: {
    content: ["./_site/**/*.html"],
  },
  theme: {
    boxShadow: {
      sm:
        "0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12), 0 1px 3px 0 rgba(0,0,0,0.20)",
      DEFAULT:
        "0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.20)",
      md:
        "0 3px 4px 0 rgba(0,0,0,0.14), 0 3px 3px -2px rgba(0,0,0,0.12), 0 1px 8px 0 rgba(0,0,0,0.20)",
      lg:
        "0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12), 0 2px 4px -1px rgba(0,0,0,0.20)",
      xl:
        "0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12), 0 3px 5px -1px rgba(0,0,0,0.20)",
      "2xl":
        "0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12), 0 5px 5px -3px rgba(0,0,0,0.20)",
      "3xl":
        "0 9px 12px 1px rgba(0,0,0,0.14), 0 3px 16px 2px rgba(0,0,0,0.12), 0 5px 6px -3px rgba(0,0,0,0.20)",
      none: "none",
    },
    colors: {
      dark: colors.darkPurp,
      light: colors.honeydew,
      lightMedium: colors.honeydewMedium,
      accent: colors.paradisePink,
      accentMedium: colors.paradisePinkMedium,
      accentDark: colors.paradisePinkDark,
      accentDarkest: colors.paradisePinkDarkest,
      gray: colors.charcoal,
      grayLight: colors.gray,
      current: "currentColor",
      transparent: "transparent",
    },
    container: {
      center: true,
      padding: "2rem",
    },
    fontFamily: {
      display: ["Roboto Condensed Bold Italic", "sans-serif"],
      body: ["Roboto Condensed Light", "Helvetica", "sans-serif"],
      strong: ["Roboto Condensed", "Helvetica", "sans-serif"],
    },
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    spacing: {
      0: "0",
      1: ".5rem",
      2: "1rem",
      3: "1.5rem",
      4: "2rem",
      5: "4rem",
      6: "6rem",
      7: "8rem",
      8: "10rem",
    },
    extend: {
      animation: {
        "fade-in": `fadeIn .2s ${easing}`,
        "slide-left": `slideLeft .2s ${easing}`,
      },
      gridTemplateColumns: {
        "custom-4": "2ch 4fr 1fr",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideLeft: {
          "0%": {
            transform: "translateX(0px)",
          },
          "100%": {
            transform: "translateX(100%)",
          },
        },
      },
    },
  },
  variants: {
    extend: {
      padding: ["first", "last"],
      margin: ["first", "last"],
    },
  },
};
