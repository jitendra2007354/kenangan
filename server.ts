import express from "express";
import { createServer as createViteServer } from "vite";
import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Database connection configuration
const dbConfig = {
  host: process.env.DB_HOST || "gateway01.ap-southeast-1.prod.aws.tidbcloud.com",
  port: parseInt(process.env.DB_PORT || "4000"),
  user: process.env.DB_USER || "36C5qQ9N5GxCzdv.root",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "kenangan",
  ssl: {
    ca: fs.readFileSync(path.join(process.cwd(), "ca.pem")),
  },
};

let pool: mysql.Pool;

async function initDb() {
  try {
    pool = mysql.createPool(dbConfig);
    
    // Test connection
    const connection = await pool.getConnection();
    console.log("Connected to TiDB successfully");
    
    // Create tables if they don't exist
    await connection.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        total_amount DECIMAL(10, 2) NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT,
        product_id VARCHAR(50),
        product_name VARCHAR(255),
        quantity INT,
        price DECIMAL(10, 2),
        custom_name VARCHAR(255),
        custom_date VARCHAR(255),
        delivery_address TEXT,
        mobile VARCHAR(20),
        FOREIGN KEY (order_id) REFERENCES orders(id)
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(100),
        last_name VARCHAR(100),
        email VARCHAR(255),
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    connection.release();
  } catch (error) {
    console.error("Database initialization failed:", error);
  }
}

// API Routes
app.post("/api/orders", async (req, res) => {
  const { items, total } = req.body;
  
  if (!items || !Array.isArray(items)) {
    return res.status(400).json({ error: "Invalid order data" });
  }

  try {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      // Insert order
      const [orderResult]: any = await connection.query(
        "INSERT INTO orders (total_amount) VALUES (?)",
        [total]
      );
      const orderId = orderResult.insertId;

      // Insert items
      for (const item of items) {
        await connection.query(
          `INSERT INTO order_items 
          (order_id, product_id, product_name, quantity, price, custom_name, custom_date, delivery_address, mobile) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            orderId,
            item.id,
            item.name,
            item.quantity,
            item.price,
            item.customName || null,
            item.customDate || null,
            item.address || null,
            item.mobile || null
          ]
        );
      }

      await connection.commit();
      res.json({ success: true, orderId });
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Order processing failed:", error);
    res.status(500).json({ error: "Failed to save order" });
  }
});

app.post("/api/contact", async (req, res) => {
  const { firstName, lastName, email, message } = req.body;

  try {
    await pool.query(
      "INSERT INTO contact_messages (first_name, last_name, email, message) VALUES (?, ?, ?, ?)",
      [firstName, lastName, email, message]
    );
    res.json({ success: true });
  } catch (error) {
    console.error("Contact message saving failed:", error);
    res.status(500).json({ error: "Failed to save message" });
  }
});

async function startServer() {
  await initDb();

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
    app.get("*", (req, res) => {
      res.sendFile(path.join(process.cwd(), "dist/index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
