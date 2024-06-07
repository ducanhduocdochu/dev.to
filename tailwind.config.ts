import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Segoe UI', 'sans-serif'], 
      },
      boxShadow: {
        'custom': '0 1px 1px rgba(0, 0, 0, 0.1)',
        'box': '0px 0px 0px 1px rgba(23, 23, 23, 0.05)',
        'search': '0 0 0 1px rgb(59, 73, 223)',
        'create-post': 'rgba(23, 23, 23, 0.05) 0px 0px 0px 1px',
        'button-sub': '0px 1px 3px 0px rgba(0, 0, 0, 0.05)',
        'menu': 'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px, rgba(0, 0, 0, 0.1) 0px 0px 0px 1px'
      },
      spacing: {
        'header-h': '56px', 
        'header-w': '1348px', 
        'button': '208px', 
      },
      colors: {
        primary: '#FF6347', 
        secondary: '#6B7280',
        bg1: '#ffffff',
        bg2: '#f5f5f5',
        text: '#575757',
        text2: '#737373',
        text3: '#3d3d3d',
        text4: '#525252',
        'button': 'rgb(59, 73, 223)',
        'button2': 'rgb(64, 64, 64)',
        'button3': 'rgba( 59, 73, 223 , 0.1)',
        'button4' :'rgb( 47, 58, 178 )',
        'button5' :'rgb(113, 113, 113)',
        'button6' :'rgba(0, 0, 0, 0.035)',
        'bg-error' :'rgba(220, 38, 38, 0.1)',
        
      },
      borderWidth: {
        'border-button': '0.888889px', 
      },
      borderColor: {
        'button': 'rgb(59, 73, 223)',
        'button2': ' rgb(245, 245, 245)',
      }
    },
  },
  plugins: [],
} satisfies Config;
