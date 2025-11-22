import { ApiProperty } from '@nestjs/swagger';

export class Status {
  @ApiProperty({ name: 'status' })
  public status: string;
}
