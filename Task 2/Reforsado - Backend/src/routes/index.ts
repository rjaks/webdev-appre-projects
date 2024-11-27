import express from 'express';

import authentication from './authentication';
 
export const router = express.Router();

export default (): express.Router => {
    authentication(router);

    return router;
}