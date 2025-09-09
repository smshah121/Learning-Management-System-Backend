"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("./data-source");
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log('Connected to Neon!');
    process.exit(0);
})
    .catch((err) => {
    console.error('Connection error:', err);
});
//# sourceMappingURL=test-connection.js.map