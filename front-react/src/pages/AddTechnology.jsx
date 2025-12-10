import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useNotification } from '../components/NotificationSnackbar';
import './AddTechnology.css';

function AddTechnology() {
  const navigate = useNavigate();
  const notification = useNotification();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'frontend',
    difficulty: 'beginner',
    status: 'not-started',
    notes: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Название обязательно для заполнения';
    } else if (formData.title.length < 3) {
      newErrors.title = 'Название должно содержать минимум 3 символа';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Описание обязательно для заполнения';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Описание должно содержать минимум 10 символов';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Убираем ошибку при изменении поля
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      notification.error('Пожалуйста, исправьте ошибки в форме');
      return;
    }

    // Получаем существующие технологии из localStorage
    const existingData = localStorage.getItem('techTrackerData');
    const technologies = existingData ? JSON.parse(existingData) : [];

    // Создаем новую технологию
    const newTechnology = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString()
    };

    // Добавляем в массив
    technologies.push(newTechnology);

    // Сохраняем в localStorage
    localStorage.setItem('techTrackerData', JSON.stringify(technologies));

    notification.success('Технология успешно добавлена!');

    // Перенаправляем на главную страницу
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  return (
    <div className="add-technology-page">
      <div className="page-header">
        <h1>Добавить технологию</h1>
        <p>Форма будет добавлена позже</p>
      </div>

      <form onSubmit={handleSubmit} className="technology-form">
        <div className="form-group">
          <label htmlFor="title">
            Название технологии <span className="required">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Например: React"
            className={errors.title ? 'error' : ''}
            aria-invalid={!!errors.title}
            aria-describedby={errors.title ? 'title-error' : undefined}
          />
          {errors.title && (
            <span id="title-error" className="error-message" role="alert">
              {errors.title}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="description">
            Описание <span className="required">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Опишите технологию..."
            rows="4"
            className={errors.description ? 'error' : ''}
            aria-invalid={!!errors.description}
            aria-describedby={errors.description ? 'description-error' : undefined}
          />
          {errors.description && (
            <span id="description-error" className="error-message" role="alert">
              {errors.description}
            </span>
          )}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="category">Категория</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="language">Язык программирования</option>
              <option value="database">База данных</option>
              <option value="tools">Инструменты</option>
              <option value="other">Другое</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="difficulty">Сложность</label>
            <select
              id="difficulty"
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
            >
              <option value="beginner">Начальный</option>
              <option value="intermediate">Средний</option>
              <option value="advanced">Продвинутый</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="status">Начальный статус</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="not-started">Не начато</option>
            <option value="in-progress">В процессе</option>
            <option value="completed">Завершено</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="notes">Заметки (необязательно)</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Ваши заметки..."
            rows="3"
          />
        </div>

        <div className="form-actions">
          <Link to="/" className="btn-cancel">
            ← Назад к списку
          </Link>
          <button type="submit" className="btn-submit">
            Добавить технологию
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTechnology;
