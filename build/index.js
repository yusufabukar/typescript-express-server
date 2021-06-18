"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_session_1 = __importDefault(require("cookie-session"));
var logIn_1 = __importDefault(require("./routes/logIn"));
var server = express_1.default();
server.use(body_parser_1.default.urlencoded({ extended: true }));
server.use(cookie_session_1.default({ keys: ['key'] }));
// server.get('/', (req: Request, res: Response) => {
// 	res.end('<h1>Server</h1>');
// });
server.use(logIn_1.default);
server.listen(3000, function () {
    console.group('Port Information');
    console.log('Listening on Port: 3000');
    console.log('Link: http://localhost:3000');
    console.groupEnd();
});
