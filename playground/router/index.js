import Router from './Router';

const router = new Router();

router.push('test');
router.push('test/1');
router.replace('test/1', { a: 1 });
