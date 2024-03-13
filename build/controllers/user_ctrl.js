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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = __importDefault(require("../models/user_model"));
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const user = new user_model_1.default({ _id: new mongoose_1.default.Types.ObjectId(), name });
    try {
        const user_1 = yield user.save();
        return res.status(201).json(user_1);
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
const readUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    try {
        const user = yield user_model_1.default.findById(userId);
        return user
            ? res.status(200).json({ user })
            : res.status(404).json({ error: "User not found." });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
const readAllUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.default.find();
        return res.status(200).json({ users });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const userId = req.params.userId;
    res.status(200).json({ error: "Userrrrrr not found." });
    // return await User.findById(userId)
    //   .then((user) => {
    //     console.log(user);
    //     if (user) {
    //       user.set(req.body);
    //       return user
    //         .save()
    //         .then((user) => res.status(201).json(user))
    //         .catch((error) => res.status(500).json(error));
    //     } else {
    //       res.status(404).json({ error: "User not found." });
    //     }
    //   })
    //   .catch((error) => res.status(500).json({ error }));
});
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    return user_model_1.default.findByIdAndDelete(userId)
        .then((user) => user
        ? res.status(201).json({ message: "User deleted" })
        : res.status(404).json({ error: "User not found." }))
        .catch((error) => res.status(500).json({ error }));
});
exports.default = { createUser, readUser, readAllUser, updateUser, deleteUser };
