import express from 'express';

import authentication from './authentication.controller';
import users from './user.route'
import tasks from './tasks.route'
 
export const router = express.Router();

export default (): express.Router => {
    authentication(router);
    users(router);
    tasks(router);

    return router;
}