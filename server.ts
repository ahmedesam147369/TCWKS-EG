import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("students.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    administration TEXT,
    school_name TEXT,
    student_name TEXT,
    grade TEXT,
    stage TEXT,
    innovation_field TEXT,
    project_brief TEXT,
    phone TEXT,
    email TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // API Routes
  app.post("/api/students", (req, res) => {
    const {
      administration,
      schoolName,
      studentName,
      grade,
      stage,
      innovationField,
      projectBrief,
      phone,
      email,
    } = req.body;

    try {
      // Check for uniqueness: Name, Phone, or Email
      const existing = db.prepare("SELECT id FROM students WHERE student_name = ? OR phone = ? OR email = ?").get(studentName, phone, email);
      if (existing) {
        return res.status(400).json({ 
          error: "عذراً، هذا الطالب مسجل مسبقاً. لا يمكن تكرار التسجيل بنفس الاسم أو رقم الهاتف أو البريد الإلكتروني." 
        });
      }

      const stmt = db.prepare(`
        INSERT INTO students (
          administration, school_name, student_name, grade, stage, 
          innovation_field, project_brief, phone, email
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      const result = stmt.run(
        administration,
        schoolName,
        studentName,
        grade,
        stage,
        innovationField,
        projectBrief,
        phone,
        email
      );
      res.json({ success: true, id: result.lastInsertRowid });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to save student data" });
    }
  });

  app.post("/api/admin/login", (req, res) => {
    const { username, password } = req.body;
    // Logic: admin / badria2026 or contains "بدرية"
    if (username === "admin" && (password === "badria2026" || password.includes("بدرية"))) {
      res.json({ success: true, token: "fake-admin-token" });
    } else {
      res.status(401).json({ error: "بيانات الدخول غير صحيحة" });
    }
  });

  app.get("/api/admin/students", (req, res) => {
    const token = req.headers.authorization;
    if (token !== "fake-admin-token") {
      return res.status(403).json({ error: "Unauthorized" });
    }
    const students = db.prepare("SELECT * FROM students ORDER BY id DESC").all();
    res.json(students);
  });

  app.get("/api/admin/students/:id", (req, res) => {
    const token = req.headers.authorization;
    if (token !== "fake-admin-token") {
      return res.status(403).json({ error: "Unauthorized" });
    }
    const { id } = req.params;
    const student = db.prepare("SELECT * FROM students WHERE id = ?").get(Number(id));
    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ error: "Student not found" });
    }
  });

  app.delete("/api/admin/students/:id", (req, res) => {
    const token = req.headers.authorization;
    if (token !== "fake-admin-token") {
      return res.status(403).json({ error: "Unauthorized" });
    }
    const { id } = req.params;
    db.prepare("DELETE FROM students WHERE id = ?").run(Number(id));
    res.json({ success: true });
  });

  app.put("/api/admin/students/:id", (req, res) => {
    const token = req.headers.authorization;
    if (token !== "fake-admin-token") {
      return res.status(403).json({ error: "Unauthorized" });
    }
    const { id } = req.params;
    const {
      administration,
      school_name,
      student_name,
      grade,
      stage,
      innovation_field,
      project_brief,
      phone,
      email,
    } = req.body;

    try {
      db.prepare(`
        UPDATE students SET 
          administration = ?, school_name = ?, student_name = ?, 
          grade = ?, stage = ?, innovation_field = ?, 
          project_brief = ?, phone = ?, email = ?
        WHERE id = ?
      `).run(
        administration,
        school_name,
        student_name,
        grade,
        stage,
        innovation_field,
        project_brief,
        phone,
        email,
        Number(id)
      );
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to update student" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
