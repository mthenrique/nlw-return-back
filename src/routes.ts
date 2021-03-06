import express from 'express';
import { NodemailerMailAdapter } from './adapters/nodemailer/NodemailerMailAdapter';
import { PrismaFeedbacksRepository } from './repositories/prisma/PrismaFeedbacksRepository';
import { SubmitFeedbackUseCase } from './useCases/SubmitFeedbackUseCase';

const routes = express.Router();

routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body;

  try {
    const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
    const nodemailerMailAdapter = new NodemailerMailAdapter();

    const submitFeedbackUseCase = new SubmitFeedbackUseCase(
      prismaFeedbacksRepository,
      nodemailerMailAdapter  
    );

    await submitFeedbackUseCase.execute({
      type,
      comment,
      screenshot
    })
    return res.status(201).send();

  } catch (error) {
    console.error(error)
    return res.status(201).send();
  }
})

export { routes };