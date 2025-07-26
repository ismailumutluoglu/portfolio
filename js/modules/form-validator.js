// ===== FORM VALIDATOR MODULE =====

class FormValidator {
  constructor() {
    this.form = document.getElementById('contactForm');
    this.inputs = this.form?.querySelectorAll('.form-input');
    this.submitBtn = this.form?.querySelector('.form-submit');
    this.successMessage = this.form?.querySelector('.form-success');
    
    this.validationRules = {
      firstName: {
        required: true,
        minLength: 2,
        maxLength: 50,
        pattern: /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/
      },
      lastName: {
        required: true,
        minLength: 2,
        maxLength: 50,
        pattern: /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/
      },
      email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      },
      phone: {
        required: false,
        pattern: /^[\+]?[0-9\s\-\(\)]{10,15}$/
      },
      subject: {
        required: true
      },
      message: {
        required: true,
        minLength: 10,
        maxLength: 1000
      }
    };
    
    this.init();
  }

  init() {
    if (!this.form) return;
    
    this.addEventListeners();
    this.setupRealTimeValidation();
  }

  addEventListeners() {
    // Form submission
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleFormSubmit();
    });

    // Real-time validation
    this.inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearFieldError(input));
    });
  }

  setupRealTimeValidation() {
    this.inputs.forEach(input => {
      input.addEventListener('input', () => {
        if (input.classList.contains('invalid')) {
          setTimeout(() => this.validateField(input), 300);
        }
      });
    });
  }

  validateField(field) {
    const name = field.name;
    const value = field.value.trim();
    const rules = this.validationRules[name];
    const errorElement = field.parentNode.querySelector('.form-error');

    if (!rules) return true;

    // Required validation
    if (rules.required && !value) {
      this.showFieldError(field, errorElement, `${this.getFieldLabel(name)} alanı zorunludur.`);
      return false;
    }

    // Skip other validations if field is not required and empty
    if (!rules.required && !value) {
      this.clearFieldError(field);
      return true;
    }

    // Length validation
    if (rules.minLength && value.length < rules.minLength) {
      this.showFieldError(field, errorElement, `${this.getFieldLabel(name)} en az ${rules.minLength} karakter olmalıdır.`);
      return false;
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      this.showFieldError(field, errorElement, `${this.getFieldLabel(name)} en fazla ${rules.maxLength} karakter olmalıdır.`);
      return false;
    }

    // Pattern validation
    if (rules.pattern && !rules.pattern.test(value)) {
      let message = '';
      switch (name) {
        case 'firstName':
        case 'lastName':
          message = `${this.getFieldLabel(name)} sadece harflerden oluşmalıdır.`;
          break;
        case 'email':
          message = 'Geçerli bir email adresi giriniz.';
          break;
        case 'phone':
          message = 'Geçerli bir telefon numarası giriniz.';
          break;
        default:
          message = 'Geçersiz format.';
      }
      this.showFieldError(field, errorElement, message);
      return false;
    }

    // Field is valid
    this.clearFieldError(field);
    field.classList.add('valid');
    return true;
  }

  showFieldError(field, errorElement, message) {
    field.classList.remove('valid');
    field.classList.add('invalid');
    
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.classList.add('show');
    }
  }

  clearFieldError(field) {
    field.classList.remove('invalid');
    const errorElement = field.parentNode.querySelector('.form-error');
    
    if (errorElement) {
      errorElement.classList.remove('show');
    }
  }

  getFieldLabel(fieldName) {
    const labels = {
      firstName: 'Ad',
      lastName: 'Soyad',
      email: 'Email',
      phone: 'Telefon',
      subject: 'Konu',
      message: 'Mesaj',
      budget: 'Bütçe'
    };
    return labels[fieldName] || fieldName;
  }

  validateForm() {
    let isValid = true;
    
    this.inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });
    
    return isValid;
  }

  async handleFormSubmit() {
    // Validate all fields
    if (!this.validateForm()) {
      this.scrollToFirstError();
      return;
    }

    // Show loading state
    this.setLoadingState(true);

    try {
      // Simulate form submission (replace with actual API call)
      await this.submitForm();
      
      // Show success message
      this.showSuccessMessage();
      this.resetForm();
      
    } catch (error) {
      console.error('Form submission error:', error);
      this.showErrorMessage('Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      this.setLoadingState(false);
    }
  }

  async submitForm() {
    // Get form data
    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData.entries());
    
    // Add timestamp
    data.timestamp = new Date().toISOString();
    data.userAgent = navigator.userAgent;
    
    console.log('Form Data:', data);
    
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 2000);
    });

    // In a real application, you would make an API call:
    /*
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error('Form submission failed');
    }
    
    return response.json();
    */
  }

  setLoadingState(loading) {
    if (loading) {
      this.submitBtn.classList.add('loading');
      this.submitBtn.disabled = true;
    } else {
      this.submitBtn.classList.remove('loading');
      this.submitBtn.disabled = false;
    }
  }

  showSuccessMessage() {
    this.successMessage.classList.add('show');
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      this.successMessage.classList.remove('show');
    }, 5000);
  }

  showErrorMessage(message) {
    // Create or update error message element
    let errorMessage = this.form.querySelector('.form-error-global');
    
    if (!errorMessage) {
      errorMessage = document.createElement('div');
      errorMessage.className = 'form-error-global';
      errorMessage.style.cssText = `
        background: rgba(239, 68, 68, 0.1);
        border: 1px solid var(--error);
        color: var(--error);
        padding: var(--space-4);
        border-radius: var(--radius-lg);
        text-align: center;
        margin-top: var(--space-4);
      `;
      this.form.appendChild(errorMessage);
    }
    
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      errorMessage.style.display = 'none';
    }, 5000);
  }

  resetForm() {
    this.form.reset();
    
    // Clear all validation states
    this.inputs.forEach(input => {
      input.classList.remove('valid', 'invalid');
      this.clearFieldError(input);
    });
  }

  scrollToFirstError() {
    const firstError = this.form.querySelector('.form-input.invalid');
    
    if (firstError) {
      firstError.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
      firstError.focus();
    }
  }

  // Accessibility enhancements
  addAccessibilityFeatures() {
    this.inputs.forEach(input => {
      const errorElement = input.parentNode.querySelector('.form-error');
      
      if (errorElement) {
        const errorId = `error-${input.id}`;
        errorElement.id = errorId;
        input.setAttribute('aria-describedby', errorId);
      }
    });
  }
}

// Initialize form validator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new FormValidator();
});