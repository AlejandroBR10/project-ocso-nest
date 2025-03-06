
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guards';
import { RolesGuard } from '../guards/roles.guards';
import { Roles } from './roles.decorators';

export const Auth = (...roles: string[])  => {
    roles.push("Admin");
  return applyDecorators(
    Roles(roles),
    UseGuards(AuthGuard, RolesGuard),
  );
}


