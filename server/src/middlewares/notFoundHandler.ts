import { RequestHandler } from 'express';

const notFoundHandler: RequestHandler = (req, res) => {
    console.log('This path does not exist.');
    res.status(404).send({ message: 'Invalid path' });
};

export default notFoundHandler;
