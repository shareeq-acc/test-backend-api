import { Resend } from 'resend';
import config from '@/config/env';
import logger from '@/plugins/logger';
import { EmailError } from './errors';

/**
 * Email parameters for sending emails
 */
export type EmailParams = {
  to: string;
  subject: string;
  html: string;
  from?: string;
};

/**
 * Email send result
 */
export type EmailResult = {
  id: string;
  message?: string;
};

/**
 * Abstract email provider interface
 */
export interface EmailProvider {
  send(params: EmailParams): Promise<EmailResult>;
  healthCheck(): Promise<boolean>;
}



/**
 * Resend email provider implementation
 */
export class ResendProvider implements EmailProvider {
  private client: Resend;
  private fromEmail: string;

  constructor() {
    this.client = new Resend(config.RESEND_API_KEY);
    this.fromEmail =
      config.RESEND_FROM_EMAIL || config.EMAIL_FROM || 'noreply@example.com';
  }

  async send(params: EmailParams): Promise<EmailResult> {
    try {
      const { data, error } = await this.client.emails.send({
        from: params.from || this.fromEmail,
        to: params.to,
        subject: params.subject,
        html: params.html,
      });

      if (error) {
        throw error;
      }

      const id = (data as { id?: string } | null)?.id || 'unknown';

      logger.info(
        {
          provider: 'resend',
          id,
          to: params.to,
          subject: params.subject,
        },
        'Email sent successfully',
      );

      return {
        id,
        message: 'Email sent',
      };
    } catch (err) {
      logger.error(
        {
          provider: 'resend',
          to: params.to,
          subject: params.subject,
          err,
        },
        'Failed to send email',
      );

      throw new EmailError('Failed to send email via Resend', err);
    }
  }

  async healthCheck(): Promise<boolean> {
    try {
      return !!config.RESEND_API_KEY;
    } catch (err) {
      logger.error({ err }, 'Resend health check failed');
      return false;
    }
  }
}

/**
 * Factory function to create the appropriate email provider
 * Priority: Resend > Mailgun > SMTP
 */
const createEmailProvider = (): EmailProvider => {
  // Prefer Resend if configured
  if (config.RESEND_API_KEY) {
    logger.info('Using Resend email provider');
    return new ResendProvider();
  }



  throw new EmailError('No email provider configured. Please set either Mailgun or SMTP credentials.');
};

/**
 * Auto-initialized email provider singleton
 */
export const emailProvider = createEmailProvider();

/**
 * Convenience function to send emails using the configured provider
 */
export const sendEmail = async (params: EmailParams): Promise<EmailResult> => {
  return emailProvider.send(params);
};

/**
 * Health check function for email service
 * Returns a function compatible with HealthCheck interface
 */
export const checkEmailHealth = () => {
  return async (): Promise<boolean> => {
    try {
      return await emailProvider.healthCheck();
    } catch (err) {
      logger.error({ err }, 'Email health check failed');
      return false;
    }
  };
};
