import { Router } from 'express';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../controllers/productController';
import auth from '../middleware/auth';

const router = Router();

router.get('/', auth, getProducts);
router.post('/', auth, addProduct);
router.put('/:id', auth, updateProduct); // Add this line
router.delete('/:id', auth, deleteProduct);

export default router;
