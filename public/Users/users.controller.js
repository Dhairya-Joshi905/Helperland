"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
        this.getUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return this.usersService
                .getUsers()
                .then((user) => {
                return res.status(200).json({ user });
            })
                .catch((error) => {
                return res.status(500).json({
                    error: error
                });
            });
        });
        this.createUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return this.usersService
                .createUsers(req.body)
                .then((user) => {
                return res.status(200).json({ user });
            })
                .catch((error) => {
                return res.status(500).json({
                    error: error
                });
            });
        });
        this.getUsersById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return this.usersService
                .getUsersById(+req.params.id)
                .then((user) => {
                if (user) {
                    return res.status(200).json({ user });
                }
                return res.status(404).json({ error: 'NotFound' });
            })
                .catch((error) => {
                return res.status(500).json({
                    error: error
                });
            });
        });
        this.updateUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return this.usersService
                .updateUsers(req.body, +req.params.id)
                .then((user) => {
                return res.status(200).json({ user });
            })
                .catch((error) => {
                return res.status(500).json({
                    error: error
                });
            });
        });
        this.deleteUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return this.usersService
                .deleteUsers(+req.params.id)
                .then((user) => {
                if (user > 0) {
                    return res.status(200).json({ user });
                }
                return res.status(404).json({ error: 'NotFound' });
            })
                .catch((error) => {
                return res.status(500).json({
                    error: error
                });
            });
        });
        this.usersService = usersService;
    }
}
exports.UsersController = UsersController;
