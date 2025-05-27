const config = {
  applications_per_page: 10,
  server_base_url:
    import.meta.env.VITE_SERVER_BASE_URL || "http://localhost:5000",
};
const _config = Object.freeze(config);
export default _config;
