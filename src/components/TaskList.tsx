
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Calendar as CalendarIcon, CheckSquare, Plus } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { TaskItem } from '@/types';
import { useLearning } from '@/context/LearningContext';

const TaskList: React.FC = () => {
  const { tasks, pathway, completeTask, addTask } = useLearning();
  const [open, setOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    stageId: '',
    dueDate: new Date(),
    priority: 'Medium' as 'Low' | 'Medium' | 'High',
    completed: false,
  });

  if (!pathway || tasks.length === 0) return null;

  const handleNewTaskChange = (field: keyof Omit<TaskItem, 'id'>, value: any) => {
    setNewTask({
      ...newTask,
      [field]: value,
    });
  };

  const handleCreateTask = () => {
    addTask(newTask);
    setNewTask({
      title: '',
      description: '',
      stageId: '',
      dueDate: new Date(),
      priority: 'Medium',
      completed: false,
    });
    setOpen(false);
  };

  const getPriorityStyles = (priority: 'Low' | 'Medium' | 'High') => {
    switch (priority) {
      case 'Low':
        return 'bg-green-100 text-green-800';
      case 'Medium':
        return 'bg-blue-100 text-blue-800';
      case 'High':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Sort tasks by due date (closest first) and then by priority
  const sortedTasks = [...tasks].sort((a, b) => {
    // First sort by completion status
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    
    // Then sort by due date
    const dateA = new Date(a.dueDate).getTime();
    const dateB = new Date(b.dueDate).getTime();
    if (dateA !== dateB) {
      return dateA - dateB;
    }
    
    // Then by priority
    const priorityOrder = { High: 0, Medium: 1, Low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <div className="w-full">
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-xl font-bold text-learning-primary">
              Danh sách nhiệm vụ
            </CardTitle>
            <CardDescription>
              {tasks.filter(t => !t.completed).length} nhiệm vụ cần hoàn thành
            </CardDescription>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-learning-primary hover:bg-learning-primary/90">
                <Plus className="w-4 h-4 mr-1" /> Thêm nhiệm vụ
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Thêm nhiệm vụ mới</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Tiêu đề</Label>
                  <Input
                    id="title"
                    value={newTask.title}
                    onChange={(e) => handleNewTaskChange('title', e.target.value)}
                    placeholder="Nhập tiêu đề nhiệm vụ"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Mô tả</Label>
                  <Textarea
                    id="description"
                    value={newTask.description}
                    onChange={(e) => handleNewTaskChange('description', e.target.value)}
                    placeholder="Mô tả chi tiết về nhiệm vụ này"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stage">Giai đoạn</Label>
                  <Select
                    value={newTask.stageId}
                    onValueChange={(value) => handleNewTaskChange('stageId', value)}
                  >
                    <SelectTrigger id="stage">
                      <SelectValue placeholder="Chọn giai đoạn" />
                    </SelectTrigger>
                    <SelectContent>
                      {pathway.stages.map((stage) => (
                        <SelectItem key={stage.id} value={stage.id}>
                          {stage.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Ngày hết hạn</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newTask.dueDate ? (
                          format(new Date(newTask.dueDate), 'PPP', {
                            locale: vi,
                          })
                        ) : (
                          <span>Chọn ngày</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={new Date(newTask.dueDate)}
                        onSelect={(date) => handleNewTaskChange('dueDate', date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Mức độ ưu tiên</Label>
                  <Select
                    value={newTask.priority}
                    onValueChange={(value: 'Low' | 'Medium' | 'High') => 
                      handleNewTaskChange('priority', value)}
                  >
                    <SelectTrigger id="priority">
                      <SelectValue placeholder="Chọn mức độ ưu tiên" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Thấp</SelectItem>
                      <SelectItem value="Medium">Trung bình</SelectItem>
                      <SelectItem value="High">Cao</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleCreateTask} disabled={!newTask.title || !newTask.stageId}>
                  Tạo nhiệm vụ
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent className="max-h-[500px] overflow-y-auto">
          <div className="space-y-3">
            {sortedTasks.map((task) => (
              <div 
                key={task.id}
                className={cn(
                  "flex items-start p-3 rounded-md border",
                  task.completed ? "bg-gray-50 opacity-70" : "bg-white"
                )}
              >
                <Checkbox
                  id={`task-${task.id}`}
                  checked={task.completed}
                  onCheckedChange={() => completeTask(task.id)}
                  className="mt-0.5"
                />
                <div className="ml-3 flex-1">
                  <label
                    htmlFor={`task-${task.id}`}
                    className={cn(
                      "font-medium cursor-pointer text-sm",
                      task.completed && "line-through text-gray-500"
                    )}
                  >
                    {task.title}
                  </label>
                  {task.description && (
                    <p className={cn(
                      "text-sm text-gray-600 mt-0.5",
                      task.completed && "text-gray-400"
                    )}>
                      {task.description}
                    </p>
                  )}
                  <div className="flex items-center gap-2 mt-2">
                    <span className={cn(
                      "text-xs px-2 py-1 rounded-full",
                      getPriorityStyles(task.priority)
                    )}>
                      {task.priority === 'Low' ? 'Thấp' : 
                       task.priority === 'Medium' ? 'Trung bình' : 'Cao'}
                    </span>
                    <span className="text-xs text-gray-500">
                      Hạn: {format(new Date(task.dueDate), 'dd/MM/yyyy')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskList;
