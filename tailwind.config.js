const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/components/**/*.tsx", "./pages/**/*.tsx"],
  plugins: [require("tailwindcss-textshadow")],
  important: true,
  extends: {
    borderColor: "#EBEBEB"
  },
  corePlugins: true,
  theme: {
    extend: {
      colors: {
        green: colors.emerald,
        yellow: colors.amber,
        purple: colors.violet,
        primary: "#FC2B4E",
        secondary: "#FFA51D",
        border: "#EBEBEB",
        gray1: "#363939",
        gray2: "#686A6A",
        gray3: "#9B9C9C",
        gray4: "#CDCDCD",
        gray5: "#E6E6E6",
        success: "#50B238",
        warning: "#F9A602",
        error: "#ED2939",
        info: "#4169E1",
        "bg-dark": "#222222",
        "bg-light-gray": "#F7F7F7",
        "bg-light-yellow": "#FFF2D9",
        "bg-light-red": "#FEEFEF",
        "bg-light-blue": "#ECF5F8"
      },
      fontSize: {
        xs: "10px",
        sm: "12px",
        base: "14px",
        lg: "16px",
        xl: "18px",
        "2xl": "20px",
        "3xl": "22px",
        "4xl": "24px",
        "5xl": "26px",
        "6xl": "28px",
        "7xl": "30px",
        "8xl": "32px",
        "9xl": "34px",
        "10xl": "36px"
      },
      screens: {
        mobile: { max: "639px" },
        tablet: { max: "768px" },
        desktop: { min: "769px" },
        "voucher-container": { max: "1050px" }
      },
      spacing: {},
      letterSpacing: {
        tighter: "-.04em"
      },
      lineHeight: {
        tight: 1.2
      },
      boxShadow: {
        df: "0px 4px 24px rgba(0, 0, 0, 0.1)",
        header: "0px 4px 8px rgba(0, 0, 0, 0.04)",
        small: "0 5px 10px rgba(0, 0, 0, 0.12)",
        medium: "0 8px 30px rgba(0, 0, 0, 0.12)",
        card: "0px 2px 4px rgba(0, 0, 0, 0.04)"
      },
      width: {
        38: "150px",
        42: "168px",
        78: "308px",
        82: "340px",
        400: "400px",
        "98%": "98%"
      },
      height: {
        515: "515px"
      },
      minWidth: {
        0: "0",
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
        full: "100%",
        200: "200px",
        400: "400px"
      },
      maxWidth: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1128px",
        "2xl": "1280px",
        "3xl": "1536px",
        content: "1260px"
      }
    }
  }
};
