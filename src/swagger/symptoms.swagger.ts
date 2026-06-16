export const symptomsSwagger = {
  "/api/symptoms": {
    get: {
      summary: "Отримати всі симптоми",
      tags: ["Symptoms"],
      responses: {
        200: { description: "Список симптомів" },
      },
    },
    post: {
      summary: "Додати симптом (тільки адмін)",
      tags: ["Symptoms"],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["name"],
              properties: {
                name: { type: "string" },
                description: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        201: { description: "Симптом створено" },
        403: { description: "Недостатньо прав" },
      },
    },
  },
  "/api/symptoms/recommend": {
    post: {
      summary: "Отримати рекомендації лікаря за симптомами",
      tags: ["Symptoms"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["symptomIds"],
              properties: {
                symptomIds: {
                  type: "array",
                  items: { type: "integer" },
                  example: [1, 2, 3],
                },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Список рекомендованих лікарів" },
        400: { description: "Помилка" },
      },
    },
  },
};