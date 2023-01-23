import { Router } from "express";
import * as Controller from "./controller";

const playlistRouter: Router = Router();

/**
 * @openapi
 * "/api/v1/playlist/":
 *      get:
 *          tags: [ Playlists ]           
 *          summary: Listar playlists
 *          description: Obtiene la lista de playlists. Necesita autorización.
 *          responses:
 *              "200":
 *                  description: Lista de playlists
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  type: object
 *                                  properties:
 *                                      id:
 *                                          type: integer
 *                                          example: 1
 *                                      name:
 *                                          type: string
 *                                          example: Bones
 *                                      userId:
 *                                          type: integer
 *                                          example: 2
 *                                      user:
 *                                          type: object
 *                                          properties:
 *                                              name:
 *                                                  type: string
 *                                                  example: Diego
 *                                      songs:
 *                                          type: array
 *                                          items:
 *                                              type: object
 *                                              properties:
 *                                                  id:
 *                                                      type: integer
 *                                                      example: 1
 *                                                  name:
 *                                                      type: string
 *                                                      example: Bones
 *                                                  artist:
 *                                                      type: string
 *                                                      example: Imagine Dragons
 *                                                  album:
 *                                                      type: string
 *                                                      example: Mercury - Acts 1 & 2
 *                                                  year:
 *                                                      type: integer
 *                                                      example: 2022
 *                                                  genre:
 *                                                      type: string
 *                                                      example: Rock
 *                                                  duration:
 *                                                      type: integer
 *                                                      example: 120
 *                                                  is_public:
 *                                                      type: boolean
 *                                                      example: true                                                        
 */
playlistRouter.get("/", Controller.findAllPlaylist);

/**
 * @openapi
 * "/api/v1/playlists/{id}":
 *      get:
 *          tags: [ Playlists ]           
 *          summary: Buscar una playlist por ID
 *          description: Obtiene una playlist específica. Necesita autorización.
 *          parameters:
 *              - name: id
 *                in: path
 *                required: true
 *                schema:
 *                  type: integer
 *          responses:
 *              "200":
 *                  description: Playlist encontrada
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  id:
 *                                      type: integer
 *                                      example: 1
 *                                  name:
 *                                      type: string
 *                                      example: Bones
 *                                  userId:
 *                                      type: integer
 *                                      example: 2
 *                                  user:
 *                                      type: object
 *                                      properties:
 *                                          name:
 *                                              type: string
 *                                              example: Diego
 *                                  songs:
 *                                      type: array
 *                                      items:
 *                                          type: object
 *                                          properties:
 *                                              id:
 *                                                  type: integer
 *                                                  example: 1
 *                                              name:
 *                                                  type: string
 *                                                  example: Bones
 *                                              artist:
 *                                                  type: string
 *                                                  example: Imagine Dragons
 *                                              album:
 *                                                  type: string
 *                                                  example: Mercury - Acts 1 & 2
 *                                              year:
 *                                                  type: integer
 *                                                  example: 2022
 *                                              genre:
 *                                                  type: string
 *                                                  example: Rock
 *                                              duration:
 *                                                  type: integer
 *                                                  example: 120
 *                                              is_public:
 *                                                  type: boolean
 *                                                  example: true    
 *              "401":
 *                  description: Sin autorización
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: No autorizado                                                      
 *              "404":
 *                  description: Playlist no encontrada
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Canción no encontrada                          
 */
playlistRouter.get("/:id", Controller.findPlaylistById);

/**
 * @openapi
 * "/api/v1/playlists/":
 *      post:
 *          tags: [ Playlists ]           
 *          summary: Crear playlist
 *          description: Crea una nueva playlist. Necesita autorización.
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: Playlist 1
 *                              user:
 *                                  type: integer
 *                                  example: 1
 *          responses:
 *              "200":
 *                  description: Playlist credad
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Playlist creada correctamente  
 *              "400":
 *                  description: Datos en formato erróneo
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Datos no válidos                         
 */
playlistRouter.post("/", Controller.createPlaylist);

/**
 * @openapi
 * "/api/v1/playlists/add-song":
 *      put:
 *          tags: [ Playlists ]           
 *          summary: Añadir canciones a una playlist
 *          description: Añade canciones a una playlist específica. Necesita autorización.
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              id_song:
 *                                  type: integer
 *                                  example: 1
 *                              id_playlist:
 *                                  type: integer
 *                                  example: 1
 *          responses:
 *              "200":
 *                  description: Playlist encontrada
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  songs:
 *                                      type: array
 *                                      items:
 *                                          type: object
 *                                          properties:
 *                                              id:
 *                                                  type: integer
 *                                                  example: 2
 *                                              name:
 *                                                  type: string
 *                                                  example: Sharks
 *              "400":
 *                  description: Datos en formato erróneo
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Datos no válidos
 *              "401":
 *                  description: Sin autorización
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: No autorizado
 *              "404":
 *                  description: Playlist no encontrada
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Canción no encontrada                         
 */
playlistRouter.put("/add-song", Controller.updatePlaylist);

/**
 * @openapi
 * "/api/v1/playlists/{id}":
 *      delete:
 *          tags: [ Playlists ]           
 *          summary: Eliminar una playlists por ID
 *          description: Elimina una playlists específica. Necesita autorización.
 *          parameters:
 *              - name: id
 *                in: path
 *                required: true
 *                schema:
 *                  type: integer
 *          responses:
 *              "200":
 *                  description: Playlist eliminada
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Playlist eliminada
 *              "401":
 *                  description: Sin autorización
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: No autorizado
 *              "404":
 *                  description: Playlist no encontrada
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Playlist no encontrada                         
 */
playlistRouter.delete("/:id", Controller.deletePlaylist);

export default playlistRouter;
