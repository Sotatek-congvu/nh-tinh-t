
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { LearningPathway, TaskItem, FormData, LearningStage, SkillLevel } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { toast } from "sonner";

interface LearningContextProps {
  pathway: LearningPathway | null;
  tasks: TaskItem[];
  isLoading: boolean;
  createPathway: (formData: FormData) => void;
  completeTask: (taskId: string) => void;
  completeStage: (stageId: string) => void;
  addTask: (task: Omit<TaskItem, "id">) => void;
  resetPathway: () => void;
  updateProgress: () => void;
}

const LearningContext = createContext<LearningContextProps | undefined>(undefined);

export const LearningProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [pathway, setPathway] = useState<LearningPathway | null>(null);
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Load data from localStorage on initial render
  useEffect(() => {
    const savedPathway = localStorage.getItem('learningPathway');
    const savedTasks = localStorage.getItem('learningTasks');
    
    if (savedPathway) {
      setPathway(JSON.parse(savedPathway));
    }
    
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (pathway) {
      localStorage.setItem('learningPathway', JSON.stringify(pathway));
    }
    
    if (tasks.length > 0) {
      localStorage.setItem('learningTasks', JSON.stringify(tasks));
    }
  }, [pathway, tasks]);

  const createStages = (
    subject: string, 
    currentLevel: SkillLevel, 
    targetLevel: string, 
    duration: number
  ): LearningStage[] => {
    let stages: LearningStage[] = [];
    
    // Basic stage structure based on skill level
    if (currentLevel === "Mới bắt đầu") {
      stages = [
        {
          id: uuidv4(),
          title: "Nền tảng cơ bản",
          description: `Xây dựng kiến thức cơ bản về ${subject}`,
          duration: Math.floor(duration * 0.3),
          goals: [
            {
              id: uuidv4(),
              title: `Hiểu được các khái niệm cơ bản của ${subject}`,
              description: "Nắm vững các khái niệm nền tảng để tiếp tục học tập",
              completed: false
            },
            {
              id: uuidv4(),
              title: "Làm quen với thuật ngữ chuyên ngành",
              description: "Học và hiểu các thuật ngữ chính",
              completed: false
            }
          ],
          resources: [
            {
              id: uuidv4(),
              title: `Khóa học ${subject} cơ bản`,
              type: "Course",
              description: "Khóa học nhập môn dành cho người mới bắt đầu"
            },
            {
              id: uuidv4(),
              title: "Sách nhập môn",
              type: "Book",
              description: `Sách giới thiệu về ${subject} dành cho người mới`
            }
          ],
          completed: false
        },
        {
          id: uuidv4(),
          title: "Thực hành cơ bản",
          description: `Áp dụng kiến thức cơ bản vào thực hành ${subject}`,
          duration: Math.floor(duration * 0.3),
          goals: [
            {
              id: uuidv4(),
              title: "Hoàn thành các bài tập cơ bản",
              description: "Thực hành thông qua các bài tập đơn giản",
              completed: false
            }
          ],
          resources: [
            {
              id: uuidv4(),
              title: "Bài tập thực hành",
              type: "Practice",
              description: "Tập hợp các bài tập thực hành cơ bản"
            }
          ],
          completed: false
        },
        {
          id: uuidv4(),
          title: "Nâng cao kiến thức",
          description: `Phát triển kỹ năng ${subject} lên mức trung cấp`,
          duration: Math.floor(duration * 0.4),
          goals: [
            {
              id: uuidv4(),
              title: "Giải quyết các vấn đề phức tạp hơn",
              description: "Áp dụng kiến thức để giải quyết các bài toán nâng cao",
              completed: false
            }
          ],
          resources: [
            {
              id: uuidv4(),
              title: "Tài liệu chuyên sâu",
              type: "Article",
              description: "Các bài viết nâng cao về chủ đề này"
            }
          ],
          completed: false
        }
      ];
    } else if (currentLevel === "Trung bình") {
      stages = [
        {
          id: uuidv4(),
          title: "Củng cố kiến thức",
          description: `Rà soát và củng cố kiến thức ${subject} hiện có`,
          duration: Math.floor(duration * 0.2),
          goals: [
            {
              id: uuidv4(),
              title: "Đánh giá kiến thức hiện tại",
              description: "Kiểm tra và xác định các điểm mạnh, điểm yếu",
              completed: false
            }
          ],
          resources: [
            {
              id: uuidv4(),
              title: "Bài kiểm tra đánh giá",
              type: "Practice",
              description: "Bài kiểm tra để đánh giá trình độ hiện tại"
            }
          ],
          completed: false
        },
        {
          id: uuidv4(),
          title: "Kiến thức nâng cao",
          description: `Học các kỹ thuật và khái niệm nâng cao về ${subject}`,
          duration: Math.floor(duration * 0.4),
          goals: [
            {
              id: uuidv4(),
              title: "Nắm vững các khái niệm chuyên sâu",
              description: "Hiểu và áp dụng được các kỹ thuật nâng cao",
              completed: false
            }
          ],
          resources: [
            {
              id: uuidv4(),
              title: "Khóa học nâng cao",
              type: "Course",
              description: "Khóa học chuyên sâu về các kỹ thuật nâng cao"
            }
          ],
          completed: false
        },
        {
          id: uuidv4(),
          title: "Ứng dụng thực tế",
          description: `Áp dụng ${subject} vào các dự án thực tế`,
          duration: Math.floor(duration * 0.4),
          goals: [
            {
              id: uuidv4(),
              title: "Hoàn thành dự án thực tế",
              description: "Xây dựng một dự án hoàn chỉnh áp dụng kiến thức đã học",
              completed: false
            }
          ],
          resources: [
            {
              id: uuidv4(),
              title: "Hướng dẫn dự án",
              type: "Article",
              description: "Các bước thực hiện dự án từ đầu đến cuối"
            }
          ],
          completed: false
        }
      ];
    } else {
      stages = [
        {
          id: uuidv4(),
          title: "Chuyên gia",
          description: `Phát triển chuyên môn cao cấp về ${subject}`,
          duration: Math.floor(duration * 0.3),
          goals: [
            {
              id: uuidv4(),
              title: "Nghiên cứu chuyên sâu",
              description: "Nghiên cứu và nắm vững các kỹ thuật tiên tiến",
              completed: false
            }
          ],
          resources: [
            {
              id: uuidv4(),
              title: "Nghiên cứu học thuật",
              type: "Article",
              description: "Các bài báo khoa học và nghiên cứu mới nhất"
            }
          ],
          completed: false
        },
        {
          id: uuidv4(),
          title: "Đổi mới và sáng tạo",
          description: `Phát triển các giải pháp sáng tạo trong lĩnh vực ${subject}`,
          duration: Math.floor(duration * 0.4),
          goals: [
            {
              id: uuidv4(),
              title: "Tạo ra phương pháp mới",
              description: "Nghiên cứu và phát triển các phương pháp sáng tạo",
              completed: false
            }
          ],
          resources: [
            {
              id: uuidv4(),
              title: "Seminar chuyên gia",
              type: "Video",
              description: "Các buổi thảo luận của chuyên gia trong ngành"
            }
          ],
          completed: false
        },
        {
          id: uuidv4(),
          title: "Đạt mục tiêu",
          description: `Hoàn thành các mục tiêu cao cấp về ${subject}`,
          duration: Math.floor(duration * 0.3),
          goals: [
            {
              id: uuidv4(),
              title: `Đạt được ${targetLevel}`,
              description: `Đạt được mục tiêu ${targetLevel} trong lĩnh vực ${subject}`,
              completed: false
            }
          ],
          resources: [
            {
              id: uuidv4(),
              title: "Đánh giá cuối cùng",
              type: "Practice",
              description: "Bài kiểm tra toàn diện về kiến thức và kỹ năng"
            }
          ],
          completed: false
        }
      ];
    }
    
    return stages;
  };

  const generateInitialTasks = (pathway: LearningPathway): TaskItem[] => {
    const initialTasks: TaskItem[] = [];
    let currentDate = new Date(pathway.startDate);
    
    pathway.stages.forEach(stage => {
      // Create 2-3 tasks for each stage
      const tasksPerStage = Math.floor(Math.random() * 2) + 2; // 2 to 3 tasks
      
      for (let i = 0; i < tasksPerStage; i++) {
        const daysToAdd = Math.floor(stage.duration / tasksPerStage) * (i + 1);
        const dueDate = new Date(currentDate);
        dueDate.setDate(dueDate.getDate() + daysToAdd);
        
        initialTasks.push({
          id: uuidv4(),
          title: `Nhiệm vụ ${i + 1}: ${stage.title}`,
          description: `Hoàn thành phần công việc liên quan đến ${stage.title}`,
          dueDate,
          completed: false,
          stageId: stage.id,
          priority: ["Low", "Medium", "High"][Math.floor(Math.random() * 3)] as "Low" | "Medium" | "High"
        });
      }
      
      // Update current date for next stage
      currentDate.setDate(currentDate.getDate() + stage.duration);
    });
    
    return initialTasks;
  };

  const createPathway = (formData: FormData) => {
    setIsLoading(true);
    
    try {
      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + formData.duration);
      
      const stages = createStages(
        formData.subject,
        formData.currentLevel,
        formData.targetLevel,
        formData.duration
      );
      
      const newPathway: LearningPathway = {
        id: uuidv4(),
        subject: formData.subject,
        currentLevel: formData.currentLevel,
        targetLevel: formData.targetLevel,
        duration: formData.duration,
        startDate,
        endDate,
        stages,
        progress: 0
      };
      
      setPathway(newPathway);
      
      // Generate initial tasks
      const initialTasks = generateInitialTasks(newPathway);
      setTasks(initialTasks);
      
      toast.success("Đã tạo lộ trình học tập thành công!");
    } catch (error) {
      console.error("Error creating pathway:", error);
      toast.error("Lỗi khi tạo lộ trình học tập. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  const completeTask = (taskId: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
    
    updateProgress();
    toast.success("Đã cập nhật trạng thái nhiệm vụ!");
  };

  const completeStage = (stageId: string) => {
    if (!pathway) return;
    
    setPathway(prevPathway => {
      if (!prevPathway) return null;
      
      return {
        ...prevPathway,
        stages: prevPathway.stages.map(stage => 
          stage.id === stageId ? { ...stage, completed: !stage.completed } : stage
        )
      };
    });
    
    updateProgress();
    toast.success("Đã cập nhật trạng thái giai đoạn!");
  };

  const addTask = (task: Omit<TaskItem, "id">) => {
    const newTask: TaskItem = {
      ...task,
      id: uuidv4()
    };
    
    setTasks(prevTasks => [...prevTasks, newTask]);
    toast.success("Đã thêm nhiệm vụ mới!");
  };

  const resetPathway = () => {
    setPathway(null);
    setTasks([]);
    localStorage.removeItem('learningPathway');
    localStorage.removeItem('learningTasks');
    toast.success("Đã xóa lộ trình học tập!");
  };

  const updateProgress = () => {
    if (!pathway) return;
    
    // Calculate progress based on completed tasks and stages
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const completedStages = pathway.stages.filter(stage => stage.completed).length;
    const totalStages = pathway.stages.length;
    
    // Weight: tasks 40%, stages 60%
    const taskProgress = totalTasks > 0 ? (completedTasks / totalTasks) * 40 : 0;
    const stageProgress = totalStages > 0 ? (completedStages / totalStages) * 60 : 0;
    
    const totalProgress = Math.round(taskProgress + stageProgress);
    
    setPathway(prevPathway => {
      if (!prevPathway) return null;
      return {
        ...prevPathway,
        progress: totalProgress
      };
    });
  };

  const value = {
    pathway,
    tasks,
    isLoading,
    createPathway,
    completeTask,
    completeStage,
    addTask,
    resetPathway,
    updateProgress
  };

  return (
    <LearningContext.Provider value={value}>
      {children}
    </LearningContext.Provider>
  );
};

export const useLearning = () => {
  const context = useContext(LearningContext);
  if (context === undefined) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
};
