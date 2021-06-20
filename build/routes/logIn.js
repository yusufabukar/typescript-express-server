"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
;
function requireAuth(req, res, next) {
    var _a;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.loggedIn) {
        next();
        return;
    }
    ;
    res.status(403).end('FORBIDDEN');
}
;
var router = express_1.Router();
router.post('/login', function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    if (email === 'test@test.test' && password === 'test') {
        req.session = { loggedIn: true };
        res.redirect('/');
    }
    else {
        res.end('INVALID EMAIL OR PASSWORD');
    }
    ;
});
router.get('/', function (req, res) {
    var _a;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.loggedIn) {
        res.send("\n\t\t\t<div>\n\t\t\t\t<h2>Logged In</>\n\t\t\t\t<a href='/logout'>Log Out</a>\n\t\t\t</div>\n\t\t");
    }
    else {
        res.send("\n\t\t\t<div>\n\t\t\t\t<h2>Logged Out</>\n\t\t\t\t<a href='/login'>Log In</a>\n\t\t\t</div>\n\t\t");
    }
    ;
});
router.get('/logout', function (req, res) {
    req.session = undefined;
    res.redirect('/');
});
router.get('/protected', requireAuth, function (req, res) {
    res.end('Welcome, Authenticated User!');
});
exports.default = router;
