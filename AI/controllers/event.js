import { asyncWrapper } from "../middlewares/asyncWrapper.js";
import { checkImageMatch } from "../ai/ai.js";

export const addEvent = asyncWrapper(async (req, res) => {
  const { description } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: "Image is required" });
  }

  const imageBase64 = req.file.buffer.toString("base64");

  const aiResponse = await checkImageMatch({
    description,
    imageBase64,
  });

  res.json({
    success: true,
    aiResult: aiResponse,
  });
});
