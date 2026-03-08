import React from "react";
import { GraduationCap, Phone } from "lucide-react";

export const Footer = () => (
  <footer className="bg-slate-900 text-white py-16 px-4 border-t-4 border-gold">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-right">
      <div className="space-y-4">
        <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
          <GraduationCap className="w-8 h-8 text-gold" />
          <span className="text-xl font-black tracking-tighter">قسم الموهوبين</span>
        </div>
        <p className="text-slate-400 text-sm leading-relaxed">
          نهدف إلى اكتشاف ورعاية الطلاب الموهوبين والمبتكرين في كافة المجالات العلمية والفنية، وتوفير البيئة الخصبة لإبداعاتهم.
        </p>
      </div>

      <div className="space-y-4">
        <h4 className="text-lg font-bold text-gold">روابط سريعة</h4>
        <ul className="space-y-2 text-slate-400 text-sm">
          <li><a href="#" className="hover:text-gold transition-colors">الرئيسية</a></li>
          <li><a href="#/register" className="hover:text-gold transition-colors">تسجيل طالب جديد</a></li>
          <li><a href="#/admin/login" className="hover:text-gold transition-colors">لوحة التحكم</a></li>
        </ul>
      </div>

      <div className="space-y-4">
        <h4 className="text-lg font-bold text-gold">تواصل معنا</h4>
        <div className="space-y-2 text-slate-400 text-sm">
          <p className="flex items-center justify-center md:justify-start gap-2" dir="ltr">
            <Phone className="w-4 h-4" /> +201009554943
          </p>
          <p>إدارة غرب كفر الشيخ التعليمية - قسم الموهوبين</p>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-slate-500 text-xs">
      <p className="mb-2 text-gold font-bold">بالتعاون مع مس بدرية - توجيه التعلم الذكي</p>
      <p className="mb-4 text-slate-400 font-medium">تصميم وبرمجة وتطوير :- أحمد عصام منصف اسماعيل طالب بمدرسة محلة موسي الاعدادية</p>
      جميع الحقوق محفوظة &copy; {new Date().getFullYear()} - إدارة غرب كفر الشيخ التعليمية
    </div>
  </footer>
);
