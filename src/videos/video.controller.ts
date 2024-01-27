import { Request, Response } from 'express';
import { VideoEntity } from './entities/video.entity';
import { CreateVideoDto } from './dto/create-video.dto';
import { VideoService } from './video.service';
import { AppDataSource } from '../db/db';
import { CustomError } from '../errors/custom.errors';
import { UpdateVideoDto } from './dto/update-video.dto';

export class VideoController {
  private videoService: VideoService;

  constructor() {
    const videoRepository = AppDataSource.getRepository(VideoEntity);
    this.videoService = new VideoService(videoRepository);
  }

  async createVideo(req: Request, res: Response) {
    try {
      const videoDto: CreateVideoDto = req.body;

      // Crear el video utilizando el servicio
      const createdVideo: VideoEntity = await this.videoService.createVideo(
        videoDto
      );

      // Responder con el video creado
      res.status(201).json(createdVideo);
    } catch (error) {
      console.error('Error al crear el video:', error);
      res.status(500).json({ message: 'Error al crear el video' });
    }
  }

  async getAllVideos(req: Request, res: Response) {
    const videos: VideoEntity[] = await this.videoService.getAllVideos();
    if (!videos) {
      throw new CustomError(500, 'No hay videos');
    }
    res.status(200).json(videos);
  }

  async getVideoById(req: Request, res: Response) {
    try {
      const id: number = parseInt(req.params.id);
      const video: VideoEntity = await this.videoService.getVideoById(id);
      res.status(200).json(video);
    } catch (error) {
      console.error('Error al obtener el video por ID:', error);
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Video no encontrado' });
      }
    }
  }

  async updateVideo(req: Request, res: Response) {
    try {
      const id: number = parseInt(req.params.id);
      const updateDto: UpdateVideoDto = req.body;

      const updateVideo: VideoEntity = await this.videoService.updateVideo(
        id,
        updateDto
      );

      res.status(200).json(updateVideo);
    } catch (error) {
      return CustomError.badRequest('Error al actualizar el video');
    }
  }
}
