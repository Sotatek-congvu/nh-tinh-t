
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, Calendar } from 'lucide-react';
import { useLearning } from '@/context/LearningContext';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

const PathwayVisualizer: React.FC = () => {
  const { pathway, completeStage, resetPathway } = useLearning();

  if (!pathway) return null;

  const formatDate = (date: Date) => {
    return format(new Date(date), 'dd MMMM yyyy', { locale: vi });
  };

  return (
    <div className="w-full space-y-6">
      <Card className="w-full">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold text-learning-primary">
                {pathway.subject}
              </CardTitle>
              <CardDescription className="mt-1">
                Từ {pathway.currentLevel} đến {pathway.targetLevel}
              </CardDescription>
            </div>
            <Button 
              variant="outline" 
              onClick={resetPathway}
              className="text-destructive border-destructive hover:bg-destructive/10"
            >
              Đặt Lại
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span>Bắt đầu: {formatDate(pathway.startDate)}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span>Kết thúc: {formatDate(pathway.endDate)}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Tiến độ tổng thể</span>
                <span className="text-sm font-medium">{pathway.progress}%</span>
              </div>
              <Progress value={pathway.progress} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-learning-primary">Các giai đoạn học tập</h3>
        
        <div className="space-y-4">
          {pathway.stages.map((stage, index) => (
            <Card 
              key={stage.id} 
              className={`border-l-4 transition-all ${
                stage.completed 
                  ? "border-l-green-500 bg-green-50" 
                  : "border-l-blue-500"
              }`}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Badge variant={stage.completed ? "outline" : "default"} className={stage.completed ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}>
                      Giai đoạn {index + 1}
                    </Badge>
                    <CardTitle className="text-lg">{stage.title}</CardTitle>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`flex items-center ${
                      stage.completed ? "text-green-600" : "text-gray-500"
                    }`}
                    onClick={() => completeStage(stage.id)}
                  >
                    {stage.completed ? (
                      <CheckCircle className="w-5 h-5 mr-1" />
                    ) : (
                      <Circle className="w-5 h-5 mr-1" />
                    )}
                    {stage.completed ? "Đã hoàn thành" : "Đánh dấu hoàn thành"}
                  </Button>
                </div>
                <CardDescription className="mt-1">
                  {stage.description} • {stage.duration} ngày
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Mục tiêu:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {stage.goals.map(goal => (
                        <li key={goal.id} className="text-sm">
                          {goal.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Tài nguyên:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {stage.resources.map(resource => (
                        <li key={resource.id} className="text-sm">
                          <span className="font-medium">{resource.title}</span> - {resource.description}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PathwayVisualizer;
