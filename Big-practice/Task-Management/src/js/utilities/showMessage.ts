const showSuccessMessage = (message: string): void => {
  const successMessage = document.createElement('div');
  successMessage.className = 'success-message';
  successMessage.textContent = message;

  document.body.appendChild(successMessage);

  setTimeout(() => {
    successMessage.remove();
  }, 1500);
};

export default showSuccessMessage;
