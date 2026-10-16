import React, { useState } from 'react';
import {
  Play,
  CheckCircle2,
  Clock,
  Sparkles,
  BookOpen,
  Award,
  ShieldAlert,
  Coins,
  Briefcase,
  HelpCircle,
  X,
  Volume2,
  Maximize2,
  RotateCcw,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { academyLessons } from '../data/academyData';
import { Lesson, CourseCategory } from '../types/academy';

export const AcademyView: React.FC = () => {
  const [lessons, setLessons] = useState<Lesson[]>(academyLessons);
  const [selectedCategory, setSelectedCategory] = useState<CourseCategory | 'all'>('all');
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  // Video player modal state
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const filteredLessons = lessons.filter((l) =>
    selectedCategory === 'all' ? true : l.category === selectedCategory
  );

  const completedCount = lessons.filter((l) => l.completed).length;
  const progressPercent = Math.round((completedCount / lessons.length) * 100);

  const handleOpenLesson = (lesson: Lesson) => {
    setActiveLesson(lesson);
    setIsPlaying(true);
    setSelectedQuizAnswer(null);
    setQuizSubmitted(false);
  };

  const handleToggleComplete = (lessonId: string) => {
    setLessons((prev) =>
      prev.map((l) => (l.id === lessonId ? { ...l, completed: !l.completed } : l))
    );
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } catch {}
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
    if (activeLesson && selectedQuizAnswer === activeLesson.quiz.correctIndex) {
      handleToggleComplete(activeLesson.id);
    }
  };

  return (
    <div className="space-y-6 pb-24 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-950/70 via-slate-900 to-indigo-950/70 border border-blue-500/30 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-bold border border-blue-500/30 uppercase tracking-wider">
                XPAY Akademiya
              </span>
              <span className="text-xs text-amber-400 font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Bepul Masterclasslar
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white mt-2">
              Pul Sirlari, Biznes, Kripto va Xavfsizlik
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-lg leading-relaxed">
              Moliya mutaxassislari tomonidan tayyorlangan amaliy video darslar. Oylik maoshni to'g'ri taqsimlashdan tortib, kiberxavfsizlik va biznesni 0 dan boshlashgacha.
            </p>
          </div>

          {/* Progress Box */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-center shrink-0 min-w-[150px]">
            <span className="text-2xl font-black text-blue-400 font-mono">{progressPercent}%</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">
              {completedCount}/{lessons.length} ta dars tamomlandi
            </span>
            <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-emerald-400 h-1.5 rounded-full transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'all', label: 'Barchasi', icon: BookOpen },
          { id: 'pul-sirlari', label: 'Pul sirlari', icon: Award },
          { id: 'biznes', label: 'Biznes boshlash', icon: Briefcase },
          { id: 'kripto-treyding', label: 'Kripto & Treyding', icon: Coins },
          { id: 'xavfsizlik', label: 'Kiberxavfsizlik', icon: ShieldAlert },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = selectedCategory === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id as any)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Video Lessons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredLessons.map((lesson) => (
          <div
            key={lesson.id}
            onClick={() => handleOpenLesson(lesson)}
            className="group cursor-pointer rounded-3xl bg-[#0c1322] border border-slate-800/90 hover:border-blue-500/40 p-4 transition-all hover:scale-[1.01] shadow-xl space-y-3"
          >
            {/* Thumbnail Box */}
            <div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-900 border border-slate-800">
              <img
                src={lesson.thumbnail}
                alt={lesson.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-blue-600/90 hover:bg-blue-500 text-white flex items-center justify-center shadow-xl shadow-blue-600/40 group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 fill-white ml-0.5" />
                </div>
              </div>

              {/* Duration and Level Badge */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px]">
                <span className="px-2 py-0.5 rounded-lg bg-black/70 backdrop-blur-md text-white font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {lesson.duration}
                </span>

                <span
                  className={`px-2 py-0.5 rounded-lg text-white font-semibold ${
                    lesson.level === 'Boshlang\'ich'
                      ? 'bg-emerald-600/90'
                      : lesson.level === 'O\'rta'
                      ? 'bg-blue-600/90'
                      : 'bg-indigo-600/90'
                  }`}
                >
                  {lesson.level}
                </span>
              </div>
            </div>

            {/* Info */}
            <div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                <span>{lesson.categoryTitle}</span>
                {lesson.completed && (
                  <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Tamomlangan
                  </span>
                )}
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors line-clamp-2">
                {lesson.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">{lesson.description}</p>
            </div>

            {/* Speaker info */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px]">
              <span className="text-slate-300 font-medium">Spiker: {lesson.speaker}</span>
              <span className="text-blue-400 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                Darsni ko'rish →
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Video Player Modal */}
      {activeLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/90 backdrop-blur-md animate-in fade-in overflow-y-auto">
          <div className="w-full max-w-2xl rounded-3xl bg-[#091122] border border-blue-900/40 p-5 sm:p-6 space-y-5 shadow-2xl relative my-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-blue-400 font-bold block">
                  {activeLesson.categoryTitle} · {activeLesson.level}
                </span>
                <h2 className="text-base sm:text-lg font-bold text-white mt-0.5">
                  {activeLesson.title}
                </h2>
              </div>
              <button
                onClick={() => setActiveLesson(null)}
                className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Interactive Video Player Simulation */}
            <div className="relative rounded-2xl overflow-hidden aspect-video bg-black border border-slate-800 shadow-2xl flex flex-col justify-between p-4">
              <img
                src={activeLesson.thumbnail}
                alt="Video poster"
                className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none"
              />

              {/* Watermark Logo */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-white/90 bg-black/50 px-2.5 py-1 rounded-lg backdrop-blur-sm">
                  XPAY HD STREAM · 1080p
                </span>
                <span className="text-xs text-slate-300 bg-black/50 px-2.5 py-1 rounded-lg backdrop-blur-sm">
                  Spiker: {activeLesson.speaker}
                </span>
              </div>

              {/* Center Play/Pause Indicator */}
              <div className="relative z-10 flex items-center justify-center">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-16 h-16 rounded-full bg-blue-600/90 hover:bg-blue-500 text-white flex items-center justify-center shadow-2xl shadow-blue-500/50 hover:scale-105 active:scale-95 transition-all"
                >
                  <Play className={`w-7 h-7 fill-white ${isPlaying ? 'opacity-80' : ''}`} />
                </button>
              </div>

              {/* Video Player Control Bar */}
              <div className="relative z-10 bg-slate-900/80 backdrop-blur-md p-2.5 rounded-xl border border-slate-800/80 flex items-center gap-3 text-xs text-white">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="font-bold text-blue-400 hover:text-white"
                >
                  {isPlaying ? 'Pauza' : 'Ijro'}
                </button>

                <div className="flex-1 bg-slate-700 h-1.5 rounded-full overflow-hidden cursor-pointer">
                  <div className="bg-blue-500 h-full rounded-full w-2/3" />
                </div>

                <span className="font-mono text-[11px] text-slate-300">
                  08:14 / {activeLesson.duration}
                </span>

                <Volume2 className="w-4 h-4 text-slate-300" />
                <Maximize2 className="w-4 h-4 text-slate-300" />
              </div>
            </div>

            {/* Key Takeaways & Lecture Notes */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Darsning Asosiy Qoidalari & Xulosalari:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {activeLesson.keyTakeaways.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/80 text-slate-200 flex items-start gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Mini-Quiz to Test Knowledge */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-blue-500/20 space-y-3">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                <h4 className="text-xs font-bold text-white">
                  Bilimni tekshirish (Mini-savol):
                </h4>
              </div>

              <p className="text-xs text-slate-200">{activeLesson.quiz.question}</p>

              <div className="space-y-1.5">
                {activeLesson.quiz.options.map((opt, oIdx) => (
                  <button
                    key={oIdx}
                    onClick={() => {
                      if (!quizSubmitted) setSelectedQuizAnswer(oIdx);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl text-xs font-medium border transition-colors ${
                      selectedQuizAnswer === oIdx
                        ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                    } ${
                      quizSubmitted && oIdx === activeLesson.quiz.correctIndex
                        ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300'
                        : ''
                    }`}
                  >
                    {oIdx + 1}. {opt}
                  </button>
                ))}
              </div>

              {!quizSubmitted ? (
                <button
                  onClick={handleQuizSubmit}
                  disabled={selectedQuizAnswer === null}
                  className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white text-xs font-semibold"
                >
                  Javobni tekshirish
                </button>
              ) : (
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                  <p
                    className={
                      selectedQuizAnswer === activeLesson.quiz.correctIndex
                        ? 'text-emerald-400 font-bold'
                        : 'text-amber-400 font-bold'
                    }
                  >
                    {selectedQuizAnswer === activeLesson.quiz.correctIndex
                      ? 'Tabriklaymiz, javob to\'g\'ri!'
                      : 'Noto\'g\'ri javob belgilandi.'}
                  </p>
                  <p className="text-slate-400 text-[11px]">
                    {activeLesson.quiz.explanation}
                  </p>
                </div>
              )}
            </div>

            {/* Complete toggle button */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => handleToggleComplete(activeLesson.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  activeLesson.completed
                    ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-blue-600 hover:bg-blue-500 text-white'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {activeLesson.completed
                    ? 'Dars tamomlangan deb belgilandi'
                    : 'Darsni tamomladim (+100 XP)'}
                </span>
              </button>

              <button
                onClick={() => setActiveLesson(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-xs text-slate-300 hover:text-white"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
