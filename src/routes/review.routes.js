import { Router } from 'express';
import {
  createProductReview,
  getProductReviews
} from '../controllers/review.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { productIdParamSchema } from '../schemas/product.schema.js';
import { createReviewSchema } from '../schemas/review.schema.js';

const router = Router({ mergeParams: true });

// Endpoints de Reseñas de Productos
router.get('/', validate(productIdParamSchema, 'params'), getProductReviews);
router.post(
  '/',
  validate(productIdParamSchema, 'params'),
  validate(createReviewSchema, 'body'),
  createProductReview
);

export default router;
