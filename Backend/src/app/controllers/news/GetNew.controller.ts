
import { Request, Response } from 'express-serve-static-core';
import { NewsFinder } from '../../../context/New/application/NewsFinder';
import { New } from '../../../context/New/domain/New.model';
import { errorHandler } from '../../../helpers/errorHandler';
import { getContainer } from '../../dic/getContainer';
import { NewsUsesCases } from '../../dic/newsUsesCases.injector';
import { Controller } from '../controlles.interface';

const service = 'Get news controller';
// I must create this endpoint to call get new by id
export class GetNewController implements Controller {

  public async run(req: Request, res: Response) {
    const { uuid } = req.params;

    try {
      const container = getContainer();
      const newsFinder: NewsFinder = container.get(NewsUsesCases.NewsFinder);
      const news = await newsFinder.findOne(uuid);
      const getNew = new New(news.uuid.value, news.title.value, news.description.value);

      res.json({
        new: getNew.toObject(),
      });

    } catch (error) {
      errorHandler(res, error, service);
    }
  }
}