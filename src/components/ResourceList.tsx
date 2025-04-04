
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLearning } from '@/context/LearningContext';
import { BookOpen, Video, FileText, LayoutGrid } from 'lucide-react';
import { Graduation } from '@/utils/iconCompat';

const ResourceList: React.FC = () => {
  const { pathway } = useLearning();

  if (!pathway) return null;

  // Get all resources from all stages
  const allResources = pathway.stages.flatMap(stage => stage.resources);

  // Group resources by type
  const resourcesByType = allResources.reduce((acc, resource) => {
    if (!acc[resource.type]) {
      acc[resource.type] = [];
    }
    acc[resource.type].push(resource);
    return acc;
  }, {} as Record<string, typeof allResources>);

  const getIconForType = (type: string) => {
    switch (type) {
      case 'Video':
        return <Video className="w-4 h-4" />;
      case 'Article':
        return <FileText className="w-4 h-4" />;
      case 'Book':
        return <BookOpen className="w-4 h-4" />;
      case 'Course':
        return <Graduation className="w-4 h-4" />;
      case 'Practice':
        return <LayoutGrid className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getBadgeColorForType = (type: string) => {
    switch (type) {
      case 'Video':
        return 'bg-red-100 text-red-800 hover:bg-red-100';
      case 'Article':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
      case 'Book':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-100';
      case 'Course':
        return 'bg-amber-100 text-amber-800 hover:bg-amber-100';
      case 'Practice':
        return 'bg-green-100 text-green-800 hover:bg-green-100';
      default:
        return '';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-learning-primary">
          Tài nguyên học tập
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {Object.entries(resourcesByType).map(([type, resources]) => (
            <div key={type} className="space-y-3">
              <h3 className="text-sm font-medium flex items-center">
                {getIconForType(type)}
                <span className="ml-2">{type === 'Video' ? 'Videos' : 
                       type === 'Article' ? 'Bài viết' : 
                       type === 'Book' ? 'Sách' : 
                       type === 'Course' ? 'Khóa học' : 'Bài tập thực hành'}</span>
                <Badge variant="outline" className="ml-2">
                  {resources.length}
                </Badge>
              </h3>
              <div className="space-y-2">
                {resources.map((resource) => (
                  <div key={resource.id} className="flex items-start p-3 bg-gray-50 rounded-md">
                    <Badge 
                      variant="outline" 
                      className={`mr-3 ${getBadgeColorForType(resource.type)}`}
                    >
                      {resource.type}
                    </Badge>
                    <div>
                      <h4 className="text-sm font-medium">{resource.title}</h4>
                      <p className="text-xs text-gray-600 mt-1">{resource.description}</p>
                      {resource.url && (
                        <a 
                          href={resource.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-learning-primary hover:underline mt-1 block"
                        >
                          Truy cập tài nguyên
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResourceList;
