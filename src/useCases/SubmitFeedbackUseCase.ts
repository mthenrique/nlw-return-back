import { MailAdapter } from "../adapters/MailAdapter";
import { FeedbacksRepository } from "../repositories/FeedbacksRepository";

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request;

    await this.feedbacksRepository.create({
      type, 
      comment, 
      screenshot
    });

    await this.mailAdapter.sendMail({
      subject: 'Feedback do usuário',
      body: [
        `<div style="font-family: sans-serif; font-size: 16px color: #111;">`,
        `<p>Novo feedback de ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        `</div>`
      ].join('\n')
    })
  }
}