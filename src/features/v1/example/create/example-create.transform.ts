import { NilaiICar } from '@/entities/nilai-icar.entity';

export class ExampleCreateTransform {
  static transform(nilaiIcar: NilaiICar): any {
    return {
      AuctionItemId: nilaiIcar.AuctionItemId as number,
      PoliceNo: nilaiIcar.PoliceNo as string
    };
  }
}
