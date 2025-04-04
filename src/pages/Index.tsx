
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LearningProvider } from '@/context/LearningContext';
import LearningForm from '@/components/LearningForm';
import PathwayVisualizer from '@/components/PathwayVisualizer';
import TaskList from '@/components/TaskList';
import ProgressTracker from '@/components/ProgressTracker';
import ResourceList from '@/components/ResourceList';
import { useLearning } from '@/context/LearningContext';
import { BarChart, BookOpen, CheckSquare, GraduationCap } from 'lucide-react';

const MainContent: React.FC = () => {
  const { pathway } = useLearning();

  if (!pathway) {
    return <LearningForm />;
  }

  return (
    <div className="space-y-8">
      <PathwayVisualizer />
      
      <Tabs defaultValue="tasks">
        <TabsList className="grid grid-cols-4 w-full max-w-md mx-auto">
          <TabsTrigger value="tasks" className="flex items-center justify-center gap-2">
            <CheckSquare className="w-4 h-4" />
            <span className="hidden sm:inline">Nhiệm vụ</span>
          </TabsTrigger>
          <TabsTrigger value="progress" className="flex items-center justify-center gap-2">
            <BarChart className="w-4 h-4" />
            <span className="hidden sm:inline">Tiến độ</span>
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center justify-center gap-2">
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">Tài nguyên</span>
          </TabsTrigger>
          <TabsTrigger value="info" className="flex items-center justify-center gap-2">
            <GraduationCap className="w-4 h-4" />
            <span className="hidden sm:inline">Thông tin</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tasks" className="mt-6">
          <TaskList />
        </TabsContent>
        <TabsContent value="progress" className="mt-6">
          <ProgressTracker />
        </TabsContent>
        <TabsContent value="resources" className="mt-6">
          <ResourceList />
        </TabsContent>
        <TabsContent value="info" className="mt-6">
          <div className="pathway-card">
            <div className="pathway-card-title">
              Thông tin lộ trình
            </div>
            <div className="mt-4 space-y-4 text-left">
              <div>
                <h3 className="font-medium">Môn học / Kỹ năng</h3>
                <p className="text-gray-700">{pathway.subject}</p>
              </div>
              <div>
                <h3 className="font-medium">Trình độ ban đầu</h3>
                <p className="text-gray-700">{pathway.currentLevel}</p>
              </div>
              <div>
                <h3 className="font-medium">Mục tiêu</h3>
                <p className="text-gray-700">{pathway.targetLevel}</p>
              </div>
              <div>
                <h3 className="font-medium">Thời gian dự kiến</h3>
                <p className="text-gray-700">{pathway.duration} ngày</p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-learning-background">
      <div className="container mx-auto py-8 px-4">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-learning-primary mb-2">
            Lộ Trình Học Tập Cá Nhân
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Thiết kế lộ trình học tập khoa học và hiệu quả để đạt được mục tiêu của bạn
          </p>
        </header>
        
        <LearningProvider>
          <MainContent />
        </LearningProvider>
      </div>
      
      <footer className="mt-12 py-6 bg-gray-50">
        <div className="container mx-auto text-center text-gray-500 text-sm">
          © 2025 Lộ Trình Học Tập Cá Nhân - Thiết kế bởi Chuyên Gia Tư Vấn Học Tập
        </div>
      </footer>
    </div>
  );
};

export default Index;
