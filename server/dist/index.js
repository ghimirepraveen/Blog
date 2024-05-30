"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const user_router_1 = __importDefault(require("./router/user.router"));
const blog_router_1 = __importDefault(require("./router/blog.router"));
const error_controller_1 = __importDefault(require("./controller/error.controller"));
const comment_router_1 = __importDefault(require("./router/comment.router"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use("/api/user", user_router_1.default);
app.use("/api/post", blog_router_1.default);
app.use("/api/comment", comment_router_1.default);
app.use(error_controller_1.default);
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}  `);
});
