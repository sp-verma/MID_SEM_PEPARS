import { withUt } from "uploadthing/tw";

export default withUt({
  // Your existing Tailwind config

  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      colors: {
        background: "#232946",
      },
    },
  },
});
