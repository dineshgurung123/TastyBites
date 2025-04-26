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
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware"); // Correct import name
const foodController_1 = require("../controllers/foodController");
const router = (0, express_1.Router)();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foodData = yield (0, foodController_1.getFood)();
    res.status(200).json({ data: foodData });
}));
router.post("/", authMiddleware_1.authenticationUser, authMiddleware_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const result = yield (0, foodController_1.addFood)(data);
        console.log(result);
        res.status(200).json({ data: "created fooddata", result });
    }
    catch (error) {
        res.json(error);
    }
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedFood = yield (0, foodController_1.updateFood)(id, req.body);
        res.status(200).json({ data: "Updated Food", updateFood: foodController_1.updateFood });
    }
    catch (error) {
        res.send(error);
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedFood = yield (0, foodController_1.deleteFood)(id);
        res.json({ data: "Deleted food" });
    }
    catch (error) {
        res.send(error);
    }
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const singleFood = yield (0, foodController_1.getSingleFood)(id);
    res.json({ data: singleFood });
}));
exports.default = router;
