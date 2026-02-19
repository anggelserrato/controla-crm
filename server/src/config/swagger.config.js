import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  failOnErrors: true,
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API CRM - MERN',
      version: '1.0.0',
      description: 'Documentación de la API REST para gestión de contactos',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}/api/v1`,
        description: 'Desarrollo (local)',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              example: '507f1f77bcf86cd799439011',
            },
            email: {
              type: 'string',
              example: 'user@example.com',
            },
            role: {
              type: 'string',
              enum: ['admin', 'sales'],
              example: 'sales',
            },
            active: {
              type: 'boolean',
              example: true,
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
          required: ['email', 'role', 'active'],
        },
        Contact: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              example: '507f1f77bcf86cd799439011',
            },
            firstName: {
              type: 'string',
              example: 'Juan',
            },
            lastName: {
              type: 'string',
              example: 'Pérez',
            },
            email: {
              type: 'string',
              example: 'juan@example.com',
            },
            phone: {
              type: 'string',
              example: '+34 910 123 456',
            },
            status: {
              type: 'string',
              enum: ['NEW', 'IN_PROGRESS', 'CONTACTED', 'CLOSED'],
              example: 'NEW',
            },
            notes: {
              type: 'string',
              example: 'Cliente potencial',
            },
            assignedTo: {
              type: 'string',
              example: '507f1f77bcf86cd799439011',
            },
            active: {
              type: 'boolean',
              example: true,
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
          required: ['firstName', 'lastName', 'email', 'assignedTo'],
        },
        UserInput: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              format: 'email',
              example: 'user@example.com',
            },
            password: {
              type: 'string',
              minLength: 8,
              example: 'Password1',
            },
            role: {
              type: 'string',
              enum: ['admin', 'sales'],
              default: 'sales',
            },
            active: {
              type: 'boolean',
              default: true,
            },
          },
          required: ['email', 'password'],
        },
        ContactInput: {
          type: 'object',
          properties: {
            firstName: {
              type: 'string',
              example: 'Juan',
            },
            lastName: {
              type: 'string',
              example: 'Pérez',
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'juan@example.com',
            },
            phone: {
              type: 'string',
              example: '+34 910 123 456',
            },
            notes: {
              type: 'string',
              example: 'Cliente potencial',
            },
          },
          required: ['firstName', 'lastName', 'email'],
        },
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false,
            },
            message: {
              type: 'string',
              example: 'Error message',
            },
            code: {
              type: 'string',
              example: 'ERROR_CODE',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
