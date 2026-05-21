window.addEventListener('DOMContentLoaded', () => {

  const textareas = document.querySelectorAll('.inputText');

  textareas.forEach((textarea) => {

    textarea.style.height = 'auto';

    textarea.addEventListener('input', function () {
      this.style.height = 'auto';
      this.style.height = this.scrollHeight + 'px';
    });
  });
});