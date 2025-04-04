
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useLearning } from '@/context/LearningContext';
import { CheckCircle2, Circle, BarChart3 } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';

const ProgressTracker: React.FC = () => {
  const { pathway, tasks } = useLearning();

  if (!pathway) return null;

  // Calculate completed tasks
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const taskCompletion = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Calculate completed stages
  const completedStages = pathway.stages.filter(stage => stage.completed).length;
  const totalStages = pathway.stages.length;
  const stageCompletion = totalStages > 0 ? Math.round((completedStages / totalStages) * 100) : 0;

  // Calculate days progress
  const today = new Date();
  const totalDays = differenceInDays(new Date(pathway.endDate), new Date(pathway.startDate));
  const daysElapsed = differenceInDays(today, new Date(pathway.startDate));
  const daysProgress = totalDays > 0 ? Math.min(100, Math.round((daysElapsed / totalDays) * 100)) : 0;

  // Calculate days remaining
  const daysRemaining = Math.max(0, differenceInDays(new Date(pathway.endDate), today));

  // Overall progress is already calculated in the pathway

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-learning-primary flex items-center">
          <BarChart3 className="w-5 h-5 mr-2" />
          Theo dõi Tiến độ
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Nhiệm vụ hoàn thành</span>
              <span>{completedTasks}/{totalTasks}</span>
            </div>
            <Progress value={taskCompletion} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Giai đoạn hoàn thành</span>
              <span>{completedStages}/{totalStages}</span>
            </div>
            <Progress value={stageCompletion} className="h-2" />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Thời gian đã trôi qua</span>
            <span>{daysProgress}%</span>
          </div>
          <Progress value={daysProgress} className="h-2" />
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-lg">
            <span className="text-sm text-gray-500">Ngày còn lại</span>
            <span className="text-2xl font-bold text-learning-primary">{daysRemaining}</span>
          </div>
          
          <div className="flex flex-col items-center justify-center p-4 bg-green-50 rounded-lg">
            <span className="text-sm text-gray-500">Tiến độ tổng thể</span>
            <span className="text-2xl font-bold text-green-600">{pathway.progress}%</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Giai đoạn hiện tại</h3>
          <div className="space-y-3">
            {pathway.stages.map((stage, index) => (
              <div 
                key={stage.id} 
                className={`flex items-center justify-between p-2 rounded-md ${
                  stage.completed ? "bg-green-50" : "bg-gray-50"
                }`}
              >
                <div className="flex items-center">
                  {stage.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-green-600 mr-2" />
                  ) : (
                    <Circle className="w-4 h-4 text-gray-400 mr-2" />
                  )}
                  <span className={`text-sm ${stage.completed ? "text-green-600" : ""}`}>
                    {index + 1}. {stage.title}
                  </span>
                </div>
                <span className="text-xs">
                  {stage.completed ? "Hoàn thành" : `${stage.duration} ngày`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressTracker;
