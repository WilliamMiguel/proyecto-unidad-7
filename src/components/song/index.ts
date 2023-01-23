import { Router } from "express";
import * as Controller from "./controller";
import { verifyToken, validateAuthorization } from "../middleware";

const songRouter: Router = Router();

/**
 * @openapi
 * "/api/v1/songs/":
 *      get:
 *          tags: [ Songs ]
 *          summary: Listar canciones
 *          description: Obtiene la lista canciones. Si no tiene autorización muestra las canciones públicas.
 *          responses:
 *              "200":
 *                  description: Lista de canciones
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
 *                                      artist:
 *                                          type: string
 *                                          example: Imagine Dragons
 *                                      album:
 *                                          type: string
 *                                          example: Mercury - Acts 1 & 2
 *                                      year:
 *                                          type: integer
 *                                          example: 2022
 *                                      genre:
 *                                          type: string
 *                                          example: Rock
 *                                      duration:
 *                                          type: integer
 *                                          example: 120
 *                                      is_public:
 *                                          type: boolean
 *                                          example: true
 */
songRouter.get("/", verifyToken, Controller.findAllSongs);

/**
 * @openapi
 * "/api/v1/songs/{id}":
 *      get:
 *          tags: [ Songs ]
 *          summary: Buscar una canción por ID
 *          description: Obtiene una canción específica. Si no tiene autorización la canción si es pública.
 *          parameters:
 *              - name: id
 *                in: path
 *                required: true
 *                schema:
 *                  type: integer
 *          responses:
 *              "200":
 *                  description: Canción encontrada
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
 *                                  artist:
 *                                      type: string
 *                                      example: Imagine Dragons
 *                                  album:
 *                                      type: string
 *                                      example: Mercury - Acts 1 & 2
 *                                  year:
 *                                      type: integer
 *                                      example: 2022
 *                                  genre:
 *                                      type: string
 *                                      example: Rock
 *                                  duration:
 *                                      type: integer
 *                                      example: 120
 *                                  is_public:
 *                                      type: boolean
 *                                      example: true
 *              "404":
 *                  description: Canción no encontrada
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Canción no encontrada
 */
songRouter.get("/:id", verifyToken, Controller.findSongById);

/**
 * @openapi
 * "/api/v1/songs/":
 *      post:
 *          tags: [ Songs ]
 *          summary: Registrar canción
 *          description: Registra una nueva canción. Necesita autorización.
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: Sharks
 *                              artist:
 *                                  type: string
 *                                  example: Imagine Dragons
 *                              album:
 *                                  type: string
 *                                  example: Mercury - Acts 1 & 2
 *                              year:
 *                                  type: integer
 *                                  example: 2022
 *                              genre:
 *                                  type: string
 *                                  example: Rock
 *                              duration:
 *                                  type: integer
 *                                  example: 120
 *                              is_public:
 *                                  type: boolean
 *                                  example: true
 *          responses:
 *              "200":
 *                  description: Canción registrada
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Canción creada correctamente
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
songRouter.post("/", validateAuthorization, Controller.createSong);

/**
 * @openapi
 * "/api/v1/songs/{id}":
 *      put:
 *          tags: [ Songs ]
 *          summary: Actualizar una canción por ID
 *          description: Actualiza los campos de una canción específica. Necesita autorización.
 *          parameters:
 *              - name: id
 *                in: path
 *                required: true
 *                schema:
 *                  type: integer
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: Sharks - Editado (Opcional)
 *                              artist:
 *                                  type: string
 *                                  example: Imagine Dragons (Opcional)
 *                              album:
 *                                  type: string
 *                                  example: Mercury - Acts 1 & 2 (Opcional)
 *                              year:
 *                                  type: integer
 *                                  example: 2023 (Opcional)
 *                              genre:
 *                                  type: string
 *                                  example: Rock (Opcional)
 *                              duration:
 *                                  type: integer
 *                                  example: 120 (Opcional)
 *                              is_public:
 *                                  type: boolean
 *                                  example: true (Opcional)
 *          responses:
 *              "200":
 *                  description: Canción encontrada
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  id:
 *                                      type: integer
 *                                      example: 2
 *                                  name:
 *                                      type: string
 *                                      example: Sharks - Editado
 *                                  artist:
 *                                      type: string
 *                                      example: Imagine Dragons
 *                                  album:
 *                                      type: string
 *                                      example: Mercury - Acts 1 & 2
 *                                  year:
 *                                      type: integer
 *                                      example: 2023
 *                                  genre:
 *                                      type: string
 *                                      example: Rock
 *                                  duration:
 *                                      type: integer
 *                                      example: 120
 *                                  is_public:
 *                                      type: boolean
 *                                      example: true
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
 *              "404":
 *                  description: Canción no encontrada
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Canción no encontrada
 */
songRouter.put("/:id", validateAuthorization, Controller.updateSong);

/**
 * @openapi
 * "/api/v1/songs/{id}":
 *      delete:
 *          tags: [ Songs ]
 *          summary: Eliminar una canción por ID
 *          description: Elimina una canción específica. Necesita autorización.
 *          parameters:
 *              - name: id
 *                in: path
 *                required: true
 *                schema:
 *                  type: integer
 *          responses:
 *              "200":
 *                  description: Canción eliminada
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Canción eliminada
 *              "404":
 *                  description: Canción no encontrada
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Canción no encontrada
 */
songRouter.delete("/:id", validateAuthorization, Controller.deleteSong);

export default songRouter;
