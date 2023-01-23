import { Router } from "express";
import * as Controller from "./controller";
import { validateAuthorization } from "../middleware";

const userRouter: Router = Router();

/**
 * @openapi
 * "/api/v1/users/":
 *      get:
 *          tags: [ Users ]
 *          summary: Listar usuarios
 *          description: Obtiene la lista de los usuarios registrados. Necesita autorizacion.
 *          responses:
 *              "200":
 *                  description: Lista de usuarios
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
 *                                          example: María
 *                                      email:
 *                                          type: string
 *                                          example: maria@gmail.com
 *                                      password:
 *                                          type: string
 *                                          description: Password hashed
 *                                          example: 525168ab118067089843a30e15c3b00e6ae2952cb2d2b545e254fc35c7fc747b
 *                                      created_at:
 *                                          type: date-time
 *                                          example: 2023-01-21T05:44:27.088Z
 *                                      update_at:
 *                                          type: date-time
 *                                          example: 2023-01-21T05:44:59.596Z
 *                                      last_session:
 *                                          type: date-time
 *                                          example: 2023-01-21T05:45:17.407Z
 *                                      date_born:
 *                                          type: date-time
 *                                          example: 1998-09-21T00:00:00.000Z
 *              "401":
 *                  description: No autorizado
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: No autorizado
 */
userRouter.get("/", validateAuthorization, Controller.findAllUsers);

/**
 * @openapi
 * "/api/v1/users/{id}":
 *      get:
 *          tags: [ Users ]
 *          summary: Buscar usuario por ID
 *          description: Obtiene un usuario en especifico. Necesita autorizacion.
 *          parameters:
 *              - name: id
 *                in: path
 *                required: true
 *                schema:
 *                  type: integer
 *          responses:
 *              "200":
 *                  description: Usuario encontrado
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
 *                                      example: María
 *                                  email:
 *                                      type: string
 *                                      example: maria@gmail.com
 *                                  password:
 *                                      type: string
 *                                      description: Password hashed
 *                                      example: 525168ab118067089843a30e15c3b00e6ae2952cb2d2b545e254fc35c7fc747b
 *                                  created_at:
 *                                      type: date-time
 *                                      example: 2023-01-21T05:44:27.088Z
 *                                  update_at:
 *                                      type: date-time
 *                                      example: 2023-01-21T05:44:59.596Z
 *                                  last_session:
 *                                      type: date-time
 *                                      example: 2023-01-21T05:45:17.407Z
 *                                  date_born:
 *                                      type: date-time
 *                                      example: 1998-09-21T00:00:00.000Z
 *              "404":
 *                  description: Usuario no encontrado
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Usuario no encontrado
 *              "401":
 *                  description: No autorizado
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: No autorizado
 */
userRouter.get("/:id", validateAuthorization, Controller.findUserById);

/**
 * @openapi
 * "/api/v1/users/{id}":
 *      put:
 *          tags: [ Users ]
 *          summary: Actualizar usuario por ID
 *          description: Actualiza los campos un usuario en especifico. Necesita autorizacion
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
 *                                  example: Luis (Opcional)
 *                                  description: Opcional
 *                              email:
 *                                  type: string
 *                                  example: luis@gmail.com (Opcional)
 *                                  description: Opcional
 *                              password:
 *                                  type: string
 *                                  example: luis123 (Opcional)
 *                                  description: Opcional
 *                              date_born:
 *                                  type: string
 *                                  example: 2000-10-20 (Opcional)
 *                                  description: Opcional. Formato YYYY-MM-DD
 *          responses:
 *              "200":
 *                  description: Usuario actualizado
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
 *                                      example: Luis
 *                                  email:
 *                                      type: string
 *                                      example: luis@gmail.com
 *                                  password:
 *                                      type: string
 *                                      description: Password hashed
 *                                      example: 525168ab118067089843a30e15c3b00e6ae2952cb2d2b545e254fc35c7fc747b
 *                                  created_at:
 *                                      type: date-time
 *                                      example: 2023-01-21T05:44:27.088Z
 *                                  update_at:
 *                                      type: date-time
 *                                      example: 2023-01-21T05:44:59.596Z
 *                                  last_session:
 *                                      type: date-time
 *                                      example: 2023-01-21T05:45:17.407Z
 *                                  date_born:
 *                                      type: date-time
 *                                      example: 2000-10-20T00:00:00.000Z
 *              "404":
 *                  description: Usuario no encontrado
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Usuario no encontrado
 */
userRouter.put("/:id", validateAuthorization, Controller.updateUser);

/**
 * @openapi
 * "/api/v1/users/{id}":
 *      delete:
 *          tags: [ Users ]
 *          summary: Eliminar usuario por ID
 *          description: Elimina un usuario en especifico. Necesita autorizacion
 *          parameters:
 *              - name: id
 *                in: path
 *                required: true
 *                schema:
 *                  type: integer
 *          responses:
 *              "200":
 *                  description: Usuario eliminado
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Usuario eliminado
 *              "404":
 *                  description: Usuario no encontrado
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Usuario no encontrado
 */
userRouter.delete("/:id", validateAuthorization, Controller.deleteUser);

/**
 * @openapi
 * "/api/v1/users/":
 *      post:
 *          tags: [ Users ]
 *          summary: Registra un usuario
 *          description: Registro de un nuevo usuario. No necesita autorizacion
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: Diego
 *                              email:
 *                                  type: string
 *                                  example: diego@gmail.com
 *                              password:
 *                                  type: string
 *                                  example: luis123
 *                              date_born:
 *                                  type: string
 *                                  example: 2000-10-20
 *                                  description: Formato YYYY-MM-DD
 *          responses:
 *              "200":
 *                  description: Usuario creado
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Usuario creado correctamente
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
userRouter.post("/", Controller.createUser);

/**
 * @openapi
 * "/api/v1/users/login/":
 *      post:
 *          tags: [ Users ]
 *          summary: Inicio de sesión
 *          description: Inicio de sión de un usuario. No necesita autorizacion
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              email:
 *                                  type: string
 *                                  example: diego@gmail.com
 *                              password:
 *                                  type: string
 *                                  example: luis123
 *          responses:
 *              "200":
 *                  description: Usuario logueado
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Usuario logueado correctamente
 *                                  token:
 *                                      type: string
 *                                      example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU2FyYWkiLCJpZCI6NiwiaWF0IjoxNjc0MzMyOTAyLCJleHAiOjE2NzQ0MTkzMDJ9.R1-0_cFc5GaWoaSxZMzkwFZ6-trxnxYTLNzjAkNeMhc
 *              "400":
 *                  description: Datos incorrectos
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Email o contraseña inválida
 */
userRouter.post("/login", Controller.login);

export default userRouter;
