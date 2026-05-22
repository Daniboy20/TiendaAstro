import { defineCollection, z } from 'astro:content';

// Esquema de una review o comentario
const reviewSchema = z.object({
  id: z.string(),
  autor: z.string(),
  calificacion: z.number().min(1).max(5), // 1 a 5 estrellas
  comentario: z.string().optional(),
  fecha: z.date().optional(),
});

// Esquema de un producto
const productoSchema = z.object({
  // Datos básicos
  id: z.string(),
  nombre: z.string(),
  descripcion: z.string(),
  precio: z.number(),
  imagen: z.string(), // Ruta a la imagen en /public o /src
  
  // Lo que pediste específicamente
  tallas: z.array(z.string()),      // Ej: ["S", "M", "L", "XL"]
  colores: z.array(z.string()),     // Ej: ["Rojo", "Azul", "Negro"]
  marca: z.string(),
  categoria: z.string(),
  
  // Sistema de reviews
  reviews: z.array(reviewSchema).default([]),
  promedioCalificacion: z.number().min(1).max(5).optional(),
  
  // Opcionales
  stock: z.number().default(0),
  destacado: z.boolean().default(false),
});

export const collections = {
  'productos': defineCollection({ type: 'data', schema: productoSchema }),
};