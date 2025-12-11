import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../components/NotificationSnackbar';
import './AddTechnology.css';

function AddTechnology() {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Frontend',
    difficulty: 'Начальный',
    status: 'not-started',
    notes: ''
  });

  const [errors, setErrors] = useState({});

  const categories = ['Frontend', 'Backend', 'DevOps', 'Mobile', 'Data Science', 'Design'];
  const difficulties = ['Начальный', 'Средний', 'Продвинутый', 'Эксперт'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Очищаем ошибку поля при вводе
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Название обязательно';
    } else if (formData.title.length < 3) {
      newErrors.title = 'Название должно быть не менее 3 символов';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Описание обязательно';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Описание должно быть не менее 10 символов';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showSnackbar('Пожалуйста, исправьте ошибки в форме', 'error');
      return;
    }

    // Получаем существующие технологии из localStorage
    const existingTechnologies = JSON.parse(localStorage.getItem('technologies') || '[]');

    // Создаем новую технологию
    const newTechnology = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date().toISOString()
    };

    // Добавляем и сохраняем
    existingTechnologies.push(newTechnology);
    localStorage.setItem('technologies', JSON.stringify(existingTechnologies));

    showSnackbar('✅ Технология успешно добавлена!', 'success');

    // Переход на главную через 1 секунду
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="add-technology-page">
      <div className="add-technology-container">
        <h1>➕ Добавить новую технологию</h1>
        <p className="page-description">
          Добавьте новую технологию для изучения в ваш трекер
        </p>

        <form onSubmit={handleSubmit} className="add-technology-form">
          <div className="form-group">
            <label htmlFor="title">
              Название технологии <span className="required">*</span>
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="Например: React"
              className={errors.title ? 'error' : ''}
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
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
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
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
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
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
                {difficulties.map(diff => (
                  <option key={diff} value={diff}>{diff}</option>
                ))}
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
            <button type="button" onClick={handleCancel} className="btn-cancel">
              Отмена
            </button>
            <button type="submit" className="btn-submit">
              ✅ Добавить технологию
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTechnology;
