import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { ServerModule } from './modules/server/server.module';
import { InfoModule } from './modules/info/info.module';

@Module({
  imports: [UsersModule, ServerModule, InfoModule],
})
export class AppModule {}
