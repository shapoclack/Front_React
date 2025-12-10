import React, { useState } from 'react';
import './DeadlineForm.css';

function DeadlineForm({ technology, onSave, onClose }) {
  const [formData, setFormData] = useState({
    deadline: technology?.deadline || '',
    priority: technology?.priority || 'medium'
  });
  const [errors, setErrors] = useState({});

  // Валидация формы
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.deadline) {
      newErrors.deadline = 'Укажите срок изучения';
    } else {
      const selectedDate = new Date(formData.deadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.deadline = 'Срок не может быть в прошлом';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave({
        ...technology,
        deadline: formData.deadline,
        priority: formData.priority
      });
    }
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

  return (
    <div className="deadline-form-overlay" onClick={onClose}>
      <div 
        className="deadline-form-container" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="form-title"
        aria-describedby="form-description"
      >
        <h2 id="form-title">Установить срок изучения</h2>
        <p id="form-description">Технология: {technology?.title}</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="deadline">
              Срок изучения <span className="required">*</span>
            </label>
            <input
              type="date"
              id="deadline"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              aria-required="true"
              aria-invalid={!!errors.deadline}
              aria-describedby={errors.deadline ? "deadline-error" : undefined}
            />
            {errors.deadline && (
              <span id="deadline-error" className="error-message" role="alert">
                {errors.deadline}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="priority">Приоритет</label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="low">Низкий</option>
              <option value="medium">Средний</option>
              <option value="high">Высокий</option>
            </select>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              onClick={onClose}
              className="btn-cancel"
            >
              Отмена
            </button>
            <button 
              type="submit"
              className="btn-save"
            >
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DeadlineForm;
