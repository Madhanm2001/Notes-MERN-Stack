import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Title',
      version: '1.0.0',
      description: 'Description of your API',
    },
    servers: [
      {
        url: 'http://localhost:5000', // update as needed
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // path to your TypeScript route files
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
