"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var userRoutes_1 = __importDefault(require("./routes/userRoutes"));
var productRoutes_1 = __importDefault(require("./routes/productRoutes"));
var User_1 = require("./entities/User");
var Product_1 = require("./entities/Product");
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
(0, typeorm_1.createConnection)({
    type: 'sqlite',
    database: 'database.sqlite',
    entities: [User_1.User, Product_1.Product],
    synchronize: true,
    logging: true,
}).then(function () {
    console.log('Connected to SQLite database');
    app.use('/api/users', userRoutes_1.default);
    app.use('/api/products', productRoutes_1.default);
    var PORT = process.env.PORT || 5000;
    app.listen(PORT, function () { return console.log("Server running on port ".concat(PORT)); });
}).catch(function (error) { return console.log(error); });
