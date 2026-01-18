# PRISMA-NODE-NEST-BackEnd (MongoDB)

> A Node Application for logging machinery data and reports, built with NEST (TypeScript), Prisma, & MongoDB.

## 🛠 Tech Stack
- **Framework**: NestJS
- **ORM**: Prisma
- **Database**: MongoDB Atlas (Cloud)
- **Language**: TypeScript

## 🔐 Security & Environment Variables
Following development best practices, the sensitive configuration data (such as database credentials) is **not included** in this repository.

To run this project locally, you must:
1. Create a `.env` file in the root directory.
2. Add your MongoDB connection string:
   ```env
   DATABASE_URL="mongodb+srv://<username>:<password>@<cluster-url>/<database-name>"
    ```

The Codebase is fully functional, you can use Postman or CURL for your own testing.