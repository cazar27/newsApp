
import { Request, Response } from 'express-serve-static-core';
import { UserFinder } from '../../../context/User/application/UserFinder';
import { errorHandler } from '../../../helpers/errorHandler';
import { getContainer } from '../../dic/getContainer';
import { UserUsesCases } from '../../dic/userUseCases.injector';
import { Controller } from '../controlles.interface';

const service = 'Get user controller';
// I must create this endpoint to call get wiht all user
export class GetUsersController implements Controller {
  public async run(req: Request, res: Response) {
    try {
      const container = getContainer();
      const usersFinder: UserFinder = container.get(UserUsesCases.UserFinder);

      const users = (await usersFinder.getAll()).map((n) => n.toObject());

      res.json({
        users,
      });

    } catch (error) {
      errorHandler(res, error, service);
    }
  }
}