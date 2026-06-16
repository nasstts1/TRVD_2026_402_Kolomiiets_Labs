import { Router, Request, Response } from "express";
import { getAllSymptoms, createSymptom } from "../repositories/symptomRepository";
import { recommendationService } from "../services/recommendationService";
import { authMiddleware } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";
import { toSymptomDTO } from "../dto/symptomDto";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const symptoms = await getAllSymptoms();
    res.json(symptoms.map(toSymptomDTO));
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
});


router.post("/recommend", async (req: Request, res: Response) => {
  try {
    const { symptomIds } = req.body;
    const recommendations = await recommendationService.getRecommendations(symptomIds);
    res.json(recommendations.map(toSymptomDTO));
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
});


router.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  async (req: Request, res: Response) => {
    try {
      const symptom = await createSymptom(req.body);
      res.status(201).json(symptom);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      }
    }
  }
);

export default router;