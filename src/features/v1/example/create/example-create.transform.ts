import { NilaiICar } from '@/entities/nilai-icar.entity';

export class ExampleCreateTransform {
  static transform(nilaiIcar: NilaiICar): any {
    return {
      AuctionItemId: nilaiIcar.AuctionItemId,
      PoliceNo: nilaiIcar.PoliceNo
    };
  }
}
