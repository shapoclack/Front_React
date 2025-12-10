import { useState, useEffect } from 'react';

function useTechnologiesApi() {
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(false); // Изменено на false
  const [error, setError] = useState(null);

  // Загрузка технологий из API
  const fetchTechnologies = async () => {
    try {
      setLoading(true);
      setError(null);

      // Имитируем загрузку с задержкой
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock данные
      const mockTechnologies = [
        {
          id: 1,
          title: 'React',
          description: 'Библиотека для создания пользовательских интерфейсов',
          category: 'frontend',
          difficulty: 'beginner',
          resources: ['https://react.dev', 'https://ru.reactjs.org']
        },
        {
          id: 2,
          title: 'Node.js',
          description: 'Среда выполнения JavaScript на сервере',
          category: 'backend',
          difficulty: 'intermediate',
          resources: ['https://nodejs.org', 'https://nodejs.org/ru/docs/']
        },
        {
          id: 3,
          title: 'TypeScript',
          description: 'Типизированное надмножество JavaScript',
          category: 'language',
          difficulty: 'intermediate',
          resources: ['https://www.typescriptlang.org']
        }
      ];

      setTechnologies(mockTechnologies);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // НЕ загружаем при монтировании
  // useEffect(() => {
  //   fetchTechnologies();
  // }, []);

  // Добавление новой технологии
  const addTechnology = async (techData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const newTech = {
        id: Date.now(),
        ...techData,
        createdAt: new Date().toISOString()
      };

      setTechnologies(prev => [...prev, newTech]);
      return newTech;
    } catch (err) {
      throw new Error('Не удалось добавить технологию');
    }
  };

  return {
    technologies,
    loading,
    error,
    refetch: fetchTechnologies,
    addTechnology
  };
}

export default useTechnologiesApi;
