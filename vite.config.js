export default {
    build: {
        rollupOptions: {
            input: {
                main: "index.html",
                weather: "src/pages/weather.html",
            },
            publicPath: "/public",
        },
    },
};
