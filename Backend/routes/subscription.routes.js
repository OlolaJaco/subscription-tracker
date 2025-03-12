import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { createSubscription } from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => {});

subscriptionRouter.get("/:id", (req, res) => {});

subscriptionRouter.post("/", authorize, createSubscription);

subscriptionRouter.put("/:id", (req, res) => {});

subscriptionRouter.delete("/:id", (req, res) => {});

subscriptionRouter.get("/user/:id", (req, res) => {});

subscriptionRouter.put("/:id/cancel", (req, res) => {});

subscriptionRouter.get("/upcomig-renewals", (req, res) => {});

export default subscriptionRouter;