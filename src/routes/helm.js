"use strict";
const express = require("express");
const router = express.Router();
const helmController = require("../controllers/helm");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../../swagger/swagger.json");

router.post("/api/helm", helmController.getSvg);
router.use("/swagger-ui", swaggerUi.serve);
router.get("/swagger-ui", swaggerUi.setup(swaggerDocument));

module.exports = router;
