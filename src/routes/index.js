import { Router } from 'express';
import brandRoutes from './brand.routes.js';
import categoryRoutes from './category.routes.js';
import productRoutes from './product.routes.js';

const apiRouter = Router();

// Estado de la API (Health check)
apiRouter.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'TechStore API (Productos y Categorías)'
  });
});

// Enrutadores modulares
apiRouter.use('/brands', brandRoutes);
apiRouter.use('/categories', categoryRoutes);
apiRouter.use('/products', productRoutes);

export default apiRouter;
