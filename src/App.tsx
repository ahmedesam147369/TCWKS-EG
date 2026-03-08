/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from "react";
import { HashRouter, Routes, Route, Link, useNavigate, Navigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Student } from "./types";
import { cn } from "./utils/cn";
import clsx from "clsx";
import { 
  Trophy, 
  UserPlus, 
  LayoutDashboard, 
  School, 
  Building2, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  Mail, 
  FileText, 
  ArrowLeft, 
  ArrowRight, 
  LogOut, 
  FileSpreadsheet, 
  Search, 
  Trash2, 
  Edit, 
  Eye, 
  X,
  Phone,
  GraduationCap
} from "lucide-react";
import * as XLSX from "xlsx";

// --- Components ---

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-[calc(100vh-320px)] flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-edu-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 glass-card p-10 md:p-16 rounded-[2.5rem] max-w-4xl w-full text-center border-t-8 border-t-gold shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)]"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 text-gold-dark font-bold text-sm mb-8 border border-gold/20"
        >
          <Trophy className="w-4 h-4" />
          منصة المبدعين والمبتكرين
        </motion.div>

        <h2 className="text-4xl md:text-6xl font-black text-edu-blue mb-8 leading-[1.2]">
          استمارة تسجيل بيانات <br />
          <span className="text-gold drop-shadow-sm">الطلاب المبتكرين</span>
        </h2>
        
        <p className="text-slate-600 mb-12 text-xl leading-relaxed max-w-2xl mx-auto font-medium">
          نرحب بطلابنا المبدعين والمبتكرين. هذه المنصة مخصصة لتوثيق وتسجيل مواهبكم ومشاريعكم الابتكارية لدعمها وتطويرها نحو مستقبل أفضل.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <motion.button 
            whileHover={{ scale: 1.05, translateY: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/register")}
            className="flex items-center justify-center gap-3 bg-edu-blue hover:bg-edu-blue-light text-white px-10 py-5 rounded-2xl font-black text-xl transition-all shadow-[0_20px_40px_-12px_rgba(26,54,93,0.3)] group"
          >
            <UserPlus className="w-7 h-7 group-hover:rotate-12 transition-transform" />
            تسجيل طالب جديد
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.05, translateY: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/admin/login")}
            className="flex items-center justify-center gap-3 bg-white border-2 border-slate-200 text-slate-700 hover:border-edu-blue hover:text-edu-blue px-10 py-5 rounded-2xl font-black text-xl transition-all shadow-lg"
          >
            <LayoutDashboard className="w-7 h-7" />
            لوحة التحكم
          </motion.button>
        </div>
      </motion.div>
      
      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl w-full relative z-10">
        {[
          { icon: Trophy, title: "دعم الموهبة", desc: "نعمل على اكتشاف ودعم المواهب الطلابية في كافة المجالات العلمية والأدبية.", color: "bg-amber-50 text-amber-600" },
          { icon: School, title: "رعاية ابتكارية", desc: "توفير البيئة المناسبة لتطوير المشاريع والابتكارات العلمية بالتعاون مع الخبراء.", color: "bg-blue-50 text-blue-600" },
          { icon: Building2, title: "تواصل فعال", desc: "ربط المبتكرين بالجهات المعنية والمؤسسات البحثية لتطوير مهاراتهم.", color: "bg-emerald-50 text-emerald-600" }
        ].map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            whileHover={{ y: -10 }}
            className="bg-white p-10 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 text-center transition-all group"
          >
            <div className={cn("inline-flex p-5 rounded-3xl mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3", item.color)}>
              <item.icon className="w-10 h-10" />
            </div>
            <h4 className="text-2xl font-black text-edu-blue mb-4">{item.title}</h4>
            <p className="text-slate-500 text-lg leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const Register = () => {
  const navigate = useNavigate();
  const [isApiConnected, setIsApiConnected] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/health").then(res => setIsApiConnected(res.ok)).catch(() => setIsApiConnected(false));
  }, []);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    administration: "",
    schoolName: "",
    studentName: "",
    grade: "",
    stage: "",
    innovationField: "",
    projectBrief: "",
    phone: "",
    email: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const res = await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => navigate("/"), 3000);
      } else {
        setError(data.error || "حدث خطأ أثناء حفظ البيانات. يرجى المحاولة مرة أخرى.");
      }
    } catch (err) {
      setError("فشل الاتصال بالخادم.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-6">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-12 rounded-3xl shadow-2xl text-center max-w-md border-t-8 border-t-green-500"
        >
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-4">تم التسجيل بنجاح!</h2>
          <p className="text-slate-600 mb-8">شكراً لك، تم استلام بياناتك بنجاح وسيتم مراجعتها من قبل قسم الموهوبين.</p>
          <div className="text-sm text-slate-400">سيتم توجيهك للصفحة الرئيسية خلال لحظات...</div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 py-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100"
      >
        <div className="blue-gradient p-6 text-white">
          <h2 className="text-xl font-bold flex items-center gap-3">
            <UserPlus className="w-6 h-6 text-gold" />
            استمارة تسجيل طالب مبتكر
          </h2>
          <p className="text-white/70 mt-1 text-sm">يرجى ملء كافة الخانات بدقة لضمان تسجيل بياناتك بشكل صحيح.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {isApiConnected === false && (
            <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 shrink-0" />
              <div className="text-xs">
                <p className="font-bold">تنبيه: الخادم غير متصل</p>
                <p>يبدو أنك تستخدم استضافة لا تدعم قواعد البيانات (مثل InfinityFree). لن يتم حفظ البيانات في هذه الحالة.</p>
              </div>
            </div>
          )}
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl flex items-center gap-3 border border-red-100">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p className="text-xs font-bold">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-edu-blue flex items-center gap-2">
                <Building2 className="w-3 h-3" /> الإدارة التعليمية
              </label>
              <input 
                required
                type="text" 
                placeholder="مثال: غرب كفر الشيخ"
                value={formData.administration}
                onChange={e => setFormData({...formData, administration: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-edu-blue focus:ring-4 focus:ring-edu-blue/5 outline-none transition-all text-sm"
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-xs font-bold text-edu-blue flex items-center gap-2">
                <School className="w-3 h-3" /> اسم المدرسة
              </label>
              <input 
                required
                type="text" 
                placeholder="أدخل اسم المدرسة"
                value={formData.schoolName}
                onChange={e => setFormData({...formData, schoolName: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-edu-blue focus:ring-4 focus:ring-edu-blue/5 outline-none transition-all text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-edu-blue flex items-center gap-2">
                <GraduationCap className="w-3 h-3" /> اسم الطالب
              </label>
              <input 
                required
                type="text" 
                placeholder="الاسم رباعي"
                value={formData.studentName}
                onChange={e => setFormData({...formData, studentName: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-edu-blue focus:ring-4 focus:ring-edu-blue/5 outline-none transition-all text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-edu-blue flex items-center gap-2">
                <Info className="w-3 h-3" /> المرحلة الدراسية
              </label>
              <select 
                required
                value={formData.stage}
                onChange={e => setFormData({...formData, stage: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-edu-blue focus:ring-4 focus:ring-edu-blue/5 outline-none transition-all appearance-none text-sm"
              >
                <option value="">اختر المرحلة</option>
                <option value="ابتدائي">ابتدائي</option>
                <option value="إعدادي">إعدادي</option>
                <option value="ثانوي">ثانوي</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-edu-blue flex items-center gap-2">
                <Info className="w-3 h-3" /> الصف الدراسي
              </label>
              <input 
                required
                type="text" 
                placeholder="مثال: الصف الثالث"
                value={formData.grade}
                onChange={e => setFormData({...formData, grade: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-edu-blue focus:ring-4 focus:ring-edu-blue/5 outline-none transition-all text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-edu-blue flex items-center gap-2">
                <Trophy className="w-3 h-3" /> مجال الابتكار
              </label>
              <input 
                required
                type="text" 
                placeholder="مثال: برمجة، روبوت، علوم..."
                value={formData.innovationField}
                onChange={e => setFormData({...formData, innovationField: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-edu-blue focus:ring-4 focus:ring-edu-blue/5 outline-none transition-all text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-edu-blue flex items-center gap-2">
                <Phone className="w-3 h-3" /> رقم التليفون
              </label>
              <input 
                required
                type="tel" 
                placeholder="01xxxxxxxxx"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-edu-blue focus:ring-4 focus:ring-edu-blue/5 outline-none transition-all text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-edu-blue flex items-center gap-2">
                <Mail className="w-3 h-3" /> البريد الإلكتروني (اختياري)
              </label>
              <input 
                type="email" 
                placeholder="example@mail.com"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-edu-blue focus:ring-4 focus:ring-edu-blue/5 outline-none transition-all text-sm"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-edu-blue flex items-center gap-2">
              <FileText className="w-3 h-3" /> نبذة مختصرة عن المشروع
            </label>
            <textarea 
              required
              rows={3}
              placeholder="اشرح فكرة مشروعك باختصار..."
              value={formData.projectBrief}
              onChange={e => setFormData({...formData, projectBrief: e.target.value})}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-edu-blue focus:ring-4 focus:ring-edu-blue/5 outline-none transition-all resize-none text-sm"
            />
          </div>

          <div className="pt-4 flex gap-3">
            <button 
              type="submit"
              disabled={loading}
              className="flex-1 bg-edu-blue hover:bg-edu-blue-light text-white font-bold py-3 rounded-xl transition-all shadow-lg hover:shadow-edu-blue/20 disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
            >
              {loading ? "جاري الإرسال..." : (
                <>
                  إرسال البيانات
                  <ArrowLeft className="w-4 h-4" />
                </>
              )}
            </button>
            <button 
              type="button"
              onClick={() => navigate("/")}
              className="px-6 py-3 rounded-xl border-2 border-slate-200 text-slate-500 font-bold hover:bg-slate-50 transition-all text-sm"
            >
              إلغاء
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("admin_token", data.token);
        navigate("/admin/dashboard");
      } else {
        setError(data.error || "فشل تسجيل الدخول");
      }
    } catch (err) {
      setError("خطأ في الاتصال");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl max-w-md w-full border border-slate-100"
      >
        <div className="text-center mb-10">
          <div className="inline-flex p-4 rounded-2xl bg-edu-blue/5 text-edu-blue mb-4">
            <LayoutDashboard className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold text-edu-blue">دخول الإدارة</h2>
          <p className="text-slate-500 mt-2">يرجى إدخال بيانات الاعتماد للوصول للوحة التحكم</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm flex items-center gap-2 border border-red-100">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">اسم المستخدم</label>
            <input 
              required
              type="text" 
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-edu-blue focus:ring-4 focus:ring-edu-blue/5 outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">كلمة المرور</label>
            <input 
              required
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-edu-blue focus:ring-4 focus:ring-edu-blue/5 outline-none transition-all"
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-edu-blue hover:bg-edu-blue-light text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-edu-blue/20 disabled:opacity-50"
          >
            {loading ? "جاري التحقق..." : "تسجيل الدخول"}
          </button>
          
          <button 
            type="button"
            onClick={() => navigate("/")}
            className="w-full text-slate-400 text-sm hover:text-edu-blue transition-colors"
          >
            العودة للرئيسية
          </button>
        </form>
      </motion.div>
    </div>
  );
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isApiConnected, setIsApiConnected] = useState<boolean | null>(null);
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    // Check if API is reachable
    fetch("/api/health").then(res => setIsApiConnected(res.ok)).catch(() => setIsApiConnected(false));
  }, []);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const token = localStorage.getItem("admin_token");

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetchStudents();
  }, [token]);

  const [studentToDelete, setStudentToDelete] = useState<number | null>(null);
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const fetchStudents = async () => {
    try {
      const res = await fetch("/api/admin/students", {
        headers: { "Authorization": token || "" }
      });
      if (res.ok) {
        const data = await res.json();
        setStudents(data);
      } else {
        navigate("/admin/login");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/admin/students/${id}`, {
        method: "DELETE",
        headers: { "Authorization": token || "" }
      });
      if (res.ok) {
        setStudents(prev => prev.filter(s => s.id !== id));
        setToast({ message: "تم حذف السجل بنجاح", type: 'success' });
      } else {
        setToast({ message: "فشل حذف السجل", type: 'error' });
      }
    } catch (err) {
      console.error(err);
      setToast({ message: "خطأ في الاتصال بالخادم", type: 'error' });
    } finally {
      setStudentToDelete(null);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudent) return;
    
    try {
      const res = await fetch(`/api/admin/students/${editingStudent.id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": token || "" 
        },
        body: JSON.stringify(editingStudent)
      });
      if (res.ok) {
        setStudents(students.map(s => s.id === editingStudent.id ? editingStudent : s));
        setEditingStudent(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredStudents = useMemo(() => {
    return students.filter(s => 
      s.student_name.toLowerCase().includes(search.toLowerCase()) ||
      s.school_name.toLowerCase().includes(search.toLowerCase()) ||
      s.innovation_field.toLowerCase().includes(search.toLowerCase())
    );
  }, [students, search]);

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(students);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Students");
    XLSX.writeFile(wb, "Innovative_Students.xlsx");
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/");
  };

  if (loading) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-edu-blue"></div>
    </div>
  );

  return (
    <div className="p-4 md:p-8 max-w-[1600px] mx-auto">
      {isApiConnected === false && (
        <div className="bg-red-600 text-white text-center py-2 rounded-xl mb-6 text-sm font-bold animate-pulse">
          تنبيه: الخادم غير متصل. البيانات المعروضة قد تكون قديمة أو غير موجودة.
        </div>
      )}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-edu-blue flex items-center gap-3">
            <LayoutDashboard className="w-8 h-8 text-gold" />
            لوحة تحكم الطلاب المبتكرين
          </h2>
          <p className="text-slate-500 mt-1">إجمالي الطلاب المسجلين: {students.length} طالب</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <button onClick={exportExcel} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all">
            <FileSpreadsheet className="w-4 h-4" /> تصدير Excel
          </button>
          <button onClick={handleLogout} className="flex items-center gap-2 bg-slate-200 hover:bg-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-bold transition-all">
            <LogOut className="w-4 h-4" /> خروج
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden print:shadow-none print:border-none">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row gap-4 print:hidden">
          <div className="relative flex-1">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="بحث باسم الطالب، المدرسة، أو مجال الابتكار..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pr-12 pl-4 py-3 rounded-xl border border-slate-200 focus:border-edu-blue focus:ring-4 focus:ring-edu-blue/5 outline-none transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          {/* Toast Notification */}
          <AnimatePresence>
            {toast && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={clsx(
                  "fixed top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 font-bold",
                  toast.type === 'success' ? "bg-green-600 text-white" : "bg-red-600 text-white"
                )}
              >
                {toast.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                {toast.message}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Delete Confirmation Modal */}
          <AnimatePresence>
            {studentToDelete !== null && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center"
                >
                  <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Trash2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-800 mb-2">تأكيد الحذف</h3>
                  <p className="text-slate-600 mb-8">هل أنت متأكد من رغبتك في حذف هذا السجل؟ لا يمكن التراجع عن هذا الإجراء.</p>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => handleDelete(studentToDelete)}
                      className="flex-1 py-4 bg-red-600 text-white rounded-2xl font-black hover:bg-red-700 transition-all shadow-lg shadow-red-600/20"
                    >
                      نعم، احذف
                    </button>
                    <button
                      type="button"
                      onClick={() => setStudentToDelete(null)}
                      className="flex-1 py-4 bg-slate-100 text-slate-700 rounded-2xl font-black hover:bg-slate-200 transition-all"
                    >
                      إلغاء
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          <table className="w-full text-right">
            <thead className="bg-slate-50 text-edu-blue uppercase text-xs font-bold border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">رقم التسجيل</th>
                <th className="px-6 py-4">اسم الطالب</th>
                <th className="px-6 py-4">مجال الابتكار</th>
                <th className="px-6 py-4">رقم الهاتف</th>
                <th className="px-6 py-4 text-center print:hidden">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((student, index) => (
                <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-400">#{index + 1}</td>
                  <td className="px-6 py-4 font-bold text-edu-blue">{student.student_name}</td>
                  <td className="px-6 py-4">
                    <span className="bg-gold-light text-gold-dark px-3 py-1 rounded-lg text-xs font-bold">
                      {student.innovation_field}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-sm text-slate-600">{student.phone}</td>
                  <td className="px-6 py-4 print:hidden">
            <div className="flex justify-center gap-2">
              <button 
                onClick={() => navigate(`/admin/student/${student.id}`)}
                className="p-2 text-edu-blue hover:bg-edu-blue/10 rounded-xl transition-all hover:scale-110"
                title="عرض التفاصيل"
              >
                <Eye className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setEditingStudent(student)}
                className="p-2 text-blue-600 hover:bg-blue-100 rounded-xl transition-all hover:scale-110"
                title="تعديل"
              >
                <Edit className="w-5 h-5" />
              </button>
              <button 
                type="button"
                onClick={() => setStudentToDelete(student.id)}
                className="p-2 text-red-600 hover:bg-red-100 rounded-xl transition-all hover:scale-110"
                title="حذف"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
          {filteredStudents.length === 0 && (
            <div className="p-12 text-center text-slate-400">
              لا توجد نتائج تطابق بحثك
            </div>
          )}
        </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editingStudent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden"
            >
              <div className="bg-edu-blue p-6 text-white flex justify-between items-center">
                <h3 className="text-xl font-bold">تعديل بيانات الطالب</h3>
                <button onClick={() => setEditingStudent(null)} className="text-white/70 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <form onSubmit={handleUpdate} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500">اسم الطالب</label>
                  <input 
                    type="text" 
                    value={editingStudent.student_name}
                    onChange={e => setEditingStudent({...editingStudent, student_name: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-edu-blue outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500">المدرسة</label>
                  <input 
                    type="text" 
                    value={editingStudent.school_name}
                    onChange={e => setEditingStudent({...editingStudent, school_name: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-edu-blue outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500">الصف</label>
                  <input 
                    type="text" 
                    value={editingStudent.grade}
                    onChange={e => setEditingStudent({...editingStudent, grade: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-edu-blue outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500">المرحلة</label>
                  <select 
                    value={editingStudent.stage}
                    onChange={e => setEditingStudent({...editingStudent, stage: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-edu-blue outline-none"
                  >
                    <option value="ابتدائي">ابتدائي</option>
                    <option value="إعدادي">إعدادي</option>
                    <option value="ثانوي">ثانوي</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500">مجال الابتكار</label>
                  <input 
                    type="text" 
                    value={editingStudent.innovation_field}
                    onChange={e => setEditingStudent({...editingStudent, innovation_field: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-edu-blue outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500">الهاتف</label>
                  <input 
                    type="text" 
                    value={editingStudent.phone}
                    onChange={e => setEditingStudent({...editingStudent, phone: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-edu-blue outline-none"
                  />
                </div>
                <div className="md:col-span-2 space-y-1">
                  <label className="text-xs font-bold text-slate-500">نبذة المشروع</label>
                  <textarea 
                    rows={3}
                    value={editingStudent.project_brief}
                    onChange={e => setEditingStudent({...editingStudent, project_brief: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-edu-blue outline-none resize-none"
                  />
                </div>
                <div className="md:col-span-2 pt-4 flex gap-3">
                  <button type="submit" className="flex-1 bg-edu-blue text-white font-bold py-3 rounded-xl hover:bg-edu-blue-light transition-all">حفظ التغييرات</button>
                  <button type="button" onClick={() => setEditingStudent(null)} className="flex-1 bg-slate-100 text-slate-500 font-bold py-3 rounded-xl hover:bg-slate-200 transition-all">إلغاء</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("admin_token");

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }
    const fetchStudent = async () => {
      try {
        const res = await fetch(`/api/admin/students/${id}`, {
          headers: { "Authorization": token || "" }
        });
        if (res.ok) {
          const data = await res.json();
          setStudent(data);
        } else {
          navigate("/admin/dashboard");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [id, token, navigate]);

  if (loading) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-edu-blue"></div>
    </div>
  );

  if (!student) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
      <div className="p-6 rounded-full bg-red-50 text-red-500 mb-6">
        <X className="w-16 h-16" />
      </div>
      <h3 className="text-3xl font-black text-edu-blue mb-4">عذراً، الطالب غير موجود</h3>
      <p className="text-slate-500 mb-8 text-lg">يبدو أن السجل الذي تبحث عنه قد تم حذفه أو أن الرابط غير صحيح.</p>
      <button 
        onClick={() => navigate("/admin/dashboard")}
        className="px-8 py-4 rounded-2xl bg-edu-blue text-white font-black hover:bg-edu-blue-light transition-all shadow-xl shadow-edu-blue/20"
      >
        العودة للوحة التحكم
      </button>
    </div>
  );

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto print:p-0 print:max-w-none">
      <div className="hidden print:block mb-8 border-b-4 border-edu-blue pb-6">
        <div className="flex justify-between items-center">
          <div className="text-right">
            <h1 className="text-2xl font-black text-edu-blue">وزارة التربية والتعليم والتعليم الفني</h1>
            <h2 className="text-xl font-bold text-slate-700">مديرية التربية والتعليم بكفر الشيخ</h2>
            <h3 className="text-lg font-bold text-slate-600">إدارة غرب كفر الشيخ التعليمية</h3>
            <h4 className="text-md font-bold text-slate-500">قسم الموهوبين والتعلم الذكي</h4>
          </div>
          <div className="text-left flex flex-col items-center gap-2">
             <GraduationCap className="w-16 h-16 text-edu-blue" />
             <span className="text-xs font-bold text-slate-400">كود الطالب: #{student.id}</span>
          </div>
        </div>
        <div className="mt-8 text-center">
          <h2 className="text-3xl font-black underline decoration-gold decoration-4 underline-offset-8">استمارة بيانات طالب مبتكر</h2>
        </div>
      </div>

      <motion.button 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate("/admin/dashboard")}
        className="flex items-center gap-2 text-slate-500 hover:text-edu-blue mb-8 font-bold transition-colors group print:hidden"
      >
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        العودة للوحة التحكم
      </motion.button>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 print:shadow-none print:border-none print:rounded-none"
      >
        <div className="blue-gradient p-10 text-white relative overflow-hidden print:bg-none print:text-edu-blue print:p-0 print:mb-8">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none print:hidden">
            <div className="absolute top-[-50%] left-[-10%] w-[120%] h-[200%] rotate-12 bg-gradient-to-br from-gold via-transparent to-transparent" />
          </div>
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10 print:flex-row print:justify-between">
            <div className="p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-inner print:hidden">
              <GraduationCap className="w-16 h-16 text-gold drop-shadow-lg" />
            </div>
            <div className="text-center md:text-right print:text-right">
              <h3 className="text-3xl md:text-4xl font-black mb-2 print:text-4xl">{student.student_name}</h3>
              <p className="text-gold-light text-xl font-bold print:text-edu-blue print:text-2xl">{student.innovation_field}</p>
            </div>
          </div>
        </div>

        <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-10 print:p-0 print:gap-6 print:grid-cols-2">
          <div className="space-y-8">
            <div className="flex items-start gap-5">
              <div className="p-4 rounded-2xl bg-slate-50 text-edu-blue shadow-sm">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">الإدارة التعليمية</p>
                <p className="text-xl font-black text-edu-blue">{student.administration}</p>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="p-4 rounded-2xl bg-slate-50 text-edu-blue shadow-sm">
                <School className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">اسم المدرسة</p>
                <p className="text-xl font-black text-edu-blue">{student.school_name}</p>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="p-4 rounded-2xl bg-slate-50 text-edu-blue shadow-sm">
                <Info className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">المرحلة والصف</p>
                <p className="text-xl font-black text-edu-blue">{student.stage} - {student.grade}</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex items-start gap-5">
              <div className="p-4 rounded-2xl bg-slate-50 text-edu-blue shadow-sm">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">رقم التواصل</p>
                <p className="text-xl font-black text-edu-blue font-mono">{student.phone}</p>
              </div>
            </div>

            {student.email && (
              <div className="flex items-start gap-5">
                <div className="p-4 rounded-2xl bg-slate-50 text-edu-blue shadow-sm">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">البريد الإلكتروني</p>
                  <p className="text-xl font-black text-edu-blue break-all">{student.email}</p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-5">
              <div className="p-4 rounded-2xl bg-slate-50 text-edu-blue shadow-sm">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">تاريخ التسجيل</p>
                <p className="text-xl font-black text-edu-blue">
                  {new Date(student.created_at).toLocaleDateString('ar-EG', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 bg-slate-50 p-8 rounded-[2rem] border border-slate-100 shadow-inner">
            <div className="flex items-center gap-3 mb-4 text-edu-blue">
              <FileText className="w-6 h-6" />
              <h4 className="text-xl font-black">نبذة عن المشروع الابتكاري</h4>
            </div>
            <p className="text-slate-600 text-lg leading-relaxed whitespace-pre-wrap font-medium">
              {student.project_brief}
            </p>
          </div>

          <div className="hidden print:grid grid-cols-2 gap-12 mt-16 pt-8 border-t border-slate-200">
            <div className="col-span-2 text-center mb-8">
              <p className="text-sm font-bold text-slate-500">بالتعاون مع مس بدرية - توجيه التعلم الذكي</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-slate-800 mb-12">توقيع الطالب</p>
              <div className="w-48 h-px bg-slate-300 mx-auto"></div>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-slate-800 mb-12">يعتمد،، رئيس قسم الموهوبين</p>
              <div className="w-48 h-px bg-slate-300 mx-auto"></div>
            </div>
          </div>
        </div>

        <div className="p-8 bg-slate-50/50 border-t border-slate-100 flex justify-center md:justify-end gap-4">
          <button 
            onClick={() => navigate("/admin/dashboard")}
            className="px-10 py-4 rounded-2xl bg-edu-blue text-white font-black hover:bg-edu-blue-light transition-all shadow-xl shadow-edu-blue/20"
          >
            إغلاق
          </button>
        </div>
      </motion.div>
    </div>
  );
};


export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/student/:id" element={<StudentDetails />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}
