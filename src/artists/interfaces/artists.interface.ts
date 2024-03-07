export class Artist {
  id: string;
  name: string;
  grammy: boolean;

  constructor(partial: Partial<Artist>) {
    Object.assign(this, partial);
  }
}
