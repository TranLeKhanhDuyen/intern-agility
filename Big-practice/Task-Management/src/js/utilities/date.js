const getCurrentDate = () => {
  const date = new Date();
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

const getDueDate = () => {
  const currentDate = new Date();
  const dueDate = new Date(currentDate.getTime() + 10 * 24 * 60 * 60 * 1000);
  return `${
    dueDate.getMonth() + 1
  }/${dueDate.getDate()}/${dueDate.getFullYear()}`;
};

const diffTime = (date, method = Math.floor, adverb = 'ago', unit = 'day') => {
  const convertDate = new Date(date);
  const unitMillis = {
    day: 1000 * 60 * 60 * 24,
    hour: 1000 * 60 * 60,
    minute: 1000 * 60,
    second: 1000
  };
  const diff = method(Math.abs(convertDate - Date.now()) / unitMillis[unit]);

  switch (diff) {
    case 0:
      return 'Today';

    case 1:
      return `${diff} ${unit} ${adverb}`;

    default:
      return `${diff} ${unit}s ${adverb}`;
  }
};

const convertDateInput = (dateStr) => {
  const [month, day, year] = dateStr.split('/');
  const date = new Date(+year, +month - 1, +day + 1);
  const [dateValue] = date.toISOString().split('T');

  return dateValue;
};

const formatDate = (date) => {
  const [year, month, day] = date.split('-');

  return [month, day, year].join('/');
};

const timeAgo = (timeStamp) => {
  const diffInMinutes = Math.floor((Date.now() - timeStamp) / (1000 * 60));

  switch (true) {
    case diffInMinutes === 0:
      return 'Now';

    case diffInMinutes === 1:
      return `${diffInMinutes} minute ago`;

    case diffInMinutes < 60:
      return `${diffInMinutes} minutes ago`;

    default:
      return diffTime(timeStamp, Math.ceil, 'ago', 'minute');
  }
};

export default {
  getCurrentDate,
  getDueDate,
  diffTime,
  convertDateInput,
  formatDate,
  timeAgo
};
