import { Microsoft365 } from "@/integrations/thrid-party/microsoft-365.thrid";
import * as ejs from 'ejs';

export function emailConfig() {
  const service = process.env.EMAIL_SERVICE || 'microsoft-365'
  switch (service) {
    case 'microsoft-365':
      return new Microsoft365();
    default:
      throw new Error('Unknown email service');
  }
}


export async function renderBody(templatePath: string, data: any): Promise<string> {
  try {
    const template: string = await ejs.renderFile(templatePath, data);
    return template;
  } catch (error) {
    console.error('Error rendering EJS template:', error);
    throw new Error('Failed to render template');
  }
}
