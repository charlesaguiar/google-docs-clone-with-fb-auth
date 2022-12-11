/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			screens: {
				xs: "420px",
			},
			height: {
				nav: "var(--navbar-height)",
			},
			width: {
				sidebar: "var(--sidebar-width)",
			},
		},
	},
	plugins: [],
};
