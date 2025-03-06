
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guards';
import { RolesGuard } from '../guards/roles.guards';
import { Roles } from './roles.decorators';
import { ROLES } from '../constants/roles.constants';

export const Auth = (...roles: ROLES[])  => {
    roles.push(ROLES.ADMIN);
  return applyDecorators(
    Roles(roles),
    UseGuards(AuthGuard, RolesGuard),
  );
}


