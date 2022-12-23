import { Module } from '@nestjs/common';
import { UsersModule } from '../../users/users.module';
import { JwtAuthModule } from '../jwt/jwt-auth.module';
import { GithubOauthController } from './github-oauth.controller';
import { GithubOauthStrategy } from './github-oauth.strategy';

@Module({
  imports: [UsersModule, JwtAuthModule],
  controllers: [GithubOauthController],
  providers: [GithubOauthStrategy],
})
export class GithubOauthModule {}
