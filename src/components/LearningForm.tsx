
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormData, SkillLevel } from '@/types';
import { useLearning } from '@/context/LearningContext';

const LearningForm: React.FC = () => {
  const { createPathway, isLoading } = useLearning();
  const [formData, setFormData] = useState<FormData>({
    subject: '',
    currentLevel: 'Mới bắt đầu',
    targetLevel: '',
    duration: 30
  });
  
  const handleChange = (field: keyof FormData, value: string | number | SkillLevel) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.subject && formData.targetLevel && formData.duration) {
      createPathway(formData);
    }
  };
  
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-learning-primary">
          Tạo Lộ Trình Học Tập
        </CardTitle>
        <CardDescription>
          Vui lòng điền thông tin để tạo lộ trình học tập phù hợp với bạn
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="subject">Môn học hoặc kỹ năng muốn học</Label>
            <Input
              id="subject"
              placeholder="Ví dụ: Tiếng Anh, Lập trình Python..."
              value={formData.subject}
              onChange={(e) => handleChange('subject', e.target.value)}
              required
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="currentLevel">Trình độ hiện tại</Label>
            <Select
              value={formData.currentLevel}
              onValueChange={(value: SkillLevel) => handleChange('currentLevel', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn trình độ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Mới bắt đầu">Mới bắt đầu</SelectItem>
                <SelectItem value="Trung bình">Trung bình</SelectItem>
                <SelectItem value="Nâng cao">Nâng cao</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="targetLevel">Mục tiêu cuối cùng</Label>
            <Textarea
              id="targetLevel"
              placeholder="Ví dụ: Đạt trình độ IELTS 7.0, Có thể làm việc như một lập trình viên Python..."
              value={formData.targetLevel}
              onChange={(e) => handleChange('targetLevel', e.target.value)}
              required
              className="min-h-[80px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="duration">
              Thời gian dự kiến (ngày): {formData.duration}
            </Label>
            <Input
              id="duration"
              type="range"
              min="7"
              max="365"
              step="1"
              value={formData.duration}
              onChange={(e) => handleChange('duration', parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>1 tuần</span>
              <span>1 tháng</span>
              <span>3 tháng</span>
              <span>6 tháng</span>
              <span>1 năm</span>
            </div>
          </div>
        
          <CardFooter className="px-0 pt-4">
            <Button 
              type="submit" 
              className="w-full bg-learning-primary hover:bg-learning-primary/90"
              disabled={isLoading}
            >
              {isLoading ? "Đang tạo lộ trình..." : "Tạo Lộ Trình Học Tập"}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default LearningForm;
