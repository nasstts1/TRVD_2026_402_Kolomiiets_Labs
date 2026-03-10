export const authSwagger = {
  "/api/auth/register": {
    post: {
      summary: "Реєстрація нового користувача",
      tags: ["Auth"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["firstName", "lastName", "email", "password"],
              properties: {
                firstName: { type: "string" },
                lastName: { type: "string" },
                email: { type: "string" },
                password: { type: "string" },
                role: {
                  type: "string",
                  enum: ["PATIENT", "DOCTOR", "ADMIN"],
                },
              },
            },
          },
        },
      },
      responses: {
        201: { description: "Користувача створено" },
        400: { description: "Помилка валідації" },
      },
    },
  },
  "/api/auth/login": {
    post: {
      summary: "Вхід в систему",
      tags: ["Auth"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["email", "password"],
              properties: {
                email: { type: "string" },
                password: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Успішний вхід, повертає токен" },
        400: { description: "Невірний email або пароль" },
      },
    },
  },
};