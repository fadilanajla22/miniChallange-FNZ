export class ItemDto {
  nama!: string;
  harga!: number;
  qty!: number;
}

export class KasirDto {
  items!: ItemDto[];
}