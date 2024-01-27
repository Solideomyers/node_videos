export class CreateVideoDto {
  /**
   * ID del vídeo.
   */

  id: number;

  /**
   * ID del usuario que subió el vídeo.
   */
  userId: number;

  /**
   * Número de likes del vídeo.
   */
  numLikes: number;

  /**
   * Número de comentarios del vídeo.
   */
  numComments: number;

  /**
   * Título del vídeo.
   */
  title: string;

  /**
   * URL del vídeo.
   */
  url: string;

  /**
   * Descripción del vídeo.
   */
  description: string;

  /**
   * Visibilidad del vídeo (público o privado).
   */
  view: 'public' | 'private';

  /**
   * Fecha de creación del vídeo.
   */
  createdAt: Date;

  /**
   * Fecha de actualización del vídeo.
   */
  updatedAt: Date;
}
