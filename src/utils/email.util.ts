import { Microsoft365Third } from "@/integrations/thrid-party/microsoft-365.thrid";
import * as ejs from 'ejs';
import path from 'path';

class Email {
  private static instance: any;

  private constructor() {}

  public static getInstance() {
    if (!Email.instance) {
      const service = process.env.EMAIL_SERVICE || 'microsoft-365'
      switch (service) {
        case 'microsoft-365':
          return new Microsoft365Third();
        default:
          throw new Error('Unknown email service');
      }
    }

    return Email.instance;
  }
}

export default Email.getInstance();

export async function renderBody(templatePath: string, data: any): Promise<string> {
  try {
    const viewsPath = path.resolve(__dirname, '../shared/resources/emails/components');
    const template: string = await ejs.renderFile(templatePath, {...data, views: viewsPath});
    return template;
  } catch (error) {
    console.error('Error rendering EJS template:', error);
    throw new Error('Failed to render template');
  }
}
