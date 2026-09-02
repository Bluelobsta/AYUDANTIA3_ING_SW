import prisma from '../config/prisma.js';

/**
 * Obtener las reseñas de un producto y su calificación promedio
 * GET /api/products/:id/reviews
 */
export const getProductReviews = async (req, res, next) => {
  try {
    const productId = req.params.id;

    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: {
        id: true,
        reviews: true
      }
    });

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    const totalRating = product.reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = product.reviews.length > 0
      ? Number((totalRating / product.reviews.length).toFixed(2))
      : 0;

    res.status(200).json({
      productId: product.id,
      totalReviews: product.reviews.length,
      averageRating,
      reviews: product.reviews
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Crear una reseña para un producto
 * POST /api/products/:id/reviews
 */
export const createProductReview = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const { author, rating, comment } = req.body;

    const productExists = await prisma.product.findUnique({
      where: { id: productId },
      select: { id: true }
    });

    if (!productExists) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    const newReview = await prisma.review.create({
      data: {
        author,
        rating,
        comment,
        productId
      }
    });

    res.status(201).json({
      mensaje: 'Reseña creada exitosamente',
      data: newReview
    });
  } catch (error) {
    next(error);
  }
};
