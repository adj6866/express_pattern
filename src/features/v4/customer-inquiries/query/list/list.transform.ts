import { CustomerInquiry } from '@/database/entities/customer-inquiry.entity';
import { BaseTransform } from '@/shared/base';
import moment from 'moment';

export class ListTransform extends BaseTransform {
  transform(customerInquiry: CustomerInquiry): any {
    return {
      CustomerInquiryId: customerInquiry.CustomerInquiryId,
      FullName: customerInquiry.FullName,
      Email : customerInquiry.Email,
      QuestionCategory: customerInquiry.QuestionCategory,
      Question: customerInquiry.Question,
      Responded: customerInquiry.Reply,
      CreatedAt: customerInquiry.CreatedAt
        ? moment(customerInquiry.CreatedAt).format('YYYY-MM-DD HH:mm:ss')
        : '',
      UpdatedAt: customerInquiry.UpdatedAt
        ? moment(customerInquiry.UpdatedAt).format('YYYY-MM-DD HH:mm:ss')
        : ''
    };
  }
}
