"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const cors_1 = __importDefault(require("cors"));
const profile_routes_1 = __importDefault(require("./routes/profile.routes"));
const folder_routes_1 = __importDefault(require("./routes/folder.routes"));
const notes_routes_1 = __importDefault(require("./routes/notes.routes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const fs_1 = __importDefault(require("fs"));
const yaml_1 = __importDefault(require("yaml"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
const swaggerFile = fs_1.default.readFileSync('./src/config/swaggerDocs.yaml', 'utf8');
const swaggerDocument = yaml_1.default.parse(swaggerFile);
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.use('/api/auth', auth_routes_1.default);
app.use('/api/profile', profile_routes_1.default);
app.use('/api/folder', folder_routes_1.default);
app.use('/api/note', notes_routes_1.default);
app.get('/', (req, res) => {
    res.send('Notes App API is running!');
});
exports.default = app;
